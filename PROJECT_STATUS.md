# JanaFitness - aktuální stav projektu

Aktualizováno: 2026-08-17

Tento dokument je kontrolní seznam projektu. Rozlišuje skutečný stav GitHubu, poslední ověřený migrační kandidát a věci, které ještě nejsou hotové.

## Legenda

- **MAIN**: je skutečně v `czmajkl/JanaFitness` na větvi `main`.
- **CANDIDATE**: je implementováno a zdrojově ověřeno v posledním lokálním migračním kandidátu, ale ještě není importováno do GitHub `main`.
- **TODO**: chybí nebo vyžaduje další práci.
- **DEPLOY**: týká se nasazení na Active24.

## Kritický stav repozitáře

- [x] **MAIN** Repo `czmajkl/JanaFitness` existuje a je zapisovatelné.
- [x] **MAIN** `README.md`, `PROJECT_STATUS.md` a `DEPLOYED_VERSION` existují.
- [ ] **TODO P0** Kompletní aplikační zdrojový kód stále není v `main`.
- [ ] **TODO P0** Jednorázově importovat aktuální migrační kandidát včetně binárních obrázků a assetů.
- [ ] **DEPLOY** `DEPLOYED_VERSION` je stále `not-deployed-yet`.
- [ ] **TODO** Po importu už nepokračovat z žádného staršího ZIPu. `main` bude jediný zdroj pravdy.

Dokud není P0 hotové, žádná funkce označená jako CANDIDATE není oficiálně součástí GitHub `main` ani potvrzené produkce.

## 1. Vstupní dotazník

Zdrojová šablona je dodaný dokument `Onboardový formulář klienta`. Obsah musí zachovat jeho věcnou strukturu a může zlepšit pouze UX, podmíněnost a prezentaci.

- [x] **CANDIDATE** Dotazník má 9 sekcí: osobní údaje, zdravotní anamnéza, cíle a motivace, zdatnost a historie, čas a dny, vybavení, strava a doplňky, doplňující informace, souhlasy.
- [x] **CANDIDATE** Obsahuje věk, výšku a váhu.
- [x] **CANDIDATE** Zachovává zdravotní otázky, sportovní historii, tělesné parametry, dostupnost, vybavení, stravovací návyky a souhlasy z dodané šablony.
- [x] **CANDIDATE** Předěláno na interaktivní průvodce po 9 krocích místo jednoho dlouhého formuláře.
- [x] **CANDIDATE** Progress indikátor, navigace mezi sekcemi a validace povinných odpovědí po kroku.
- [x] **CANDIDATE** Mobilní zobrazení dostupnosti den x část dne je responzivní.
- [x] **CANDIDATE** Single choice, boolean a multi choice odpovědi mají přehlednější card/pill UI.
- [x] **CANDIDATE** Odeslaný dotazník je neměnný snapshot.
- [x] **CANDIDATE** Hotový dotazník je v klientské zóně zelený.
- [x] **CANDIDATE** Hotový dotazník lze zobrazit, ne přímo přepsat.
- [x] **CANDIDATE** CTA `Vyplnit znovu` vytvoří novou verzi a stará zůstane uložená.
- [x] **CANDIDATE** Administrace umí načíst historii verzí dotazníku.
- [x] **CANDIDATE** Jana může v administraci přepínat mezi verzemi.
- [x] **CANDIDATE** Přidané CTA `Stáhnout dotazník JSON`.
- [x] **CANDIDATE** Přidané CTA `Stáhnout dotazník Word` jako Word-kompatibilní `.doc` export s UTF-8.
- [ ] **TODO** Pokud má být export skutečný `.docx` soubor podle přesného vizuálu původní šablony, doplnit serverový generátor DOCX. Současný export je Word-kompatibilní `.doc`, nikoli nativní `.docx`.
- [ ] **TODO** Dotáhnout modulární dotazník `common + online + personal`, aby uživatel při změně služby neopakoval známé údaje.

## 2. Stav po odeslání dotazníku

- [x] **CANDIDATE** Samotné odeslání dotazníku automaticky nezakládá free trial.
- [x] **CANDIDATE** Po odeslání následuje motivační success stav, ne mrtvý návrat na dashboard.
- [x] **CANDIDATE** Uživatel bez produktu dostane volbu Online coaching / Osobní trénink.
- [x] **CANDIDATE** Online větev nabízí 7 dní zdarma nebo placený měsíční balíček.
- [x] **CANDIDATE** Pokud uživatel už zaplatil, success stav ho znovu nenutí nakupovat a sdělí, že Jana má podklady pro přípravu plánu.
- [ ] **TODO** Finální vizuální kontrola success flow po skutečném Next buildu.

## 3. Autentizace a účet

