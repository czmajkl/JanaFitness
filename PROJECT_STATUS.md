# JanaFitness - aktuální stav projektu

Aktualizováno: 2026-08-18

Tento dokument je kontrolní seznam projektu. GitHub `main` je nyní jediný zdroj pravdy pro další vývoj.

## Legenda

- **MAIN**: implementováno v aktuálním zdrojovém kódu na `main`.
- **TODO**: chybí nebo vyžaduje další práci.
- **DEPLOY**: týká se nasazení a ověření na Active24.

## 0. Repozitář a verzování

- [x] **MAIN** Kompletní aplikační zdrojový kód je importovaný do `czmajkl/JanaFitness`.
- [x] **MAIN** Frontend, PHP API, databázové migrace, veřejné assety, obrázky a favicon jsou součástí repozitáře.
- [x] **MAIN** Dočasný bootstrap použitý pro import je odstraněný.
- [x] **MAIN** `README.md`, `PROJECT_STATUS.md`, `UX_ADMIN_DIRECTION.md` a `DEPLOYED_VERSION` existují.
- [x] **MAIN** Další práce se dělá pouze proti GitHub `main`.
- [ ] **DEPLOY** Aktuální `main` ještě není potvrzený jako nasazený na Active24.
- [ ] **DEPLOY** Po prvním novém deployi zapsat skutečný commit SHA do `DEPLOYED_VERSION`.

## 1. Vstupní dotazník

Zdrojová šablona je dodaný dokument `Onboardový formulář klienta`. Obsah zachovává jeho věcnou strukturu a UX ji rozšiřuje o interaktivní průchod.

- [x] **MAIN** 9 sekcí: osobní údaje, zdravotní anamnéza, cíle a motivace, zdatnost a historie, čas a dny, vybavení, strava a doplňky, doplňující informace, souhlasy.
- [x] **MAIN** Věk, výška a váha jsou součástí profilu a dotazníku.
- [x] **MAIN** Zachované zdravotní otázky, sportovní historie, tělesné parametry, dostupnost, vybavení, stravovací návyky a souhlasy.
- [x] **MAIN** Dotazník je interaktivní průvodce po sekcích místo jedné dlouhé stránky.
- [x] **MAIN** Progress indikátor a validace povinných odpovědí.
- [x] **MAIN** Podmíněné otázky podle předchozích odpovědí.
- [x] **MAIN** Dostupnost den x část dne je responzivní.
- [x] **MAIN** Odeslaný dotazník je neměnný snapshot.
- [x] **MAIN** Hotový dotazník je v klientské zóně zelený.
- [x] **MAIN** Klient může dotazník zobrazit a použít CTA `Vyplnit znovu`.
- [x] **MAIN** Nové vyplnění vytvoří další verzi a starší verze zůstávají uložené.
- [x] **MAIN** Jana v administraci vidí historii verzí.
- [x] **MAIN** Jana má CTA pro stažení dotazníku jako JSON a Word kompatibilní dokument.
- [ ] **TODO** Pokud má být export nativní `.docx` podle přesného vizuálu původní šablony, doplnit serverový DOCX generátor.
- [ ] **TODO** Dotáhnout modulární model `common + online + personal`, aby se známé údaje neopakovaly při změně služby.

## 2. Stav po odeslání dotazníku

- [x] **MAIN** Odeslání dotazníku samo o sobě nezakládá free trial.
- [x] **MAIN** Po odeslání následuje motivační stav `Je to tam! První krok máte za sebou.`
- [x] **MAIN** Pokud uživatel nemá službu, vybírá Online coaching nebo Osobní trénink.
- [x] **MAIN** Online větev nabízí 7 dní zdarma nebo placený online balíček.
- [x] **MAIN** Pokud už uživatel zaplatil, success stav ho znovu nenutí kupovat a informuje o přípravě plánu.
- [ ] **DEPLOY** Ověřit celý success flow v produkčním buildu a na telefonu.

## 3. Autentizace a účet

- [x] **MAIN** Registrace a přihlášení.
- [x] **MAIN** Minimální délka hesla je 5 znaků ve frontendu i PHP validaci.
- [x] **MAIN** `Zapomněli jste heslo?` a password recovery flow.
- [x] **MAIN** Reset používá jednorázový token s omezenou platností.
- [x] **MAIN** V klientské zóně logo odkazuje na hlavní web a vedle je text `Uživatelský účet`.
- [x] **MAIN** Mobilní navigace účtu je kompaktnější.
- [ ] **TODO** Ověření e-mailové adresy po registraci.
- [ ] **TODO** Změna hesla z přihlášeného účtu.
- [ ] **DEPLOY** Otestovat recovery e-mail přes skutečné SMTP.

## 4. Uživatelský funnel a veřejné CTA

