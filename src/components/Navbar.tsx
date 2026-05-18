const links = [
  { label: "Home", href: "#", external: false },
  { label: "About", href: "#about", external: false },
  { label: "Roadmap", href: "#roadmap", external: false },
  // { label: "Team", href: "#team", external: false },
  { label: "GitHub", href: "https://github.com", external: true },
];

function NavLink({ label, href, external }: { label: string; href: string; external: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-lg text-base-content/70 px-2 py-0.5 rounded-sm transition-all duration-150 hover:text-tertiary hover:italic hover:bg-base-300/50"
    >
      {label}
    </a >
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-base-200/80 backdrop-blur-md border-0 border-base-300 rounded-lg px-2 md:px-6 py-2 flex items-center gap-0 md:gap-3 max-w-[95vw] md:w-auto overflow-hidden">
      <a href="#" className="flex items-center shrink-0 mr-1 md:mr-2">
        <img src="/logo-dark.png" alt="DiagonaLean logo" className="h-5 md:h-6 w-auto" />
      </a>
      {links.map((link) => (
        <NavLink key={link.label} label={link.label} href={link.href} external={link.external} />
      ))}
    </nav>
  );
}
