
import { mockAssociates, mockTeamMembers } from '@/data/mock-data';
import { TeamMemberCard } from '@/components/cards/team-member-card';
import Image from 'next/image';
import logoImage from '@/assets/logo.jpg'; 
export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="py-10 bg-card rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-6 text-center text-primary">About The Accessible AI Hub</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image 
                src={logoImage} 
                alt="Diverse group collaborating on AI" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="collaboration diversity" 
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg text-foreground/80">
                The Accessible AI Hub is co-founded by Microsoft Learn Student Ambassadors , a community-driven , non-profit initiative dedicated to demystifying Artificial Intelligence and making it accessible to individuals from all backgrounds and levels of expertise.
              </p>
              <p className="text-muted-foreground">
                We believe that AI has the power to transform our world for the better, but only if its knowledge and tools are shared widely and inclusively. Our goal is to foster a learning environment where everyone feels empowered to explore, understand, and contribute to the field of AI.
              </p>
              <h2 className="text-2xl font-semibold font-headline mt-6 text-primary">Our Vision</h2>
              <p className="text-muted-foreground">
                To create a global community where AI literacy is commonplace, and diverse voices actively shape the future of artificial intelligence ethically and responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTeamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-8 text-center">Our Associates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAssociates.map((associate) => (
            <TeamMemberCard key={associate.id} member={associate} />
          ))}
        </div>
      </section>
    </div>
  );
}
