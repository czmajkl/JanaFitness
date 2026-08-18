# JanaFitness

Jediný zdroj pravdy pro web Jana Fitness.

## Stav projektu

Aktuální přehled hotových, rozpracovaných a chybějících částí je v [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

Aktuální návrh uživatelského funnelu a vizuálního směru administrace je v [`UX_ADMIN_DIRECTION.md`](UX_ADMIN_DIRECTION.md).

Kompletní aplikační zdrojový kód je nyní v `main`. Další vývoj se dělá přímo proti tomuto repozitáři. Starší ZIPy z konverzace jsou pouze historické handoffy a nesmí se používat jako vývojová větev.

## Pravidlo verzování

- `main` = aktuální schválený stav zdrojového kódu.
- Každá další změna se nejdřív provede a commitne sem.
- Deploy ZIP se vytváří z konkrétního commitu v `main`.
- Na Active24 se nikdy nenasazuje ručně upravená kopie mimo GitHub.
- Každý deploy musí mít zapsaný commit SHA, ze kterého vznikl.
- `DEPLOYED_VERSION` se aktualizuje až po skutečném ověření nasazení na Active24.

## Produkční stack

- Next.js / React / TypeScript / Tailwind frontend
- statický export pro Active24
- PHP JSON API
- MySQL / MariaDB
- Stripe pro platby
- OpenAI pro přípravu strukturovaných plánů
- e-mail outbox + SMTP pro notifikace

## Hlavní adresáře

- `src/` - frontend aplikace
- `php-api/` - PHP backend API
- `database/` - schéma, seed a migrace
- `public/` - veřejné assety a optimalizované obrázky
- `scripts/` - validační a deploy pomocné skripty
- `docs/` - technická dokumentace schémat a workflow
- `design-assets/` - zdrojové designové assety a licence

## Doporučený deploy postup

1. Zkontrolovat změny v `main`.
2. Spustit build a validační kontroly.
3. Vytvořit deploy ZIP z konkrétního commit SHA.
4. Pojmenovat ho `janafitness-<short-sha>.zip`.
5. Nahrát ZIP na Active24.
6. Rozbalit ho do cílového adresáře.
7. Aplikovat nové databázové migrace.
8. Ověřit produkci včetně přihlášení, dotazníku, kontaktu a checkout flow.
9. Zapsat nasazený SHA do `DEPLOYED_VERSION`.

## Aktuální produkce

`DEPLOYED_VERSION` je zatím `not-deployed-yet`. To znamená, že GitHub je nyní autoritativní zdroj, ale současný commit ještě není potvrzený jako nasazený na Active24.