- [x] **MAIN** Globální CTA už nepředpokládá online coaching.
- [x] **MAIN** Neutrální rozcestník `/spoluprace/` nabízí Online coaching a Osobní trénink.
- [x] **MAIN** Konkrétní produktové CTA mohou jít přímo na checkout daného produktu.
- [x] **MAIN** Nefunkční `Zobrazit ceník` je odstraněné.
- [x] **MAIN** `Plán na míru / Průběžná podpora / Bez dojíždění` je pod online ceníkem.
- [x] **MAIN** Mobilní hlavní CTA jsou kompaktnější a nemají bezdůvodně zabírat celý viewport.
- [x] **MAIN** Veřejné texty a aplikační zdroj nepoužívají zakázaný em dash znak.
- [ ] **DEPLOY** Ověřit všechny CTA v reálném mobilním viewportu a na fyzickém telefonu.

## 5. Reference

- [x] **MAIN** Původní stav `Reference se sbírají` je nahrazený příběhovými kartami se jmény a bez fotek.
- [ ] **TODO** Až budou skutečné reference, nahradit současné ukázkové příběhy odsouhlasenými citacemi a případně fotkami.

## 6. Kontakt a zprávy

- [x] **MAIN** Kontaktní e-mail je `jana@janafitnessrada.cz`.
- [x] **MAIN** Telefon je `+420 774 641 541`.
- [x] **MAIN** `Napište Janě` zobrazuje Janin e-mail a telefon.
- [x] **MAIN** Backendová notifikace z kontaktního formuláře směřuje na Janin e-mail.
- [x] **MAIN** Nepřečtené zprávy klienta a Jany jsou oranžově zvýrazněné.
- [x] **MAIN** Systém pracuje se stavem přečtení.
- [ ] **DEPLOY** Ověřit skutečné doručování zpráv a kontaktního formuláře přes SMTP/outbox.

## 7. Online coaching

- [x] **MAIN** Účet, onboarding, produkt a čerpání jsou oddělené koncepty.
- [x] **MAIN** Free trial se nespouští registrací ani samotným odesláním dotazníku.
- [x] **MAIN** Uživatel musí explicitně zvolit 7 dní zdarma.
- [x] **MAIN** 7 dní začne až publikací plánu Janou.
- [x] **MAIN** Placený online balíček lze koupit před dotazníkem.
- [x] **MAIN** Placené období začne až publikací plánu, ne okamžikem platby.
- [x] **MAIN** Dashboard rozlišuje čekání na dotazník, čekání na plán, aktivní a ukončené období.
- [ ] **TODO** Připomínka klientovi před koncem období.
- [ ] **TODO** Recurring Stripe subscription není připravené. První verze zůstává jednorázová měsíční platba.

## 8. AI plán a workflow Jany

- [x] **MAIN** Plan Schema v2 je flexibilní a nevyžaduje katalog cviků.
- [x] **MAIN** AI rozhoduje o konkrétním tréninkovém obsahu. Schema určuje strukturu pro validaci a renderer.
- [x] **MAIN** Jana vidí dotazník klienta.
- [x] **MAIN** Jana může připravit a kopírovat AI prompt.
- [x] **MAIN** Jana může vložit nebo nahrát JSON plánu.
- [x] **MAIN** Server JSON validuje a vrací konkrétní cestu chyby.
- [x] **MAIN** Jana vidí náhled stejným rendererem jako klient.
- [x] **MAIN** Publikace plánu aktivuje příslušné období.
- [x] **MAIN** Zdravotní odpovědi mohou vynutit ruční kontrolu.
- [ ] **TODO** Otestovat více reálných AI plánů různých typů a edge cases.

## 9. Administrace

- [x] **MAIN** Admin je koncipovaný jako pracovní fronta Jany, ne pouze tabulka klientů.
- [x] **MAIN** Stavové karty pro čekání na dotazník, čekání na plán, nové zprávy, aktivní klienty, končící spolupráce a nové platby.
- [x] **MAIN** Oranžová je stav vyžadující pozornost, zelená značí hotovo nebo aktivní stav.
- [x] **MAIN** Detail klienta zobrazuje jméno, e-mail, telefon, věk, výšku, váhu, službu a stav.
- [x] **MAIN** Rychlé akce pro dotazník, JSON, Word a komunikaci.
- [x] **MAIN** Připravená konzistentní Lucide ikonografie a jemný fitness line-art pattern.
- [ ] **TODO** Dále sjednotit detail klienta do jasných záložek Přehled, Dotazníky, Plány, Platby, Zprávy a Historie.
- [ ] **TODO** Doplnit plnohodnotnou historii objednávek, check-inů a zpráv přímo do detailu klienta.
- [ ] **TODO** Dolaďit admin mobile layout po reálném buildu.

## 10. Payment page

