import type { Metadata } from "next";
import Link from "next/link";
import { ProductChooser } from "@/components/ProductChooser";
import { getPackagesByProductLine } from "@/content/packages";

export const metadata: Metadata = {
  title: "Vyberte způsob spolupráce",
  description: "Online coaching nebo osobní trénink s Janou Švejdovou. Vyberte si cestu, která odpovídá vašemu cíli a režimu.",
};

export default function SpolupracePage() {
  const personalPackages = getPackagesByProductLine("personal");
  const onlinePackages = getPackagesByProductLine("online");

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">Začněte podle sebe</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl">
          Jak chcete s Janou spolupracovat?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
          Nemusíte předem vědět, který konkrétní balíček je pro vás nejlepší. Nejdřív vyberte způsob spolupráce a pak uvidíte jen relevantní možnosti.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <ProductChooser personalPackages={personalPackages} onlinePackages={onlinePackages} />
      </section>

      <section className="border-t border-black/5 bg-black/[0.018]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
          <h2 className="text-xl font-black text-ink">Nejste si jistí?</h2>
          <p className="max-w-xl text-sm leading-6 text-ink/65">
            Napište Janě svůj cíl a časové možnosti. Pomůže vám vybrat směr bez toho, abyste naslepo kupovali první kartu, která má největší tlačítko.
          </p>
          <Link href="/kontakt/" className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink hover:border-ink/30">
            Napsat Janě
          </Link>
        </div>
      </section>
    </>
  );
}
