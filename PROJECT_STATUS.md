# JanaFitness – stav projektu

Aktualizováno: 2026-08-17

Tento dokument shrnuje produktová rozhodnutí, implementovaný stav z dosavadní práce a zbývající úkoly. Slouží jako kontrolní seznam a zdroj pravdy pro další vývoj.

> DŮLEŽITÉ: GitHub `main` zatím neobsahuje kompletní aplikační zdrojový kód. Obsahuje pouze inicializační soubory repozitáře. Poslední funkční změny existují v lokálních handoff balících z konverzace a musí být jednorázově importovány do tohoto repozitáře. Do té doby nelze označit žádnou z níže uvedených implementací za součást `main` ani za nasazenou produkci.

## 1. Produkční architektura – rozhodnuto

- [x] Active24 Webhosting Simple zůstává hostingem.
- [x] Frontend zůstává moderní: Next.js + React + TypeScript + Tailwind.
- [x] Frontend se pro Active24 vybuildí jako statický export.
- [x] Dynamický backend bude PHP JSON API.
- [x] Databáze bude MySQL/MariaDB na Active24.
- [x] OpenAI API bude používáno pro strukturované tréninkové plány.
- [x] Stripe bude použit pro online platby.
- [x] E-maily budou řešené přes serverovou frontu (`email_outbox`) a následně SMTP.
- [x] Active24 Shell/cron má sloužit pro background úlohy, e-mail worker a případně AI jobs.
- [x] GitHub `main` má být jediný zdroj pravdy.
- [x] Deploy ZIP má vždy vzniknout z konkrétního commit SHA.
- [ ] Jednorázově importovat kompletní současný projekt do `main`.
- [ ] Ověřit skutečné možnosti Active24 Shellu: Node, npm, PHP, Composer, Git, cron.

## 2. Verzování a deployment

- [x] Repo `czmajkl/JanaFitness` založené a dostupné pro zápis.
- [x] `README.md` obsahuje základní pravidla verzování/deploye.
- [x] `DEPLOYED_VERSION` existuje.
- [ ] Kompletní zdrojový kód ještě není v repu.
- [ ] `DEPLOYED_VERSION` je stále `not-deployed-yet`.
- [ ] Připravit reprodukovatelný build/deploy ZIP workflow.
- [ ] Každý deploy pojmenovat podle SHA, např. `janafitness-a1b2c3d.zip`.
- [ ] Po nasazení zapsat SHA do `DEPLOYED_VERSION`.
- [ ] Databázové migrace aplikovat podle konkrétního deploye.

## 3. Veřejný web / UX

Rozhodnuto a v posledním lokálním balíku implementováno:

- [x] Odstranit nefunkční tlačítko „Zobrazit ceník“.
- [x] Blok „Plán na míru / Průběžná podpora / Bez dojíždění“ přesunout pod online ceník.
- [x] Opravit rozbité české znaky typu `Výkon`, `Balíček 5 lekcí` apod.
- [x] Přidat UTF-8 kontroly a používat `utf8mb4` v DB vrstvě.
- [x] Kontaktní e-mail všude sjednotit na `jana@janafitnessrada.cz`.
- [x] Telefon všude sjednotit na `+420 774 641 541`.
- [x] „Napište Janě“ má zobrazovat e-mail i telefon a zpráva má směřovat na Janin e-mail.
- [ ] Po importu do GitHubu znovu projít celý frontend na mojibake/UTF-8 chyby.
- [ ] Ověřit všechny CTA na živém buildu.

## 4. Účet a autentizace

Rozhodnuto / implementováno v posledním lokálním balíku:

- [x] Registrace uživatele.
- [x] Přihlášení.
- [x] Minimální délka hesla nastavena na 5 znaků.
- [x] Horní limit hesla zůstává vyšší; hesla nejsou omezena na max. 10 znaků.
- [x] Password recovery přes jednorázový token.
- [x] Resetovací token má omezenou platnost a jednorázové použití.
- [ ] Ověření e-mailové adresy po registraci není dokončené.
- [ ] Změna hesla z přihlášeného profilu není dokončená.
- [ ] Recovery e-mail musí být ověřen na skutečném SMTP.

