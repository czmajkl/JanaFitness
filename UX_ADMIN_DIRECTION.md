# JanaFitness - UX a admin směr

Aktualizováno: 2026-08-18

Tento dokument řeší dvě věci: uživatelskou cestu k výběru služby a vizuální směr administrace.

## Stav implementace

- [x] Implementováno v aktuálním migračním kandidátu: neutrální `/spoluprace/` rozcestník.
- [x] Implementováno v kandidátu: globální CTA `Začít` vede na rozcestník, ne přímo na online coaching.
- [x] Implementováno v kandidátu: admin hero s jemným fitness patternem.
- [x] Implementováno v kandidátu: stavové karty, fronta pozornosti, hledání klienta a oranžové priority.
- [x] Implementováno v kandidátu: profilový header klienta s telefonem, věkem, výškou, váhou, balíčkem, platností a poslední platbou.
- [x] Implementováno v kandidátu: rychlé akce Dotazník, JSON, Word a Napsat klientovi.
- [x] Implementováno v kandidátu: Lucide ikony a lokální fitness pattern v `public/design-assets/`.
- [x] Zdrojová validace kandidáta: PHP syntax, TS/TSX syntax a lokální importy, UTF-8 a JSON.
- [ ] Kompletní aplikační kód musí být stále jednorázově importován do GitHub `main`. Kořen repozitáře zatím není kompletní buildovatelný projekt.
- [ ] Po importu spustit skutečný Next build a vizuální kontrolu na desktopu i telefonu.

## 1. Hlavní CTA nesmí předpokládat online coaching

Problém:

Text typu `Vybrat balíček` nesmí uživatele automaticky posílat přímo na online coaching. Web nabízí dvě odlišné služby: online coaching a osobní trénink.

Oprava:

- hlavní CTA na veřejném webu je `Začít`
- CTA vede na neutrální rozcestník `/spoluprace/`
- rozcestník obsahuje dvě hlavní karty:
  - `Online coaching`
  - `Osobní trénink`
- až po výběru služby se zobrazí konkrétní produkty
- pokud je uživatel už v kontextu konkrétní služby, například na detailu online coachingu, konkrétní produktové CTA může jít přímo k danému produktu

### Doporučený flow

`Homepage -> Začít -> Online / Osobně -> konkrétní nabídka -> účet / nákup / onboarding`

### Online větev

`Online coaching -> 7 dní zdarma / měsíční balíček -> účet -> dotazník podle stavu -> plán`

Pokud uživatel již vyplnil dotazník, dotazník se znovu nevynucuje. Pokud již zaplatil, znovu se mu nenabízí nákup stejného kroku.

### Osobní větev

`Osobní trénink -> jednorázová lekce / balíček lekcí -> účet -> osobní onboarding -> termín / kontakt`

Osobní balíčky se nesmí míchat s online platností plánu. Čerpají počet lekcí.

## 2. Rozcestník spolupráce

### Online coaching

Ikona: dumbbell / heart pulse

Text:

`Tréninkový plán na míru, podpora a možnost začít 7 dní zdarma.`

CTA: `Chci online coaching`

### Osobní trénink

Ikona: user check / dumbbell / calendar

Text:

`Osobní vedení s Janou, technika, motivace a společný trénink.`

CTA: `Chci osobní trénink`

Na mobilu karty pod sebou. Na desktopu vedle sebe.

## 3. Admin nemá být jen tabulka

Cíl administrace:

Jana má během několika sekund poznat, co vyžaduje její pozornost.

### Horní přehled

Použít stavové karty:

- `Čeká na dotazník`
- `Čeká na plán`
- `Nové zprávy`
- `Aktivní klienti`
- `Končí do 7 dní`
- `Nové platby`

Každá karta má:

- jednoduchou ikonu
- velké číslo
- krátký popis
- jasnou barvu stavu

### Fronta pozornosti

Pod statistikami je prioritní fronta klientů. Řazení zvýhodňuje:

1. nepřečtené zprávy
2. klienty čekající na plán
3. zaplacené klienty čekající na dotazník
4. aktivní spolupráce končící do 7 dní
5. nové platby

### Barvy stavů

- zelená: hotovo / aktivní / dotazník vyplněn
- oranžová: vyžaduje pozornost / nová zpráva / čekající akce
- modrá: informační / připravuje se
- červená pouze pro problém, selhání nebo kritickou expiraci
- neutrální šedá pro archiv a neaktivní věci

## 4. Detail klienta

Detail klienta má nahoře kompaktní profilový header:

- jméno
- e-mail
- telefon
- věk
- výška
- váha
- aktivní služba
- stav spolupráce
- začátek a konec balíčku
- poslední platba

Rychlé akce:

- `Dotazník`
- `JSON`
- `Word`
- `Napsat klientovi`

Navazující sekce zachovávají workflow:

- dotazník a historie verzí
- AI prompt
- import a validace JSONu
- náhled plánu
- publikace

## 5. Vizuální fitness motiv

Administrace zůstává pracovní nástroj. Fitness motiv je jemný, ne dominantní.

Použito:

- line art ikony
- slabý pattern činek, pulsu a pohybu v hero části
- nízká opacity
- pattern není pod formuláři ani dlouhými datovými bloky
- žádná velká stock fotografie za textem

## 6. Ikonografie

Používá se jedna konzistentní rodina ikon: Lucide.

Mapování:

- klient: `user-round-check`
- trénink: `dumbbell`
- zdravotní stav / kondice: `heart-pulse`
- dotazník: `clipboard-check`
- zprávy: `message-circle`
- platby: `credit-card`
- termíny: `calendar-days`

Zdrojové SVG a licence jsou uložené v `design-assets/`. Pro runtime kandidát obsahuje stejné assety v `public/design-assets/`.

## 7. Mobile admin

Na telefonu:

- stavové karty se skládají do dvou sloupců
- hlavní CTA jsou kompaktní
- seznam klientů funguje jako karty
- vyhledávání klienta je nad seznamem
- detail klienta prioritizuje stav, zprávy a rychlé akce
- dlouhé workflow části zůstávají vertikální a čitelné

## 8. Další pořadí

1. Jednorázově dostat celý aktuální kandidát do GitHub `main`
2. Spustit skutečný Next build
3. Udělat mobilní a desktop vizuální QA rozcestníku a adminu
4. Payment page UX pass
5. Osobní trénink lifecycle a čerpání lekcí
6. Až potom dolaďovat animace a dekorace
