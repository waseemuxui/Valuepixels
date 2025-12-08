
import React from 'react';
import { LEGAL_CONTENT, Language } from '../constants';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  lang: Language;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, lang }) => {
  // @ts-ignore
  const content = (LEGAL_CONTENT[lang] || LEGAL_CONTENT['EN'])[type];

  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen animate-in fade-in duration-500">
        <div className="bg-brand-surface border-b border-white/5 py-16 mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{content.title}</h1>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-lg max-w-none bg-brand-surface/30 p-8 rounded-3xl border border-white/5">
                <div dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
        </div>
    </div>
  );
};

export default LegalPage;