## 5. Produktový model – účet není produkt

Rozhodnuto:

- [x] Uživatel má jeden účet.
- [x] Z účtu si vybírá službu: online coaching nebo osobní trénink.
- [x] Onboarding, nákup a čerpání služby jsou oddělené kroky.
- [x] Online coaching a osobní trénink mají odlišný lifecycle.

Doporučený hlavní flow:

`Účet -> výběr služby -> onboarding -> výběr/nákup produktu -> čerpání služby`

## 6. Vstupní dotazník

Základem dotazníku je dokument „Onboardový formulář klienta“ dodaný v konverzaci.

Rozhodnuto / implementováno v posledním lokálním balíku:

- [x] Dotazník rozdělen na logické sekce: osobní údaje, zdravotní anamnéza, cíle, sportovní historie, dostupnost, vybavení, strava, doplňující informace, souhlasy.
- [x] Přidat věk, výšku a váhu.
- [x] Jméno/e-mail lze převzít z účtu místo opakovaného zadávání.
- [x] Podmíněné otázky jsou podporované.
- [x] Dostupnost tréninku má podporovat den × část dne.
- [x] Zdravotní odpovědi mohou vynutit ruční kontrolu plánu.
- [x] Po odeslání je dotazník zeleně označený jako hotový.
- [x] Hotový dotazník se už neupravuje přímo.
- [x] Uživatel může starý dotazník zobrazit.
- [x] CTA „Vyplnit znovu“ vytvoří novou verzi.
- [x] Starší verze zůstávají uložené a dohledatelné.
- [x] Samotné odeslání dotazníku automaticky nezakládá free trial.
- [ ] Dotazníky podle tieru/služby nejsou plně dotažené.
- [ ] Potřebujeme definovat společnou část + online část + osobní část.
- [ ] Při přechodu mezi službami znovu použít již známé údaje a chtít pouze chybějící odpovědi.

## 7. Success stránka po dotazníku

Rozhodnuto / v posledním lokálním balíku částečně implementováno:

- [x] Po odeslání dotazníku nemá uživatel skončit pouze na dashboardu.
- [x] Má vidět motivační zakončení typu „Je to tam! První krok máte za sebou.“
- [x] Pokud ještě nic nekoupil, následuje výběr služby: Online coaching / Osobní trénink.
- [x] U online větve následuje volba: 7 dní zdarma / měsíční placený balíček.
- [x] Pokud už placený online balíček koupil před dotazníkem, success stránka nemá znovu prodávat produkt; má potvrdit, že Jana má vše potřebné a připravuje plán.
- [ ] Finální texty a vizuální návrh success stránky ještě projít v produkčním buildu.

## 8. Online coaching – 7 dní zdarma

Rozhodnuto:

- [x] Bezplatný týden není automatický po registraci.
- [x] Bezplatný týden není automatický po pouhém odeslání dotazníku.
- [x] Uživatel musí explicitně zvolit „7 dní zdarma“.
- [x] Bez dotazníku se free plán nepřipravuje.
- [x] Po výběru free varianty vznikne stav `waiting_for_plan`.
- [x] Jana připraví plán a nahraje/publikuje JSON.
- [x] Sedmidenní platnost začne až publikací plánu, ne registrací ani odesláním dotazníku.
- [x] U plánu musí být jasně napsané, že je pouze na 7 dní.
- [x] Dashboard má zobrazovat začátek, konec a zbývající dobu.
- [x] Po skončení se účet nemaže; nabídne se pokračování placeným balíčkem.
- [ ] Finální UI 7denního plánu je potřeba ověřit po skutečném Next buildu.
- [ ] E-mail před koncem trialu ještě není dokončený.

## 9. Placený online coaching

Rozhodnuto:

