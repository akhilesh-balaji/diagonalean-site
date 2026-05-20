// import { useEffect, useState } from "react";
// import { marked } from "marked";
// import hljs from "highlight.js";
//
// const RAW_URL =
//   "https://raw.githubusercontent.com/aalok-thakkar/undecidability/refs/heads/Main/TODO.md";
//
// export default function Roadmap() {
//   const [html, setHtml] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//
//   useEffect(() => {
//     fetch(RAW_URL)
//       .then((r) => {
//         if (!r.ok) throw new Error(`HTTP ${r.status}`);
//         return r.text();
//       })
//       .then((md) => {
//         // Strip the first # title line
//         const withoutTitle = md.replace(/^#[^\n]*\n/, "");
//         setHtml(marked(withoutTitle) as string);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError(true);
//         setLoading(false);
//       });
//   }, []);
//
//   return (
//     <section id="roadmap" className="w-full px-6 py-20 max-w-4xl mx-auto">
//       {loading && (
//         <p className="text-sm text-base-content/40 text-center py-12">Loading roadmap…</p>
//       )}
//       {error && (
//         <p className="text-sm text-error text-center py-12">Failed to load roadmap.</p>
//       )}
//       {!loading && !error && (
//         <div
//           className="prose prose-sm max-w-none
//             prose-headings:text-base-content
//             prose-p:text-base-content/70
//             prose-a:text-primary prose-a:no-underline hover:prose-a:underline
//             prose-code:text-secondary prose-code:bg-base-300 prose-code:px-1 prose-code:rounded
//             prose-pre:bg-base-300 prose-pre:text-base-content
//             prose-strong:text-base-content
//             prose-li:text-base-content/70
//             prose-hr:border-base-300"
//           dangerouslySetInnerHTML={{ __html: html }}
//         />
//       )}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { marked } from "marked";
import hljs from "highlight.js";

const RAW_URL =
  "https://raw.githubusercontent.com/aalok-thakkar/undecidability/refs/heads/Main/TODO.md";

export default function Roadmap() {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang }) => {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre class="rounded-lg p-4 overflow-x-auto mb-4 text-xs leading-relaxed" style="background:#073642"><code class="hljs language-${language}">${highlighted}</code></pre>`;
    };

    marked.use({ renderer });

    fetch(RAW_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((md) => {
        const withoutTitle = md.replace(/^#[^\n]*\n/, "");
        setHtml(marked(withoutTitle) as string);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="roadmap" className="w-full px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
        Roadmap for <span className="text-primary">Diagona</span>Lean
      </h1>
      <p className="text-base-content/90 text-sm mb-12">
        Synced live from{" "}
        <a
          href="https://github.com/aalok-thakkar/undecidability/blob/Main/TODO.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tertiary hover:underline"
        >
          TODO.md
        </a>
      </p>
      {loading && (
        <p className="text-lg text-base-content/40 text-center py-12">Loading roadmap…</p>
      )}
      {error && (
        <p className="text-lg text-error text-center py-12">Failed to load roadmap.</p>
      )}
      {!loading && !error && (
        <div
          className="prose prose-md max-w-none
          prose-headings:text-base-content
          prose-p:text-base-content
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:text-secondary prose-code:bg-base-300 prose-code:px-1 prose-code:rounded
          prose-pre:!bg-transparent prose-pre:!p-2 prose-pre:!m-0 prose-pre:!rounded-lg  prose-pre:text-lg prose-pre:border-base-300 prose-pre:border-2
          prose-strong:text-base-content
          prose-li:text-base-content
          prose-hr:border-base-300"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </section>
  );
}
