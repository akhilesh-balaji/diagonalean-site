// export default function Footer() {
//       return (<div className="flex items-center gap-0 md:gap-2 py-2 content-center backdrop-blur-lg  bg-base-200/80 px-4 rounded-xl sm:rounded-xl fixed top-2 border-2  border-base-300/80 z-50 left-1/2 -translate-x-1/2 min-w-max"></div>);
// }

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    heading: "Project",
    links: [
      { label: "GitHub", href: "https://github.com/aalok-thakkar/undecidability" },
      { label: "TODO", href: "https://github.com/aalok-thakkar/undecidability/blob/Main/TODO.md" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Documentation",
    links: [
      { label: "Lean 4 Docs", href: "https://leanprover.github.io/lean4/doc/" },
      { label: "Readme", href: "https://github.com/aalok-thakkar/undecidability/blob/Main/README.md" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Mathlib", href: "https://leanprover-community.github.io/mathlib4_docs/" },
      { label: "CSLib", href: "https://github.com/cslib" },
      { label: "Lean Playground", href: "https://live.lean-lang.org/" },
      { label: "Loogle", href: "https://loogle.lean-lang.org/" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "License", href: "https://github.com/aalok-thakkar/undecidability/blob/Main/LICENSE" },
      { label: "Code of Conduct", href: "#" },
    ],
  },
];

function FooterLinkItem({ label, href }: FooterLink) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-sm text-base-content hover:text-tertiary hover:italic transition-colors duration-150"
    >
      {label}
    </a>
  );
}

function FooterColumn({ heading, links }: FooterColumn) {
  return (
    <div className="flex flex-col gap-3 min-w-[120px]">
      <p className="text-sm font-semibold text-secondary uppercase">
        {heading}
      </p>
      {links.map((link) => (
        <FooterLinkItem key={link.label} label={link.label} href={link.href} />
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-base-200/50 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col gap-4 shrink-0">
            <a href="#">
              <img
                src="/logo-dark.png"
                alt="DiagonaLean"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-sm text-base-content max-w-[180px] leading-relaxed">
              A compositional toolkit for mechanised undecidability in Lean 4.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 flex-1 md:justify-end">
            {footerColumns.map((col) => (
              <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
