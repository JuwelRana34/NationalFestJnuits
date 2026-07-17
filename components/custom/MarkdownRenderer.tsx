// "use client";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// interface MarkdownRendererProps {
//   content: string;
// }

// export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
//   return (
//     <article
//       className="prose prose-slate max-w-none
//       /* Light Mode Colors */
//       prose-headings:text-cyan-500 prose-p:text-slate-300 prose-strong:text-slate-300 prose-li:text-slate-400
//       marker:text-amber-500 prose-hr:border-slate-500 [&_ul_li::marker]:text-cyan-500 [&_ol_li::marker]:text-lime-500

//       /* Dark Mode Colors (The Fix) */
//       dark:prose-invert
//       dark:prose-headings:text-white
//       dark:prose-p:text-gray-300
//       dark:prose-strong:text-white
//       dark:prose-li:text-gray-300

//       /* Links & General */
//       prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-500 transition-colors"
//     >
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
//     </article>
//   );
// }

"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article
      className={`
        /* Base & Typography Sizing */
        prose max-w-none md:prose-lg
        
        /* ========================
           LIGHT MODE (Default)
        ======================== */
        prose-slate 
        
        /* Headings */
        prose-headings:font-bold prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:bg-linear-to-r prose-headings:from-cyan-500 prose-headings:to-blue-600
        
        /* Text & Strong */
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-justify
        prose-strong:text-slate-900 prose-strong:font-semibold
        
        /* Links */
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800 prose-a:transition-all
        
        /* Lists */
        prose-li:text-slate-700 marker:text-blue-500
        
        /* Blockquotes */
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-700 prose-blockquote:not-italic prose-blockquote:shadow-sm
        
        /* Inline Code */
        prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal before:prose-code:content-none after:prose-code:content-none
        
        /* Images & Tables & Dividers */
        prose-img:rounded-xl prose-img:shadow-md
        prose-hr:border-slate-200

        /* ========================
           DARK MODE
        ======================== */
        dark:prose-invert
        
        dark:prose-headings:text-slate-100
        dark:prose-p:text-slate-300
        dark:prose-strong:text-slate-100
        dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
        dark:prose-li:text-slate-300 dark:marker:text-blue-400
        
        /* Dark Blockquotes */
        dark:prose-blockquote:bg-slate-800/50 dark:prose-blockquote:text-slate-300 dark:prose-blockquote:border-l-blue-400
        
        /* Dark Inline Code */
        dark:prose-code:text-pink-400 dark:prose-code:bg-slate-800
        
        /* Dark Dividers */
        dark:prose-hr:border-slate-700
      `}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}