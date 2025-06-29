
import { ContactForm } from '@/components/forms/contact-form';
import { Mail, Linkedin, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;d love to hear from you! Whether you have a question, a suggestion, or want to get involved, feel free to reach out.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-6 p-6 bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold font-headline text-primary">Other Ways to Connect</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-3 mt-1 text-accent" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <Link href="mailto:theaccessibleaihub@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  theaccessibleaihub@gmail.com
                </Link>
              </div>
            </div>
             <div className="flex items-start">
              <Linkedin className="h-6 w-6 mr-3 mt-1 text-accent" />
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <Link href="https://www.linkedin.com/company/the-accessible-ai-hub/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  linkedin.com/company/the-accessible-ai-hub
                </Link>
              </div>
            </div>
             <div className="flex items-start">
              <Instagram className="h-6 w-6 mr-3 mt-1 text-accent" />
              <div>
                <h3 className="font-semibold">Instagram</h3>
                <Link href="https://www.instagram.com/theaccessibleaihub?igsh=Mzl6N3praGk4NTVp&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  @theaccessibleaihub
                </Link>
              </div>
            </div>
            <div className="flex items-start">
              <Youtube className="h-6 w-6 mr-3 mt-1 text-accent" />
              <div>
                <h3 className="font-semibold">YouTube</h3>
                <Link href="https://www.youtube.com/@AccessibleAIHub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  @AccessibleAIHub
                </Link>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Follow us on social media for the latest updates, news, and community discussions.
          </p>
        </div>
      </section>
    </div>
  );
}
