
import React from 'react';
import { CustomPage } from '../types';

interface DynamicPageProps {
  page: CustomPage;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ page }) => {
  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen animate-in fade-in duration-500">
        <div className="bg-brand-surface border-b border-white/5 py-16 mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{page.title}</h1>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-lg max-w-none bg-brand-surface/30 p-8 rounded-3xl border border-white/5">
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
        </div>
    </div>
  );
};

export default DynamicPage;
