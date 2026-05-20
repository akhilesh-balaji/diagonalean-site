import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import hljs from "highlight.js";

hljs.registerLanguage("lean", () => ({
  name: "Lean",
  keywords: {
    keyword: "def theorem lemma example by fun let in have show match with where do return if then else class instance structure extends namespace open import export private protected noncomputable abbrev variable universe",
    literal: "true false Type Prop Sort",
    built_in: "Nat Int Bool List Option Sum Prod Unit Empty String Float UInt8 UInt16 UInt32 UInt64 IO",
  },
  contains: [
    { className: "comment", begin: "--", end: "$" },
    { className: "comment", begin: "/-", end: "-/" },
    { className: "string", begin: '"', end: '"' },
    { className: "number", begin: "\\b\\d+(\\.\\d+)?\\b" },
    { className: "title", begin: "\\b[A-Z][a-zA-Z0-9_']*\\b" },
    { className: "symbol", begin: "(:=|=>|<-|->|←|→|⟨|⟩|∀|∃|λ|∧|∨|¬|≤|≥|≠|≡|α|β|γ|::|\\||=)" },
  ],
}));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
