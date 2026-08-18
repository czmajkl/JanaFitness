"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/client/AuthProvider";
import { apiFetch } from "@/lib/api";

type JourneyState =
  | "questionnaire_required"
  | "questionnaire_completed"
  | "paid_waiting_for_intake"
  | "waiting_for_free_plan"
  | "free_plan_active"
  | "free_plan_expired"
  | "waiting_for_paid_plan"
  | "paid_plan_active"
  | "paid_plan_expired";

type PeriodStatus = "waiting_for_intake" | "waiting_for_plan" | "active" | "expired" | "cancelled";

type Dashboard = {
  registeredAt: string | null;
  journeyState: JourneyState;
  activePackage: string | null;
  intakeStatus: string | null;
  intakeSubmittedAt: string | null;
  planStatus: string | null;
  currentPeriod: {
    id: number;
    kind: "free_trial" | "paid";
    status: PeriodStatus;
    durationDays: number;
    startsAt: string | null;
    endsAt: string | null;
  } | null;
  pendingPaidPeriod: {
    id: number;
    status: "waiting_for_intake" | "waiting_for_plan";
    durationDays: number;
    packageTitle: string;
  } | null;
  unreadMessages: number;
  freeTrialEligible: boolean;
};

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" }).format(new Date(value));
}

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    apiFetch<Dashboard>("/api/dashboard.php").then(setData).catch(() => setData(null));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black text-ink">Ahoj, {user.name}</h1>
      <p className="mt-2 text-ink/60">Tady uvidíte stav spolupráce, dotazník, plán a zprávy s Janou.</p>

      {data ? (
        <>
          <JourneyCard data={data} />
          {data.pendingPaidPeriod ? <PendingPaidNotice period={data.pendingPaidPeriod} /> : null}
        </>
      ) : <div className="mt-6 h-40 animate-pulse rounded-2xl bg-black/5" />}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.intakeStatus ? (
          <div className="rounded-2xl border border-lime-ink/25 bg-lime-soft p-6">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold text-ink">Vstupní dotazník</h2>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-lime-ink">Hotovo</span>
            </div>
            <p className="mt-1 text-sm text-ink/60">Odeslán {formatDate(data.intakeSubmittedAt) ?? ""}. Tato verze už se neupravuje.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/app/dotaznik/" className="text-sm font-bold text-lime-ink underline underline-offset-4">Zobrazit</Link>
              <Link href="/app/dotaznik/?new=1" className="text-sm font-bold text-ink underline underline-offset-4">Vyplnit znovu</Link>
            </div>
          </div>
        ) : (
          <Link href="/app/dotaznik/" className="rounded-2xl border border-black/10 p-6 hover:border-black/20">
            <h2 className="font-bold text-ink">Vstupní dotazník</h2>
            <p className="mt-1 text-sm text-ink/60">Povinný před přípravou prvního plánu</p>
          </Link>
        )}
        <Link href="/app/plan/" className="rounded-2xl border border-black/10 p-6 hover:border-black/20">
          <h2 className="font-bold text-ink">Tréninkový plán</h2>
          <p className="mt-1 text-sm text-ink/60">{data?.planStatus === "published" ? "Plán je připravený" : "Zobrazí se až po nahrání a zveřejnění Janou"}</p>
        </Link>
        <Link href="/app/progres/" className="rounded-2xl border border-black/10 p-6 hover:border-black/20">
          <h2 className="font-bold text-ink">Progres</h2>
          <p className="mt-1 text-sm text-ink/60">Týdenní check-iny a poznámky</p>
        </Link>
        <Link href="/app/zpravy/" className={`rounded-2xl border p-6 transition ${data?.unreadMessages ? "border-orange-300 bg-orange-50 hover:border-orange-400" : "border-black/10 hover:border-black/20"}`}>
          <div className="flex items-start justify-between gap-2">
            <h2 className={`font-bold ${data?.unreadMessages ? "text-orange-800" : "text-ink"}`}>Zprávy s Janou</h2>
            {data?.unreadMessages ? <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-black text-white">{data.unreadMessages}</span> : null}
          </div>
          <p className={`mt-1 text-sm ${data?.unreadMessages ? "text-orange-800/75" : "text-ink/60"}`}>{data?.unreadMessages ? "Máte novou zprávu" : "Žádné nové zprávy"}</p>
        </Link>
      </div>
    </div>
  );
}

function PendingPaidNotice({ period }: { period: NonNullable<Dashboard["pendingPaidPeriod"]> }) {
  const needsIntake = period.status === "waiting_for_intake";
  return (
    <section className="mt-4 rounded-2xl border border-brand-dark/20 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">Zakoupený navazující balíček</p>
      <h2 className="mt-1 text-lg font-black text-ink">{period.packageTitle}</h2>
      <p className="mt-2 text-sm text-ink/70">{needsIntake ? "K přípravě tohoto balíčku ještě potřebujeme vstupní dotazník." : "Dotazník máme a Jana připravuje navazující plán. Jeho platnost začne až publikací."}</p>
      {needsIntake ? <Link href="/app/dotaznik/" className="mt-3 inline-flex text-sm font-bold text-brand-dark underline underline-offset-4">Vyplnit dotazník →</Link> : null}
    </section>
  );
}

