/* ==========================================================================
   High Five — gedeeld JavaScript (v2)
   - HF.TOOLS: het register. Nieuwe tool toevoegen = één object toevoegen.
   - HF.renderTools(): bouwt de kleurblok-kaarten op de homepage.
   - HF.parseNumber / HF.formatEUR / …: hulpfuncties voor alle tools.
   ========================================================================== */

window.HF = (() => {
  const locale = 'nl-NL';

  /* ---- Toolregister ------------------------------------------------------
     Nieuwe tool? Voeg hier één object toe en maak /tools/<id>/index.html.
     bg / fg          → kleurblok van de kaart (achtergrond / tekst)
     pillBg / pillFg  → kleuren van de sticker-pill
  ------------------------------------------------------------------------- */
  const TOOLS = [
    {
      id: 'land-price',
      pill: 'Land Price',
      titel: 'Landprijs omrekenaar',
      beschrijving: 'LKR, USD en EUR per perch, acre, hectare en m².',
      href: 'tools/land-price/',
      bg: 'var(--lime)',      fg: 'var(--green)',
      pillBg: 'var(--green)', pillFg: 'var(--lime)',
    },
    {
      id: 'plot-planner',
      pill: 'Plot Planner',
      titel: 'Surface Plot Planner',
      beschrijving: 'Cabins, privacycirkels en clash-detectie op je kavel.',
      href: 'tools/plot-planner/',
      bg: 'var(--vermilion)', fg: 'var(--lilac)',
      pillBg: 'var(--lilac)', pillFg: 'var(--vermilion)',
    },
    {
      id: 'kavels',
      pill: 'Notion',
      titel: 'Kavels Sri Lanka',
      beschrijving: 'Het complete overzicht van kavels, juni 2026.',
      href: 'https://app.notion.com/p/Kavels-Sri-juni-2026-3aadd7efede580a1bdc0fbca83c7172e',
      extern: true,
      bg: 'var(--green)',     fg: 'var(--lime)',
      pillBg: 'var(--lime)',  pillFg: 'var(--green)',
    },
  ];

  /* ---- Kaart-rendering --------------------------------------------------- */
  /* Externe links (extern: true) openen in een nieuw tabblad en krijgen een
     diagonale pijl, zodat zichtbaar is dat je de site verlaat. */
  function renderTools(containerId = 'tools') {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = TOOLS.map((t, i) => {
      const ext = t.extern
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      const label = t.extern ? `${t.titel} (opent in nieuw tabblad)` : t.titel;

      return `
      <a class="tool-card" href="${t.href}" aria-label="${label}"${ext}
         style="--card-bg:${t.bg};--card-fg:${t.fg}">
        <span class="pill ${i % 2 ? 'tilt-r' : 'tilt-l'}"
              style="background:${t.pillBg};color:${t.pillFg}">${t.pill}</span>
        <h2>${t.titel}</h2>
        <p>${t.beschrijving}</p>
        <span class="arrow" aria-hidden="true">${t.extern ? '↗' : '→'}</span>
      </a>`;
    }).join('');
  }

  /* ---- Getallen: parsen -------------------------------------------------- */
  /* Accepteert NL- én EN-notatie: "1.234,56", "1,234.56", "1234.56". */
  function parseNumber(value) {
    let s = String(value).trim().replace(/\s/g, '');
    if (!s) return null;
    if (s.includes(',') && s.includes('.')) {
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (s.includes(',')) {
      s = s.replace(',', '.');
    }
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  /* ---- Getallen: formatteren --------------------------------------------- */
  function formatNumber(n, digits = 2) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(n);
  }

  /* Voor invoervelden: geen duizendtal-groepering, zodat doortypen werkt. */
  function formatInput(n, digits = 4) {
    if (!Number.isFinite(n)) return '';
    return new Intl.NumberFormat(locale, {
      useGrouping: false,
      maximumFractionDigits: digits,
    }).format(n);
  }

  function formatEUR(n, digits = 0) {
    if (!Number.isFinite(n)) return '—';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: digits,
    }).format(n);
  }

  /* ---- Kleine site-helpers ------------------------------------------------ */
  function setYear(id = 'year') {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  }

  return { TOOLS, renderTools, parseNumber, formatNumber, formatInput, formatEUR, setYear, locale };
})();
