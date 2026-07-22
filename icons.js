// Ícones em SVG inline. Substituem fontes de ícone ligature-based (ex.: Material
// Symbols), que dependem de rede e quebram o layout (mostrando texto cru como
// "search" ou "dark_mode") caso a fonte não carregue a tempo, seja bloqueada por
// um bloqueador de anúncios/privacidade, ou falhe silenciosamente.
// Cada ícone é um <svg> autocontido, com tamanho fixo, então nunca "estoura" o
// elemento que o contém.

const ICON_PATHS = {
  mosaic: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><path d="M15.2 20.2l1.1-2.4 2.4-1.1-2.4-1.1-1.1-2.4-1.1 2.4-2.4 1.1 2.4 1.1z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  dark_mode: '<path d="M20.2 14.6A8.6 8.6 0 1 1 9.4 3.8a7 7 0 0 0 10.8 10.8z"/>',
  light_mode: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.3 4.3l1.7 1.7M18 18l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.3 19.7L6 18M18 6l1.7-1.7"/>',
  apps: '<circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
  palette: '<path d="M12 3a9 8.4 0 1 0 0 16.8c1 0 1.7-.8 1.7-1.7 0-.45-.18-.86-.46-1.16-.28-.31-.46-.72-.46-1.17 0-.94.76-1.7 1.7-1.7h2c2.5 0 4.5-2 4.5-4.4C21.4 5.5 17.2 3 12 3z"/><circle cx="7.2" cy="10.6" r="1.15"/><circle cx="10.4" cy="7" r="1.15"/><circle cx="15" cy="7.4" r="1.15"/><circle cx="17.2" cy="11.4" r="1.15"/>',
  code: '<path d="M8.5 8l-5 4.4 5 4.4M15.5 8l5 4.4-5 4.4M13.2 5.5l-2.4 13"/>',
  flag: '<path d="M5 21V4.2c0-.4.32-.7.72-.63C8 4 10.4 5.5 13 5.5c2.2 0 3.7-1.2 5.6-.9.4.06.7.4.7.8v7.9c0 .4-.32.7-.7.8-1.9.3-3.4-.9-5.6-.9-2.6 0-5 1.5-7.28 1.13"/><path d="M5 21V13"/>',
  assignment: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><rect x="8.5" y="3" width="7" height="3" rx="1"/><path d="M8.5 11h7M8.5 14.5h7M8.5 17.5h4.5"/>',
  arrow_forward: '<path d="M4.5 12h15M13.5 5.5L20 12l-6.5 6.5"/>',
  content_copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  search_off: '<path d="M9 4.5a6.5 6.5 0 0 1 6.06 8.85M6.4 6.5a6.5 6.5 0 0 0 8.85 9.35"/><path d="M3.5 3.5l17 17"/><path d="M20 20l-4.9-4.9"/>',
};

const ICON_VIEWBOX = "0 0 24 24";

function iconSVG(name, size) {
  const px = size || 20;
  const d = ICON_PATHS[name];
  if (!d) return "";
  return `<svg class="icon-svg" width="${px}" height="${px}" viewBox="${ICON_VIEWBOX}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
}

// Substitui todo elemento com [data-icon] (e opcionalmente [data-icon-size])
// pelo SVG correspondente. Chamado no carregamento e após qualquer innerHTML
// dinâmico que contenha placeholders de ícone.
function hydrateIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    const size = parseInt(el.getAttribute("data-icon-size") || "20", 10);
    el.innerHTML = iconSVG(name, size);
  });
}
