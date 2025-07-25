
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import type { TeamMember } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
      <CardHeader className="items-center">
        {member.imageUrl && (
          <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 shadow-md">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
              data-ai-hint={member.imageHint || "portrait person"}
            />
          </div>
        )}
        <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
        <CardDescription className="text-primary">{member.role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
      {member.linkedinUrl && (
        <CardFooter className="justify-center pt-0">
          <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn Profile`} className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
