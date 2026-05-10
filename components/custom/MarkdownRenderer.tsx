"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article
      className="prose prose-slate max-w-none 
      /* Light Mode Colors */
      prose-headings:text-cyan-500 prose-p:text-slate-300 prose-strong:text-slate-300 prose-li:text-slate-400
      marker:text-amber-500 prose-hr:border-slate-500 [&_ul_li::marker]:text-cyan-500 [&_ol_li::marker]:text-lime-500
      
      /* Dark Mode Colors (The Fix) */
      dark:prose-invert 
      dark:prose-headings:text-white 
      dark:prose-p:text-gray-300 
      dark:prose-strong:text-white 
      dark:prose-li:text-gray-300
      
      /* Links & General */
      prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-500 transition-colors"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
