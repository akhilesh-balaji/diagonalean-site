import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import hljs from "highlight.js";
// @ts-expect-error missing types in package
import leanHljs from "highlightjs-lean";

// hljs.registerLanguage("lean", () => ({
//   name: "Lean",
//   keywords: {
//     keyword: "def theorem lemma example by fun let in have show match with where do return if then else class instance structure extends namespace open import export private protected noncomputable abbrev variable universe initialize partial for",
//     literal: "true false Type Prop Sort some none",
//     built_in: "Nat Int Bool List Option Sum Prod Unit Empty String Float UInt8 UInt16 UInt32 UInt64 IO",
//   },
//   contains: [
//     { className: "comment", begin: "--", end: "$" },
//     { className: "comment", begin: "/-", end: "-/" },
//     { className: "string", begin: '"', end: '"' },
//     { className: "number", begin: "\\b\\d+(\\.\\d+)?\\b" },
//     { className: "title", begin: "\\b[A-Z][a-zA-Z0-9_']*\\b" },
//     { className: "symbol", begin: "(:=|=>|<-|->|←|→|⟨|⟩|∀|∃|λ|∧|∨|¬|≤|≥|≠|≡|α|β|γ|::|\\||=)" },
//   ],
// }));


const baseLean = leanHljs(hljs);

const kw =
  typeof baseLean.keywords === "object" &&
    baseLean.keywords !== null &&
    !Array.isArray(baseLean.keywords)
    ? baseLean.keywords
    : {};

baseLean.keywords = {
  ...kw,
  keyword: [
    typeof kw.keyword === "string" ? kw.keyword : "",
    "initialize partial elab throwError if then for return",
  ].join(" "),
  literal: [
    typeof kw.literal === "string" ? kw.literal : "",
    "true false some none",
  ].join(" "),
  built_in: [
    typeof kw.built_in === "string" ? kw.built_in : "",
    "Nat Int Bool List Option Sum Prod Unit Empty String Float UInt8 UInt16 UInt32 UInt64 IO Expr Name Edge Ext PCP MPCP",
  ].join(" "),
};

baseLean.contains ??= [];

baseLean.contains.push({
  className: "symbol",
  begin:
    "(:|≤ₘ|≥ₘ|:=|=>|<-|->|←|→|⟨|⟩|∀|∃|λ|∧|∨|¬|≤|≥|≠|≡|α|β|γ|::|\\||=|`)",
});

hljs.registerLanguage("lean", () => baseLean);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
