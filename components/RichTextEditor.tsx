
import React, { useRef } from 'react';
import { Bold, Italic, Link, Image, Heading1, List, Code, Type } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, className, rows = 12 }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (startTag: string, endTag: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newValue = before + startTag + selection + endTag + after;
    onChange(newValue);

    // Restore focus and selection
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + startTag.length, end + startTag.length);
    }, 0);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) insertTag(`<a href="${url}" class="text-brand-primary hover:underline">`, '</a>');
  };

  const insertImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) insertTag(`<img src="${url}" alt="image" class="rounded-xl my-4 w-full h-auto" />`, '');
  };

  return (
    <div className={`border border-white/10 rounded-xl overflow-hidden bg-brand-dark/50 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-brand-surface border-b border-white/10">
        <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Bold">
            <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('<em>', '</em>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Italic">
            <Italic className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('<h2>', '</h2>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Heading">
            <Heading1 className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('<p>', '</p>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Paragraph">
            <Type className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
        <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="List">
            <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={insertLink} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Link">
            <Link className="w-4 h-4" />
        </button>
        <button type="button" onClick={insertImage} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Image">
            <Image className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('<pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code>', '</code></pre>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Code Block">
            <Code className="w-4 h-4" />
        </button>
      </div>
      
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent p-4 text-white outline-none font-mono text-sm resize-y"
        placeholder={placeholder || "Type your content here (HTML supported)..."}
      />
      <div className="bg-brand-surface/50 px-4 py-2 text-xs text-gray-500 border-t border-white/5">
        HTML Enabled • Use toolbar for quick tags
      </div>
    </div>
  );
};

export default RichTextEditor;
