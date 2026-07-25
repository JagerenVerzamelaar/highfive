# High Five — Tools

Een groeiende verzameling kleine, snelle, mobile-first webtools voor het
High Five Initiative. Alleen HTML, CSS en vanilla JavaScript. Geen frameworks,
geen build-stap, direct te publiceren via GitHub Pages.

*"What would Geoffrey Bawa design in 2030."*

## Structuur

```
/
├── index.html               # Homepage met tool-kaarten
├── README.md
├── assets/
│   ├── style.css            # Gedeeld design system (tokens, cards, forms, …)
│   ├── script.js            # Toolregister (HF.TOOLS) + gedeelde hulpfuncties
│   ├── logo.svg
│   └── favicon.svg
└── tools/
    ├── land-price/
    │   └── index.html       # Landprijs omrekenaar
    └── plot-planner/
        └── index.html       # Placeholder — vervang door je bestaande planner
```

## Een nieuwe tool toevoegen

1. Maak een map `tools/<naam>/` met daarin één `index.html`.
2. Link in die pagina naar de gedeelde bestanden:
   ```html
   <link rel="stylesheet" href="../../assets/style.css">
   <script src="../../assets/script.js"></script>
   ```
3. Voeg één object toe aan `HF.TOOLS` in `assets/script.js`:
   ```js
   {
     id: 'roi',
     pill: 'ROI',
     titel: 'ROI Calculator',
     beschrijving: 'Rendement per geïnvesteerde euro.',
     href: 'tools/roi/',
     orb:  ['#ffd9c6', '#d8ecea'],   // kleuren van de gradientbol
     wash: ['#fdf6f1', '#f2f8f7'],   // achtergrondwas van het kaartvlak
   }
   ```
   De kaart op de homepage verschijnt automatisch.

## Gedeelde hulpfuncties (window.HF)

| Functie | Doel |
|---|---|
| `HF.parseNumber(str)` | Parseert NL- én EN-notatie (`1.234,56` / `1,234.56`) |
| `HF.formatNumber(n, digits)` | Getal in nl-NL-notatie |
| `HF.formatInput(n, digits)` | Voor invoervelden (zonder duizendtal-groepering) |
| `HF.formatEUR(n, digits)` | Eurobedrag, `—` bij ongeldige waarde |
| `HF.renderTools(id)` | Rendert de kaarten op de homepage |
| `HF.setYear(id)` | Vult het jaartal in de footer |

## Publiceren op GitHub Pages

1. Push deze repository naar GitHub.
2. Ga naar **Settings → Pages**.
3. Kies **Deploy from a branch**, branch `main`, map `/ (root)`.
4. Klaar — alle paden zijn relatief, dus de site werkt ook onder
   `https://<gebruiker>.github.io/<repo>/`.

## Ontwerpprincipes

- **Mobile-first**: ontworpen voor telefoons, schaalt mee naar desktop.
- **Orb als signatuur**: elke tool krijgt een eigen blush-gradientbol met
  pill-label; kleuren staan per tool in `HF.TOOLS`.
- **Tokens in `:root`**: kleuren, spacing, radius en schaduwen op één plek.
- **Toegankelijk**: labels, `aria-live` voor resultaten, zichtbare focus,
  `prefers-reduced-motion` gerespecteerd.
- **Geen dark mode** (bewuste keuze): het blush-palet is de identiteit.
  Eenvoudig later toe te voegen via extra tokens in `style.css`.

## Notities

- Wisselkoersen in de landprijs-omrekenaar komen van de open
  `@fawazahmed0/currency-api` (jsDelivr) met ingebouwde fallbackkoersen,
  zodat de tool ook offline werkt.
- 1 Sri Lankaanse perch = 25,29285 m².