Aktuální směr je samostatná platební podstránka, ne okamžitý Stripe API call z karty produktu.

- [x] **MAIN** Existuje samostatná `/app/platba/` podstránka.
- [x] **MAIN** Zobrazuje rekapitulaci balíčku a cenu.
- [x] **MAIN** Obsahuje volbu Stripe a QR platba.
- [x] **MAIN** QR je zatím placeholder.
- [x] **MAIN** Platby jsou v development režimu. Místo technického erroru uživatel vidí informaci, že web je ve vývoji a pro nákup má kontaktovat Janu.
- [x] **MAIN** Na payment page je Janin e-mail a telefon.
- [ ] **TODO NEXT** Udělat kompletní UX review payment page.
- [ ] **TODO NEXT** Doplnit finální fakturační údaje Jany, IČO a adresu.
- [ ] **TODO NEXT** Doplnit bankovní účet a skutečná data pro QR kód.
- [ ] **TODO NEXT** Nakonfigurovat Stripe secret a webhook secret mimo repozitář.
- [ ] **TODO NEXT** Otestovat payment success, cancel, webhook a idempotenci.
- [ ] **TODO NEXT** Teprve potom zapnout skutečné platby.

## 11. Osobní trenérství

Rozhodnutí pro první produkční verzi: osobní trénink zůstává záměrně jednoduchý a osobní. Web řeší výběr a nákup produktu, další domluvu řeší Jana přímo s klientem.

- [x] **ROZHODNUTO** Osobní trenérství je samostatná produktová větev.
- [x] **ROZHODNUTO** Osobní produkty mohou být jednorázová lekce, balíček 5 lekcí a balíček 10 lekcí.
- [x] **ROZHODNUTO** Nebudujeme nyní rezervační kalendář ani automatickou evidenci vyčerpaných lekcí.
- [x] **ROZHODNUTO** Nebudujeme nyní `sessions_total / sessions_used / sessions_remaining`.
- [x] **ROZHODNUTO** Po nákupu klient dostane potvrzení, že Jana se ozve a osobně domluví termín a další postup.
- [x] **ROZHODNUTO** Jana dostane po objednávce informaci o klientovi, produktu, kontaktu a platbě s odkazem do administrace.
- [x] **ROZHODNUTO** Administrace potřebuje pouze jednoduchý stav osobní objednávky, například `Nová` a `Vyřízená`.
- [ ] **TODO NEXT** Napojit osobní produktové CTA na jednotnou payment page.
- [ ] **TODO NEXT** Po úspěšné osobní platbě zobrazit správnou success stránku s informací, že Jana klienta kontaktuje.
- [ ] **TODO NEXT** Odeslat Janě notifikaci o nové osobní objednávce.
- [ ] **TODO NEXT** Zobrazit osobní objednávku v klientské zóně a administraci.
- [ ] **TODO** Rozhodnout, které údaje z obecného vstupního dotazníku mají být pro osobní trénink povinné před první lekcí. Nákup samotný tím není blokovaný.

## 12. E-mailový systém

- [x] **MAIN** Existuje `email_outbox` základ a worker.
- [x] **MAIN** Události jsou připravené pro dotazník, platbu, novou zprávu, publikaci plánu a password recovery.
- [ ] **TODO** Přepnout a ověřit ostré SMTP.
- [ ] **TODO** Nastavit cron na Active24.
- [ ] **TODO** Retry strategie a monitoring chyb.
- [ ] **TODO** Klientský potvrzovací e-mail po přijetí dotazníku.
- [ ] **TODO** E-mail před koncem plánu.
- [ ] **TODO** Registrace a e-mail verification flow.

## 13. Kvalita a build

- [x] **MAIN** Zdrojová kontrola PHP syntaxe prošla při importu.
- [x] **MAIN** TS/TSX source a import kontrola prošla na aktuálním kandidátu před importem.
- [x] **MAIN** UTF-8 kontrola a kontrola mojibake jsou součástí projektu.
- [x] **MAIN** Optimalizované veřejné WebP obrázky a favicon jsou v repozitáři.
- [x] **MAIN** V repozitáři nejsou produkční Stripe/OpenAI secrets z dosavadního secret scanu.
- [ ] **TODO** Spustit plný `npm install`, typecheck, lint a Next build z čistého checkoutu.
- [ ] **DEPLOY** Otestovat výsledný statický export na Active24.

## Nejbližší pořadí práce

1. Payment page UX pass a společný checkout pro online i osobní produkty.
2. Osobní nákup: success stav, notifikace Janě a jednoduché zobrazení objednávky.
3. Admin detail klienta a timeline.
4. SMTP a e-mailové notifikace.
5. Produkční build a Active24 deploy.
6. Po ověření produkce aktualizovat `DEPLOYED_VERSION`.