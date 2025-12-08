
import React from 'react';
import { TeamMember } from '../types';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { TEXT_CONTENT, Language } from '../constants';

interface TeamPageProps {
  teamMembers: TeamMember[];
  lang?: Language;
}

const TeamPage: React.FC<TeamPageProps> = ({ teamMembers, lang = 'EN' }) => {
  // @ts-ignore
  const t = TEXT_CONTENT[lang].team || TEXT_CONTENT['EN'].team;

  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen">
      <div className="bg-brand-surface border-b border-white/5 py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="group bg-brand-surface border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-brand-primary font-bold">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex gap-4">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-brand-secondary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-brand-primary transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {teamMembers.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             <p>No team members found.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
