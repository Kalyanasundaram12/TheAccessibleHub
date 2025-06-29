import Image from 'next/image';
import type { TeamMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 shadow-md">
          <Image
            src={member.imageUrl}
            alt={member.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={member.imageHint || "portrait person"}
          />
        </div>
        <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
        <CardDescription className="text-primary">{member.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  );
}