- [x] Uživatel může koupit placený online balíček i před vyplněním dotazníku.
- [x] Po platbě bez dotazníku má být výrazné CTA na vyplnění dotazníku.
- [x] Balíček zůstává ve stavu „čeká na dotazník / plán“.
- [x] Po odeslání dotazníku přejde na „čeká na plán“.
- [x] Jana dostane podklady a připraví plán.
- [x] Platnost placeného období začne až publikací/nahráním plánu.
- [x] Administrace má zobrazovat datum platby, nahrání plánu, začátek a konec období.
- [x] Pro první verzi používat měsíční balíček jako jednorázovou platbu.
- [ ] Automatické recurring subscription není dokončené.
- [ ] Před zapnutím recurring musí webhook založit nový coachingový měsíc / nový úkol pro Janu.

## 10. Osobní trenérství

Produktově rozhodnuto, ale implementace není dokončená:

- [x] Osobní trenérství má být samostatná větev od online coachingu.
- [x] Nemá slepě používat stejný lifecycle jako online plán.
- [x] Produkty mohou být např. jednorázová lekce, 5 lekcí, 10 lekcí.
- [x] Pro osobní trénink dává smysl evidovat `sessions_total`, `sessions_used`, `sessions_remaining`.
- [x] Osobní onboarding má obsahovat cíl, místo, dostupnost/termíny, zdravotní omezení a kontakt.
- [ ] Databázový lifecycle osobních balíčků není dokončený.
- [ ] Chybí evidence čerpání jednotlivých lekcí.
- [ ] Chybí rezervace/termíny.
- [ ] Chybí finální osobní checkout flow.

## 11. AI plán – zásadní pravidlo

Rozhodnuto:

- [x] JSON schema neurčuje konkrétní cviky ani tréninkový obsah.
- [x] AI rozhoduje o cvicích, technice, sériích, opakováních, tempu, pauzách, RIR/RPE, intenzitě, intervalech, názvech sekcí a dalších obsahových detailech.
- [x] JSON definuje pouze mantinely/prezentační strukturu, kterou frontend umí zobrazit.
- [x] Není povinný katalog cviků.
- [x] Frontend má být pružný a zobrazit jen relevantní pole.
- [x] Schema musí být verzované (`schema_version`).
- [x] Systémová metadata neřídí AI: user ID, tier, registrace, upload/publikace, `valid_from`, `valid_until`, payment/subscription status.

Implementováno v posledním lokálním balíku:

- [x] Flexibilní Plan Schema v2.
- [x] Struktura typu weeks -> days -> sections -> blocks/items.
- [x] Podpora různých typů aktivit (exercise, superset, circuit, interval, cardio, mobility, recovery, note).
- [x] Serverový validator.
- [x] Chyba validace vrací konkrétní cestu v JSONu.
- [x] Admin náhled a klient používají stejný renderer.
- [x] Starší schema v1 má zůstat zobrazitelné.
- [ ] Po importu do GitHubu znovu ověřit schema + renderer jako jeden celek.
- [ ] Projít reálné AI výstupy s více typy tréninků a edge cases.

## 12. AI workflow Jany

Rozhodnuto / implementováno v posledním lokálním balíku:

- [x] Jana v administraci vidí klienta a jeho dotazník.
- [x] Systém připraví AI prompt automaticky.
- [x] Jana může prompt zkopírovat / stáhnout.
- [x] Jana vloží prompt do AI.
- [x] AI vrátí JSON.
- [x] Jana JSON vloží nebo nahraje.
- [x] JSON se validuje.
- [x] Jana vidí náhled před publikací.
- [x] Publikace aktivuje období.
- [x] Metadata jako registrace a vytvoření/publikace plánu doplňuje systém důvěryhodnými hodnotami.
- [ ] Automatické přímé generování přes OpenAI API je sekundární a musí být před produkcí znovu otestované.

## 13. Administrace Jany

Rozhodnuto / částečně implementováno:

- [x] Detail klienta.
- [x] Dotazník zobrazený lidsky, ne jako surová DB pole.
- [x] Stav balíčku.
- [x] Začátek/konec platnosti.
- [x] AI prompt workflow.
- [x] Upload JSON / validace / náhled / publikace.
- [x] Nové zprávy od klientů mají být oranžově zvýrazněné.
- [x] Administrace má ukazovat počty čekajících stavů / nových zpráv.
- [ ] Interní „Poznámky pro trenéra“ z původního DOCX nejsou plně dotažené jako samostatná admin sekce.
- [ ] Finální dashboard fronty práce (čeká na dotazník, čeká na plán, končí brzy atd.) ještě produkčně ověřit.

