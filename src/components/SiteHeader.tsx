import Link from "next/link";
import { site } from "@/content/jana";

const navLinks = [
  { href: "/osobni-trenink", label: "Osobní trénink" },
  { href: "/online-coaching", label: "Online coaching" },
  { href: "/o-jane", label: "O Janě" },
  { href: "/vysledky", label: "Výsledky" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-black tracking-tight text-ink">
          {site.domain}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/prihlaseni"
            className="hidden text-sm font-medium text-ink/70 hover:text-ink sm:block"
          >
            Přihlásit se
          </Link>
          <Link
            href="/spoluprace/"
            className="rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-ink/90 sm:px-4 sm:text-sm"
          >
            Začít
          </Link>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-black/5 px-4 py-2 text-sm font-medium text-ink/80 lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-ink">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