function JourneyCard({ data }: { data: Dashboard }) {
  const start = formatDate(data.currentPeriod?.startsAt);
  const end = formatDate(data.currentPeriod?.endsAt);

  if (data.journeyState === "paid_waiting_for_intake") {
    return (
      <section className="mt-6 rounded-3xl border border-brand-dark/30 bg-brand/10 p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">Platba přijata · chybí dotazník</p>
        <h2 className="mt-2 text-2xl font-black text-ink">{data.activePackage ?? "Online balíček"} je připravený k zahájení</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Balíček máte zaplacený, ale jeho platnost ještě neběží. Vyplňte vstupní dotazník, aby Jana dostala podklady k přípravě vašeho plánu.</p>
        <Link href="/app/dotaznik/" className="mt-5 inline-flex rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white">Vyplnit vstupní dotazník →</Link>
      </section>
    );
  }

  if (data.journeyState === "questionnaire_required") {
    return (
      <section className="mt-6 rounded-3xl border border-lime-ink/30 bg-lime-soft p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-lime-ink">Online coaching · můžete začít zdarma</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Vyplňte vstupní dotazník</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Po odeslání dotazníku si vyberete, zda chcete začít 7denním online plánem zdarma, rovnou měsíčním online balíčkem, nebo pokračovat k osobnímu tréninku. Pokud už víte, který placený balíček chcete, můžete ho koupit i před dotazníkem.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/app/dotaznik/" className="inline-flex rounded-full bg-lime-ink px-6 py-3 text-sm font-bold text-white">Vyplnit dotazník →</Link>
          <Link href="/spoluprace/" className="inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-bold text-ink">Vybrat způsob spolupráce</Link>
        </div>
      </section>
    );
  }

  if (data.journeyState === "questionnaire_completed") {
    return (
      <section className="mt-6 rounded-3xl border border-lime-ink/30 bg-lime-soft p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-lime-ink">Dotazník je hotový</p>
        <h2 className="mt-2 text-2xl font-black text-ink">První krok máte za sebou. Co dál?</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Vyberte online coaching nebo osobní trénink. U online můžete začít 7denním plánem zdarma, pokud je pro váš účet ještě dostupný.</p>
        <Link href="/app/dotaznik/hotovo/" className="mt-5 inline-flex rounded-full bg-lime-ink px-6 py-3 text-sm font-bold text-white">Vybrat další krok →</Link>
      </section>
    );
  }

  if (data.journeyState === "waiting_for_free_plan") {
    return (
      <section className="mt-6 rounded-3xl border border-amber-300 bg-amber-50 p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Dotazník přijat</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Jana připravuje váš startovací plán</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Bezplatný týden zatím neběží. Spustí se až po nahrání a zveřejnění plánu Janou. Jakmile bude připravený, uvidíte ho tady a dostanete upozornění e-mailem.</p>
      </section>
    );
  }

  if (data.journeyState === "free_plan_active") {
    return (
      <section className="mt-6 rounded-3xl border border-lime-ink/30 bg-lime-soft p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-lime-ink">7denní plán zdarma · aktivní</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Váš startovací plán je připravený</h2>
        {start && end ? <p className="mt-2 text-sm font-semibold text-ink/70">Platnost {start} – {end}</p> : null}
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Jde opravdu pouze o sedmidenní bezplatný přístup. Po jeho skončení můžete navázat měsíčním balíčkem.</p>
        <Link href="/app/plan/" className="mt-5 inline-flex rounded-full bg-lime-ink px-6 py-3 text-sm font-bold text-white">Otevřít plán →</Link>
      </section>
    );
  }

  if (data.journeyState === "free_plan_expired") {
    return (
      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/50">Startovací týden skončil</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Chcete pokračovat další měsíc?</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Vyberte si online balíček. Vstupní dotazník už máme, takže po platbě Jana dostane podklady k přípravě dalšího plánu.</p>
        <Link href="/online-coaching/#cenik" className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Vybrat měsíční balíček →</Link>
      </section>
    );
  }

  if (data.journeyState === "waiting_for_paid_plan") {
    return (
      <section className="mt-6 rounded-3xl border border-amber-300 bg-amber-50 p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Platba i dotazník přijaty</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Jana připravuje váš placený plán</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Teď už od vás nic nepotřebujeme. Platnost balíčku začne až ve chvíli, kdy Jana hotový plán nahraje a zveřejní.</p>
      </section>
    );
  }

  if (data.journeyState === "paid_plan_expired") {
    return (
      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/50">Placené období skončilo</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Chcete navázat dalším měsícem?</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">Váš účet, dotazník i historie zůstávají uložené. Vyberte další online balíček a Jana připraví navazující plán.</p>
        <Link href="/online-coaching/#cenik" className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Vybrat další balíček →</Link>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-brand-dark/30 bg-brand/10 p-6 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">Aktivní online coaching</p>
      <h2 className="mt-2 text-2xl font-black text-ink">{data.activePackage ?? "Aktivní balíček"}</h2>
      {start && end ? <p className="mt-2 text-sm font-semibold text-ink/70">Platnost {start} – {end}</p> : null}
      <Link href="/app/plan/" className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Otevřít aktuální plán →</Link>
    </section>
  );
}
