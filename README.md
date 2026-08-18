# JanaFitness

Jediný zdroj pravdy pro web Jana Fitness.

## Stav projektu

Aktuální přehled hotových, rozpracovaných a chybějících částí je v [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

Aktuální návrh uživatelského funnelu a vizuálního směru administrace je v [`UX_ADMIN_DIRECTION.md`](UX_ADMIN_DIRECTION.md).

> Aktuálně repozitář ještě neobsahuje kompletní aplikační zdrojový kód. Poslední pracovní verze musí být jednorázově importována do `main`. Do té doby jsou starší ZIPy z konverzace pouze historické handoffy.

## Pravidlo verzování

- `main` = aktuální schválený stav zdrojového kódu.
- Každá změna se nejdřív commitne sem.
- Deploy ZIP se vždy vytváří z konkrétního commitu v `main`.
- Na Active24 se nikdy nenasazuje ručně upravená lokální kopie mimo GitHub.
- Každý deploy musí mít zapsaný commit SHA, ze kterého vznikl.

## Produkční stack

- Next.js / React / TypeScript / Tailwind frontend
- statický export pro Active24
- PHP JSON API
- MySQL / MariaDB
- Stripe pro platby
- OpenAI pro přípravu strukturovaných plánů
- SMTP / email outbox pro notifikace

## Doporučený deploy postup

1. Zkontrolovat změny v `main`.
2. Spustit build a validační kontroly.
3. Vytvořit deploy ZIP z daného commitu.
4. Pojmenovat ho například `janafitness-<short-sha>.zip`.
5. Nahrát ZIP na Active24.
6. Rozbalit ho do cílového adresáře.
7. Aplikovat případné databázové migrace.
8. Ověřit produkci.
9. Zapsat nasazený SHA do `DEPLOYED_VERSION`.

## Důležité

Tento repozitář má být jediná verze, ze které se dál vyvíjí a nasazuje. Starší ZIPy z chatu jsou pouze historické handoffy a nemají být použity jako další vývojová větev.