- [x] **CANDIDATE** Registrace a přihlášení.
- [x] **CANDIDATE** Minimální délka hesla je 5 znaků ve frontendu i PHP validaci.
- [x] **CANDIDATE** `Zapomenuté heslo` a password recovery jsou přítomné.
- [x] **CANDIDATE** Reset používá jednorázový token s omezenou platností.
- [x] **CANDIDATE** V klientské zóně je logo odkazující na hlavní web a vedle něj text `Uživatelský účet`.
- [x] **CANDIDATE** Mobilní navigace účtu je kompaktnější.
- [ ] **TODO** Ověření e-mailu po registraci.
- [ ] **TODO** Změna hesla z přihlášeného účtu.
- [ ] **TODO** Otestovat recovery e-mail na skutečném SMTP.

## 4. Veřejný web a CTA

- [x] **CANDIDATE** Nefunkční `Zobrazit ceník` je odstraněné.
- [x] **CANDIDATE** `Plán na míru / Průběžná podpora / Bez dojíždění` je až pod online ceníkem.
- [x] **CANDIDATE** Header CTA `Vybrat balíček` vede na `/online-coaching/#cenik`.
- [x] **CANDIDATE** CTA na kartách balíčků vedou na platební podstránku s vybraným balíčkem.
- [x] **CANDIDATE** Hlavní mobilní CTA byla zmenšena a nemají zbytečně zabírat celý viewport.
- [x] **CANDIDATE** Kontaktní formulář má kompaktnější mobilní submit tlačítko.
- [x] **CANDIDATE** Zdrojový sweep odstranil znak em dash z aplikačního kódu a veřejných textů. Interní `AGENTS.md` se tímto pravidlem neřídí.
- [ ] **TODO** Po build/importu zkontrolovat všechny CTA v reálném mobilním viewportu a na fyzickém telefonu.

## 5. Reference a příběhy

- [x] **CANDIDATE** Text `Reference se sbírají` byl nahrazen příběhovými kartami se jmény bez fotek.
- [x] **CANDIDATE** Použité příběhy jsou transparentně označené jako ukázkové příběhy, ne jako tvrzené skutečné klientské reference.
- [ ] **TODO** Až budou skutečné reference, nahradit ukázkové příběhy odsouhlasenými citacemi a případně fotkami.

## 6. Kontakt a zprávy

- [x] **CANDIDATE** Kontaktní e-mail je `jana@janafitnessrada.cz`.
- [x] **CANDIDATE** Telefon je `+420 774 641 541`.
- [x] **CANDIDATE** `Napište Janě` zobrazuje kontakt a backendová notifikace směřuje na Janin e-mail.
- [x] **CANDIDATE** Nepřečtené zprávy klienta/Jany jsou oranžově zvýrazněné.
- [x] **CANDIDATE** Po otevření se pracuje se stavem přečtení.
- [ ] **TODO** Ověřit na produkci skutečné doručení kontaktního formuláře a zpráv přes SMTP/outbox.

## 7. Online coaching

- [x] **CANDIDATE** Účet, onboarding, produkt a čerpání jsou oddělené koncepty.
- [x] **CANDIDATE** Free trial se nespouští registrací ani samotným odesláním dotazníku.
- [x] **CANDIDATE** Uživatel musí explicitně zvolit 7 dní zdarma.
- [x] **CANDIDATE** 7 dní začne až publikací plánu Janou.
- [x] **CANDIDATE** Placený balíček lze koupit před dotazníkem.
- [x] **CANDIDATE** Placené období začne až publikací plánu, ne platbou.
- [x] **CANDIDATE** Dashboard rozlišuje čekání na dotazník, čekání na plán, aktivní a ukončené období.
- [ ] **TODO** Připomínka klientovi před koncem období.
- [ ] **TODO** Recurring Stripe subscription není připravené. První verze zůstává jednorázová měsíční platba.

## 8. AI plán a administrace Jany

- [x] **CANDIDATE** Plan Schema v2 je flexibilní a nevyžaduje katalog cviků.
- [x] **CANDIDATE** AI rozhoduje o konkrétním tréninkovém obsahu. Schema určuje strukturu pro validaci a renderer.
- [x] **CANDIDATE** Jana vidí dotazník klienta.
- [x] **CANDIDATE** Jana může připravit/kopírovat AI prompt.
- [x] **CANDIDATE** Jana může vložit nebo nahrát JSON plánu.
- [x] **CANDIDATE** Server JSON validuje a vrací konkrétní cestu chyby.
- [x] **CANDIDATE** Jana vidí náhled stejným rendererem jako klient.
- [x] **CANDIDATE** Publikace plánu aktivuje příslušné období.
- [x] **CANDIDATE** Zdravotní odpovědi mohou vynutit ruční kontrolu.
- [ ] **TODO** Otestovat několik reálných AI plánů různých typů před produkcí.