## 14. Zprávy s Janou

Rozhodnuto / částečně implementováno:

- [x] Klient může psát Janě.
- [x] Jana má možnost odpovědět z administrace.
- [x] Nepřečtená příchozí zpráva má být oranžová.
- [x] Klientský dashboard má ukazovat oranžový stav / badge při nové zprávě.
- [x] Admin má oranžově zvýraznit klienta s novou zprávou.
- [x] Nová zpráva klienta má vytvořit e-mailové upozornění Janě.
- [ ] Ověřit read/unread stav a badge end-to-end na skutečné DB.
- [ ] Ověřit e-mailové upozornění přes SMTP.

## 15. E-mailový systém

Rozhodnuto / částečně implementováno:

- [x] Hlavní e-mail Jany: `jana@janafitnessrada.cz`.
- [x] Kontaktní formulář / „Napište Janě“ má mířit na tento e-mail.
- [x] Telefon Jany: `+420 774 641 541`.
- [x] Databázová/frontová vrstva `email_outbox` byla navržena/implementována v lokálním balíku.
- [x] Password recovery má používat email outbox.
- [x] Dotazník -> e-mail Janě.
- [x] Platba -> e-mail Janě.
- [x] Nová zpráva klienta -> e-mail Janě.
- [x] Publikace plánu -> e-mail klientovi.
- [x] Kontakt -> e-mail Janě.
- [ ] SMTP není produkčně nakonfigurované ani otestované.
- [ ] Přidat potvrzení přijetí dotazníku klientovi, pokud bude chtěné ve finální UX.
- [ ] Přidat upozornění před koncem plánu/trialu.
- [ ] Ověřit retry chování cron workeru.

## 16. Platby / payment page

Rozhodnuto / implementováno v posledním lokálním balíku:

- [x] „Chci balíček“ nemá házet technickou chybu „Stripe není nastavený“.
- [x] Má vést na samostatnou payment podstránku.
- [x] Payment stránka má obsahovat rekapitulaci balíčku a cenu.
- [x] Má obsahovat výběr Stripe / QR platba.
- [x] QR kód je zatím placeholder.
- [x] Stripe je zatím viditelný jako připravovaná možnost, pokud není live.
- [x] Na stránce má být jasná informace, že web je ve vývoji a pro nákup má uživatel kontaktovat Janu.
- [x] Stránka má obsahovat kontakt `jana@janafitnessrada.cz` a `+420 774 641 541`.
- [x] Má obsahovat odkazy na obchodní podmínky / GDPR.
- [x] Skutečné platby mají být zatím bezpečně vypnuté, dokud není konfigurace hotová.
- [ ] Doplnit IČO/fakturační údaje Jany.
- [ ] Doplnit bankovní účet / parametry pro skutečný QR kód.
- [ ] Nastavit Stripe secret key + webhook secret.
- [ ] Otestovat úspěšnou i neúspěšnou platbu end-to-end.
- [ ] Teprve potom zapnout `PAYMENTS_LIVE`.

## 17. Stripe recurring payments

- [x] Stripe recurring payments technicky podporuje budoucí subscription model.
- [x] Rozhodnutí pro V1: měsíční coaching jako jednorázová platba.
- [ ] Subscription renewal flow není implementovaný.
- [ ] Při budoucím recurring musí každá úspěšná obnova vytvořit nový coachingový cyklus / úkol pro Janu.
- [ ] Řešit `invoice.paid`, `invoice.payment_failed`, cancellation a customer portal.

## 18. Data / databáze

Implementované/rozhodnuté oblasti:

- [x] Uživatelé.
- [x] Profily klientů.
- [x] Historie dotazníků.
- [x] Plány a jejich verze.
- [x] Platnost období/balíčků.
- [x] AI jobs / koncepty.
- [x] Zprávy.
- [x] Check-in základ.
- [x] Objednávky / Stripe vazby.
- [x] Email outbox.
- [x] `utf8mb4` jako požadovaný encoding.
- [ ] Všechny migrace je nutné po importu seřadit, zkontrolovat a otestovat od čisté DB i při upgrade existující DB.
- [ ] Chybí finální lifecycle osobních lekcí.

