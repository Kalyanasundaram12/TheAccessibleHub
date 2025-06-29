
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500, {message: "Message must be less than 500 characters."}),
  subscribe: z.boolean().default(false).optional(),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subscribe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const mailtoEmail = 'theaccessibleaihub@gmail.com';
    const subject = `Contact Form Submission from ${values.name}`;
    const body = `
Name: ${values.name}
Email: ${values.email}
Subscribed to newsletter: ${values.subscribe ? 'Yes' : 'No'}

Message:
${values.message}
    `;

    const mailtoLink = `mailto:${mailtoEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;

    try {
      // Attempt to open the mail client
      window.location.href = mailtoLink;
      
      toast({
        title: 'Message Sent!', // Updated title as per request
        description: `Your email client should now open with the message addressed to ${mailtoEmail}. Please complete sending it from your email app.`, // Clarifying description
      });
      form.reset();
    } catch (error) {
      console.error('Failed to open mailto link:', error);
      toast({
        variant: 'destructive',
        title: 'Could Not Open Email Client',
        description: 'There was an issue trying to open your email client. Please copy the details manually or try again.',
      });
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Get in Touch</CardTitle>
        <CardDescription>Fill out the form below to send us a message or join our mailing list.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Subscribe to our newsletter for updates on events and resources.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Preparing Message...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
