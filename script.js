(function () {
  "use strict";

  const chipRow = document.getElementById("chipRow");
  const grid = document.getElementById("cardGrid");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const resetFiltersBtn = document.getElementById("resetFilters");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const dialog = document.getElementById("promptDialog");
  const dialogRoleChip = document.getElementById("dialogRoleChip");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDesc = document.getElementById("dialogDesc");
  const dialogTextarea = document.getElementById("dialogTextarea");
  const copyBtn = document.getElementById("copyBtn");
  const copyIcon = document.getElementById("copyIcon");
  const copyLabel = document.getElementById("copyLabel");
  const snackbar = document.getElementById("snackbar");

  let state = {
    role: "all",
    query: "",
  };

  // ---------------------------------------------------- storage segura
  // Alguns contextos (ex.: preview em iframe com sandbox, modo privado
  // restrito) bloqueiam localStorage e lançam uma exceção síncrona. Sem
  // este wrapper, essa exceção interrompe todo o script antes de os cards
  // e os chips serem montados — dando a impressão de app quebrado.
  const memoryStore = {};
  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return memoryStore[key] ?? null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        memoryStore[key] = value;
      }
    },
  };

  // ------------------------------------------------------------- chips

  function buildChips() {
    const allChip = makeChip("all", "Todos", "apps");
    chipRow.appendChild(allChip);
    Object.entries(ROLES).forEach(([key, meta]) => {
      chipRow.appendChild(makeChip(key, meta.label, meta.icon));
    });
    updateChipStates();
    hydrateIcons(chipRow);
  }

  function makeChip(role, label, icon) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.dataset.role = role;
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `<span class="icon" data-icon="${icon}" data-icon-size="18" aria-hidden="true"></span><span>${label}</span>`;
    btn.addEventListener("click", () => {
      state.role = role;
      updateChipStates();
      render();
    });
    return btn;
  }

  function updateChipStates() {
    chipRow.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.role === state.role));
    });
  }

  // -------------------------------------------------------------- cards

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const haystack = `${item.title} ${item.description} ${item.tag}`.toLowerCase();
    return haystack.includes(query);
  }

  function getFiltered() {
    const query = state.query.trim().toLowerCase();
    return PROMPTS.filter((item) => {
      const roleOk = state.role === "all" || item.role === state.role;
      return roleOk && matchesQuery(item, query);
    });
  }

  function buildCard(item) {
    const meta = ROLES[item.role];
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.role = item.role;

    card.innerHTML = `
      <div class="card__top">
        <span class="card__role"><span class="icon" data-icon="${meta.icon}" data-icon-size="15" aria-hidden="true"></span>${escapeHTML(meta.label)}</span>
        <span class="card__tag">${escapeHTML(item.tag)}</span>
      </div>
      <h3 class="card__title">${escapeHTML(item.title)}</h3>
      <p class="card__desc">${escapeHTML(item.description)}</p>
      <div class="card__footer">
        <button type="button" class="card__cta" data-id="${item.id}">
          Ver prompt completo          
        </button>
      </div>
    `;

    card.querySelector(".card__cta").addEventListener("click", () => openDialog(item));
    return card;
  }

  function render() {
    const filtered = getFiltered();
    grid.innerHTML = "";
    filtered.forEach((item) => grid.appendChild(buildCard(item)));
    hydrateIcons(grid);

    const total = PROMPTS.length;
    const count = filtered.length;
    resultCount.textContent =
      count === total
        ? `${total} templates disponíveis`
        : `${count} de ${total} templates`;

    const hasSearchQuery = state.query.trim().length > 0;
    emptyState.hidden = count > 0 || !hasSearchQuery;
    grid.hidden = count === 0;
  }

  // ------------------------------------------------------------- dialog

  function openDialog(item) {
    const meta = ROLES[item.role];
    dialogRoleChip.textContent = `${meta.label} · ${item.tag}`;
    dialogRoleChip.style.background = `var(--role-${item.role}-bg)`;
    dialogRoleChip.style.color = `var(--role-${item.role})`;
    dialogTitle.textContent = item.title;
    dialogDesc.textContent = item.description;
    dialogTextarea.value = item.prompt;
    resetCopyButton();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      // Fallback para navegadores muito antigos sem suporte a <dialog>
      dialog.setAttribute("open", "");
    }
  }

  function resetCopyButton() {
    copyBtn.classList.remove("is-success");
    copyIcon.setAttribute("data-icon", "content_copy");
    copyLabel.textContent = "Copiar prompt";
    hydrateIcons(copyBtn);
  }

  copyBtn.addEventListener("click", async () => {
    const text = dialogTextarea.value;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        dialogTextarea.removeAttribute("readonly");
        dialogTextarea.select();
        document.execCommand("copy");
        dialogTextarea.setAttribute("readonly", "");
        dialogTextarea.setSelectionRange(0, 0);
      }
      copyBtn.classList.add("is-success");
      copyIcon.setAttribute("data-icon", "check");
      copyLabel.textContent = "Copiado!";
      hydrateIcons(copyBtn);
      showSnackbar("Prompt copiado para a área de transferência");
      setTimeout(resetCopyButton, 2200);
    } catch (err) {
      showSnackbar("Não foi possível copiar. Selecione o texto manualmente.");
    }
  });

  dialog.addEventListener("close", resetCopyButton);

  // Fecha ao clicar no backdrop: quando o clique é no próprio elemento
  // <dialog> (fora do conteúdo), e não em algum filho dele.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  // ------------------------------------------------------------ snackbar

  let snackbarTimer = null;
  function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.classList.add("show");
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => snackbar.classList.remove("show"), 2600);
  }

  // -------------------------------------------------------------- search

  let searchDebounce = null;
  searchInput.addEventListener("input", () => {
    searchClear.hidden = searchInput.value.length === 0;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.query = searchInput.value;
      render();
    }, 120);
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.hidden = true;
    state.query = "";
    searchInput.focus();
    render();
  });

  resetFiltersBtn.addEventListener("click", () => {
    state = { role: "all", query: "" };
    searchInput.value = "";
    searchClear.hidden = true;
    updateChipStates();
    render();
  });

  // --------------------------------------------------------------- theme

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeIcon.setAttribute("data-icon", theme === "dark" ? "light_mode" : "dark_mode");
    hydrateIcons(themeToggle);
    safeStorage.set("prompt-studio-theme", theme);
  }

  function initTheme() {
    const saved = safeStorage.get("prompt-studio-theme");
    let prefersDark = false;
    try {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      prefersDark = false;
    }
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // ---------------------------------------------------------------- init

  function init() {
    hydrateIcons(document); // ícones estáticos do HTML (topbar, dialog, empty state)
    initTheme();
    buildChips();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