## 19. Co je nyní největší technické riziko

1. Kompletní zdrojový kód zatím není v GitHubu, takže nelze spolehlivě určit, co je skutečně aktuální `main`.
2. Žádná z posledních změn není podle `DEPLOYED_VERSION` potvrzená jako nasazená na Active24.
3. Plný `npm install` / `next build` nebyl v předchozím pracovním prostředí spolehlivě dokončen kvůli síťovému timeoutu registru.
4. SMTP není produkčně otestované.
5. Stripe live není nakonfigurovaný.
6. Databázové migrace potřebují jeden konsolidační průchod.
7. Osobní trenérství nemá dokončený produktový lifecycle.

## 20. Doporučené další pořadí práce

### P0 – nejdřív vyřešit zdroj pravdy

- [ ] Importovat celý poslední projekt do `czmajkl/JanaFitness`.
- [ ] Zkontrolovat, že v repu nejsou hesla/API klíče.
- [ ] Commitnout čistý „baseline“ stav.
- [ ] Od tohoto okamžiku všechny změny dělat pouze přes GitHub.

### P1 – build a produkční základ

- [ ] Rozchodit `npm ci` / lint / typecheck / build v reprodukovatelném prostředí.
- [ ] Připravit ZIP z konkrétního SHA.
- [ ] Ověřit Active24 Shell/cron.
- [ ] Ověřit instalaci/migraci databáze.
- [ ] Nasadit první sledovanou verzi a zapsat SHA do `DEPLOYED_VERSION`.

### P2 – produktové flow

- [ ] End-to-end test registrace -> dotazník -> success page -> free/paid online.
- [ ] End-to-end test paid-before-intake.
- [ ] End-to-end test Jana admin -> AI prompt -> JSON -> validace -> publikace -> aktivace období.
- [ ] End-to-end test zpráv a unread oranžového stavu.

### P3 – e-maily

- [ ] Nastavit SMTP Active24.
- [ ] Spustit cron email worker.
- [ ] Otestovat recovery, dotazník, zprávu, publikaci plánu a payment notifikace.

### P4 – platby

- [ ] Doplnit firemní/fakturační údaje.
- [ ] Doplnit bankovní údaje pro QR.
- [ ] Nastavit Stripe test mode.
- [ ] Otestovat checkout + webhooky.
- [ ] Až poté zapnout live platby.

### P5 – osobní trenérství

- [ ] Definovat finální produkty osobního tréninku.
- [ ] Datový model počtu lekcí.
- [ ] Evidence čerpání.
- [ ] Termíny/rezervace.
- [ ] Vlastní onboarding a admin flow.

## 21. Definice „hotovo“ pro další práci

Funkce se nepovažuje za hotovou jen proto, že existuje tlačítko nebo komponenta. Pro každý feature blok kontrolovat:

1. datový model,
2. backend pravidla a oprávnění,
3. frontend/UI,
4. stavové a chybové scénáře,
5. e-mail/notifikace, pokud relevantní,
6. migrace,
7. end-to-end test,
8. commit SHA,
9. deploy SHA v `DEPLOYED_VERSION`, pokud je nasazený.

## 22. Aktuální produkční status

- GitHub source import: **NEHOTOVO**
- Reprodukovatelný Next build: **NEOVĚŘENO**
- Databáze na Active24: **NEPOTVRZENO**
- SMTP: **NEHOTOVO**
- Stripe live: **VYPNUTO / NEHOTOVO**
- QR live: **PLACEHOLDER**
- Active24 deployment SHA: **žádný (`not-deployed-yet`)**

Dokud není zdrojový kód importovaný do `main` a nasazený commit zapsaný v `DEPLOYED_VERSION`, je potřeba považovat starší ZIPy pouze za historické pracovní handoffy, ne za autoritativní produkční zdroj.
