# JanaFitness - UX a admin směr

Aktualizováno: 2026-08-18

Tento dokument řeší dvě věci: uživatelskou cestu k výběru služby a vizuální směr administrace.

## 1. Hlavní CTA nesmí předpokládat online coaching

Problém:

Aktuální text typu `Vybrat balíček` posílá uživatele přímo na online coaching. To je špatně, protože web nabízí dvě odlišné služby: online coaching a osobní trénink.

Navržená oprava:

- hlavní CTA na veřejném webu změnit na `Začít` nebo `Vybrat způsob spolupráce`
- CTA vede na neutrální rozcestník `/spoluprace/`
- rozcestník obsahuje dvě hlavní karty:
  - `Online coaching`
  - `Osobní trénink`
- až po výběru služby se zobrazí konkrétní produkty

### Doporučený flow

`Homepage -> Vybrat způsob spolupráce -> Online / Osobně -> konkrétní nabídka -> účet / nákup / onboarding`

### Online větev

`Online coaching -> 7 dní zdarma / měsíční balíček -> účet -> dotazník podle stavu -> plán`

Pokud uživatel již vyplnil dotazník, dotazník se znovu nevynucuje. Pokud již zaplatil, znovu se mu nenabízí nákup stejného kroku.

### Osobní větev

`Osobní trénink -> jednorázová lekce / balíček lekcí -> účet -> osobní onboarding -> termín / kontakt`

Osobní balíčky se nesmí míchat s online platností plánu. Čerpají počet lekcí.

## 2. Rozcestník spolupráce

Doporučený vizuální návrh:

### Online coaching

Ikona: notebook / dumbbell / heart pulse

Text:

`Tréninkový plán na míru, podpora a možnost začít 7 dní zdarma.`

CTA: `Chci cvičit online`

### Osobní trénink

Ikona: user check / dumbbell / calendar

Text:

`Osobní vedení s Janou, technika, motivace a společný trénink.`

CTA: `Chci cvičit osobně`

Na mobilu karty pod sebou. Na desktopu vedle sebe.

## 3. Admin nemá být jen tabulka

Cíl administrace:

Jana má během několika sekund poznat, co vyžaduje její pozornost.

### Horní přehled

Použít 4 až 6 stavových karet:

- `Čeká na dotazník`
- `Čeká na plán`
- `Nové zprávy`
- `Aktivní klienti`
- `Končí brzy`
- `Nové objednávky`

Každá karta má:

- jednoduchou ikonu
- velké číslo
- krátký popis
- jasnou barvu stavu
- klik na filtrovaný seznam

### Barvy stavů

- zelená: hotovo / aktivní / dotazník vyplněn
- oranžová: vyžaduje pozornost / nová zpráva / čekající akce
- modrá: informační / připravuje se
- červená pouze pro problém, selhání nebo kritickou expiraci
- neutrální šedá pro archiv a neaktivní věci

## 4. Detail klienta

Detail klienta má mít nahoře kompaktní profilový header:

- jméno
- e-mail
- telefon
- věk
- výška
- váha
- aktivní služba
- stav spolupráce

Pod tím rychlé akce:

- `Zobrazit dotazník`
- `Stáhnout JSON`
- `Stáhnout Word`
- `Připravit AI prompt`
- `Nahrát plán`
- `Napsat klientovi`

Další obsah rozdělit do záložek nebo sekcí:

1. Přehled
2. Dotazníky
3. Plány
4. Platby
5. Zprávy
6. Historie

## 5. Vizuální fitness motiv

Administrace má zůstat pracovní nástroj. Fitness motiv má být jemný, ne dominantní.

Doporučení:

- line art ikony
- velmi slabý pattern činek, pulsu a pohybu v prázdných plochách
- opacity přibližně 3 až 7 procent
- pattern použít jen v hero/header plochách, ne pod tabulkami a formuláři
- žádné velké stock fotografie za textem

## 6. Ikonografie

Použít jednu konzistentní rodinu ikon. Vybraný směr: Lucide.

Mapování:

- klient: `user-round-check`
- trénink: `dumbbell`
- zdravotní stav / kondice: `heart-pulse`
- dotazník: `clipboard-check`
- zprávy: `message-circle`
- platby: `credit-card`
- termíny: `calendar-days`

SVG zdroje jsou uložené v `design-assets/icons/`.

## 7. Mobile admin

Na telefonu:

- horní stavové karty scrollují horizontálně nebo se skládají po dvou
- hlavní CTA nesmí zabrat celý viewport
- tabulky převést na karty nebo umožnit horizontální scroll pouze tam, kde je nutný
- sticky spodní akce jen pro jednu hlavní činnost
- detail klienta musí prioritizovat stav, zprávy a rychlé akce

## 8. Implementační pořadí

1. Neutrální rozcestník `/spoluprace/`
2. Změnit globální CTA z přímého online odkazu na rozcestník
3. Admin dashboard se stavovými kartami
4. Detail klienta s rychlými akcemi a záložkami
5. Nasadit ikony a jemný fitness pattern
6. Mobilní pass
7. Až potom dolaďovat animace a dekorace

## Poznámka k repozitáři

Samotná aplikace zatím stále není kompletně importovaná do GitHub `main`. Tento dokument je implementační specifikace. Po prvním importu se změny mají dělat přímo proti zdrojovému kódu v repozitáři.
