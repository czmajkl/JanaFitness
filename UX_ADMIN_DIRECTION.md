# JanaFitness - UX a admin směr

Aktualizováno: 2026-08-18

Tento dokument popisuje uživatelskou cestu k výběru služby a vizuální směr administrace. Kompletní aplikační zdroj je nyní v GitHub `main` a další úpravy se dělají přímo tam.

## 1. Hlavní CTA nesmí předpokládat online coaching

Globální CTA typu `Vybrat balíček` nesmí posílat uživatele automaticky na online coaching, protože web nabízí dvě rozdílné služby.

Implementovaný směr:

- globální CTA používá neutrální význam typu `Začít` nebo `Vybrat spolupráci`
- vede na `/spoluprace/`
- rozcestník obsahuje `Online coaching` a `Osobní trénink`
- konkrétní produktové CTA může jít přímo na checkout konkrétního produktu

Doporučený flow:

`Homepage -> Začít -> Online / Osobně -> konkrétní nabídka -> účet / nákup / onboarding`

### Online větev

`Online coaching -> 7 dní zdarma / měsíční balíček -> účet -> dotazník podle stavu -> plán`

Pokud uživatel už dotazník vyplnil, znovu se nevynucuje. Pokud už zaplatil, znovu se mu nenabízí stejný nákupní krok.

### Osobní větev

`Osobní trénink -> jednorázová lekce / balíček lekcí -> účet -> osobní onboarding -> termín / kontakt`

Osobní balíčky čerpají počet lekcí a nesmí se míchat s online platností plánu.

## 2. Rozcestník spolupráce

Implementovaný základ `/spoluprace/` používá dvě jasné produktové karty.

### Online coaching

Textový směr:

`Tréninkový plán na míru, podpora a možnost začít 7 dní zdarma.`

CTA: `Chci cvičit online`

### Osobní trénink

Textový směr:

`Osobní vedení s Janou, technika, motivace a společný trénink.`

CTA: `Chci cvičit osobně`

Na mobilu jsou karty pod sebou, na desktopu vedle sebe.

## 3. Admin jako pracovní inbox

Cíl administrace je, aby Jana během několika sekund poznala, co vyžaduje její pozornost.

Implementovaný směr horního přehledu:

- `Čeká na dotazník`
- `Čeká na plán`
- `Nové zprávy`
- `Aktivní klienti`
- `Končí brzy`
- `Nové objednávky / platby`

Každá karta má jednoduchou ikonu, velké číslo, krátký popis a stavovou barvu.

### Barvy stavů

- zelená: hotovo, aktivní, dotazník vyplněn
- oranžová: vyžaduje pozornost, nová zpráva, čekající akce
- modrá: informační nebo připravuje se
- červená: problém, selhání nebo kritická expirace
- neutrální šedá: archiv a neaktivní věci

Admin obsahuje také frontu pozornosti pro klienty, u kterých Jana musí udělat další krok.

## 4. Detail klienta

Profilový header má prioritně zobrazovat:

- jméno
- e-mail
- telefon
- věk
- výšku
- váhu
- aktivní službu
- stav spolupráce
- začátek a konec aktivního období

Rychlé akce:

- `Zobrazit dotazník`
- `Stáhnout JSON`
- `Stáhnout Word`
- `Připravit AI prompt`
- `Nahrát plán`
- `Napsat klientovi`

Další krok je sjednotit detail do záložek:

1. Přehled
2. Dotazníky
3. Plány
4. Platby
5. Zprávy
6. Historie

## 5. Vizuální fitness motiv

Administrace zůstává pracovní nástroj. Fitness motiv je jemný a podpůrný.

Použitý směr:

- line-art ikony
- slabý pattern činek, pulsu a pohybu v hero/header plochách
- velmi nízká opacity
- žádné výrazné stock fotografie za tabulkami a formuláři

Runtime pattern je uložený i ve veřejných assetech, zdrojové designové podklady jsou v `design-assets/`.

## 6. Ikonografie

Používáme jednu konzistentní rodinu ikon: Lucide.

Mapování:

- klient: `user-round-check`
- trénink: `dumbbell`
- zdravotní stav / kondice: `heart-pulse`
- dotazník: `clipboard-check`
- zprávy: `message-circle`
- platby: `credit-card`
- termíny: `calendar-days`

SVG zdroje jsou v `design-assets/icons/` a licence v `design-assets/LUCIDE_LICENSE.txt`.

## 7. Mobile admin

Pravidla:

- stavové karty se skládají kompaktně a nesmí zabrat celý viewport
- tabulky se podle možnosti převádějí na karty
- horizontální scroll pouze tam, kde je skutečně nutný
- hlavní CTA mají rozumnou šířku podle obsahu
- detail klienta prioritizuje stav, nové zprávy a rychlé akce

Finální mobilní pass ještě vyžaduje kontrolu skutečného buildu na telefonu.

## 8. Další implementační pořadí

1. Payment page UX pass
2. Detail klienta se záložkami a timeline
3. Plnohodnotná historie plateb, check-inů a zpráv
4. Mobile admin pass
5. Až potom dekorativní animace a další vizuální detaily

## Stav repozitáře

Kompletní aplikační zdrojový kód je importovaný do `main`. Od tohoto bodu se nové změny nedělají v historických ZIPech ani oddělených lokálních kandidátech. GitHub `main` je jediný zdroj pravdy. Nasazení na Active24 se eviduje zvlášť přes `DEPLOYED_VERSION`.
