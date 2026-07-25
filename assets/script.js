/* ==========================================================================
   High Five — gedeeld JavaScript
   - HF.TOOLS: het register. Nieuwe tool toevoegen = één object toevoegen.
   - HF.renderTools(): bouwt de kaarten op de homepage.
   - HF.parseNumber / HF.formatEUR / …: hulpfuncties voor alle tools.
   ========================================================================== */

window.HF = (() => {
  const locale = 'nl-NL';

  /* ---- Toolregister ------------------------------------------------------
     Nieuwe tool? Voeg hier één object toe en maak /tools/<id>/index.html.
     orb  : [kleurA, kleurB]  → de gradientbol op de kaart
     wash : [kleurA, kleurB]  → de achtergrondwas van het kaartvlak
  ------------------------------------------------------------------------- */
  const TOOLS = [
    {
      id: 'land-price',
      pill: 'Land Price',
      titel: 'Landprijs omrekenaar',
      beschrijving: 'LKR, USD en EUR per perch, acre, hectare en m².',
      href: 'tools/land-price/',
      orb:  ['#ffd9c6', '#dcedde'],
      wash: ['#fdf6f1', '#f1f7f0'],
    },
    {
      id: 'plot-planner',
      pill: 'Plot Planner',
      titel: 'Surface Plot Planner',
      beschrijving: 'Cabins, privacycirkels en clash-detectie op je kavel.',
      href: 'tools/plot-planner/',
      orb:  ['#d8ecea', '#fbe4ea'],
      wash: ['#f2f8f7', '#fbf4f6'],
    },
  ];

  /* ---- Kaart-rendering --------------------------------------------------- */
  function renderTools(containerId = 'tools') {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = TOOLS.map(t => `
      <a class="tool-card" href="${t.href}" aria-label="${t.titel}">
        <div class="tool-visual"
             style="--card-wash-a:${t.wash[0]};--card-wash-b:${t.wash[1]}">
          <div class="orb" style="--orb-a:${t.orb[0]};--orb-b:${t.orb[1]}" aria-hidden="true"></div>
          <span class="pill">${t.pill}</span>
        </div>
        <div class="tool-meta">
          <div>
            <h2>${t.titel}</h2>
            <p>${t.beschrijving}</p>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </div>
      </a>
    `).join('');
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