## 9. Payment page

Aktuální směr je samostatná platební podstránka, nikoli okamžitý Stripe API call z tlačítka balíčku.

- [x] **CANDIDATE** Existuje samostatná `/app/platba/` podstránka.
- [x] **CANDIDATE** Zobrazuje rekapitulaci balíčku a cenu.
- [x] **CANDIDATE** Obsahuje volbu Stripe a QR platba.
- [x] **CANDIDATE** QR je zatím placeholder.
- [x] **CANDIDATE** Platby jsou v development režimu a stránka místo technického erroru vysvětluje, že web je ve vývoji a pro nákup má uživatel kontaktovat Janu.
- [x] **CANDIDATE** Na payment page je Janin e-mail a telefon.
- [ ] **TODO NEXT** Udělat kompletní UX review payment page.
- [ ] **TODO NEXT** Doplnit finální fakturační údaje Jany, IČO a adresu.
- [ ] **TODO NEXT** Doplnit bankovní účet a skutečná data pro QR kód.
- [ ] **TODO NEXT** Nakonfigurovat Stripe secret + webhook secret mimo repozitář.
- [ ] **TODO NEXT** Otestovat payment success, cancel, webhook a idempotenci.
- [ ] **TODO NEXT** Teprve potom zapnout skutečné platby.

## 10. Osobní trenérství

- [x] **ROZHODNUTO** Osobní trenérství je samostatná produktová větev.
- [x] **ROZHODNUTO** Má evidovat počet lekcí, ne kopírovat online period lifecycle.
- [ ] **TODO** Datový model `sessions_total / sessions_used / sessions_remaining`.
- [ ] **TODO** Nákup osobního balíčku.
- [ ] **TODO** Rezervace/termíny a evidence čerpání.
- [ ] **TODO** Samostatná personal část dotazníku navázaná na common profil.

## 11. E-mailový systém

- [x] **CANDIDATE** Existuje `email_outbox` základ a worker.
- [x] **CANDIDATE** Události jsou připravené pro dotazník, platbu, novou zprávu, publikaci plánu a password recovery.
- [ ] **TODO** Přepnout/ověřit ostré SMTP.
- [ ] **TODO** Nastavit cron na Active24.
- [ ] **TODO** Retry strategie a monitoring chyb.
- [ ] **TODO** E-mail před koncem plánu.

## 12. Kvalita, UTF-8 a build

- [x] **CANDIDATE** PHP syntaxe po posledním review prochází.
- [x] **CANDIDATE** 51 TS/TSX souborů prošlo lokální syntax/import kontrolou.
- [x] **CANDIDATE** UTF-8 kontrola prošla na 104 souborech.
- [x] **CANDIDATE** V aplikačních textech nebyly po review nalezené staré BagiraSys kontakty ani mojibake vzory.
- [ ] **TODO P1** Full `npm install` a `next build` nebyly v tomto prostředí ověřené.
- [ ] **TODO P1** Po importu do GitHubu přidat GitHub Actions: install, typecheck, lint, source validation, Next build.
- [ ] **TODO P1** Build artifact musí být navázaný na konkrétní commit SHA.

## 13. Pořadí dalších kroků

### P0 - jediný zdroj pravdy

1. Importovat aktuální migrační kandidát do `JanaFitness/main`, včetně assetů.
2. Porovnat počet souborů a zkontrolovat, že nic chybí.
3. Od tohoto okamžiku už neupravovat staré ZIPy.

### P1 - automatická kontrola a build

1. GitHub Actions pro validaci a Next build.
2. Build ZIP pojmenovaný podle krátkého SHA.
3. Žádný deploy z necommitnuté lokální kopie.

### P2 - nasazení

1. Nahrát ZIP z konkrétního SHA na Active24.
2. Rozbalit frontend + PHP API.
3. Aplikovat odpovídající DB migrace.
4. Smoke test: registrace, login, recovery, dotazník, admin, zprávy, checkout page, kontakt.
5. Zapsat skutečný SHA do `DEPLOYED_VERSION`.

### P3 - payment page

Po stabilizaci P0 až P2 dokončit platební stránku, QR, Stripe konfiguraci a payment lifecycle.

## Definice hotovo

Funkce je `hotová` až když:

1. je v `JanaFitness/main`,
2. prošla automatickými kontrolami,
3. je součástí buildu z konkrétního SHA,
4. pokud má být v produkci, je tento SHA skutečně nasazený,
5. `DEPLOYED_VERSION` odpovídá nasazenému SHA.

Do té doby používáme označení CANDIDATE nebo TODO. Tím se vyhneme situaci, kdy je něco opravené v jednom ZIPu, ale nikoli na webu.
