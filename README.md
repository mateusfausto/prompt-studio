# Prompt Studio

Biblioteca de templates de prompt para times de produto — **Design**, **Desenvolvimento**, **Product Owners** e **Gerência de Projetos**. 80 templates prontos (20 por papel), organizados por papel e tarefa, com busca, filtro por categoria e botão de copiar.

Feito em HTML, CSS e JavaScript puros (sem build step).


## Como adicionar um novo template

Abra `data.js` e adicione um novo objeto ao array `PROMPTS`, seguindo o padrão:

```js
{
  id: "d9",                 // identificador único
  role: "design",           // design | dev | po | pm
  tag: "Nome da subcategoria",
  title: "Título curto do template",
  description: "Resumo de uma linha exibido no card.",
  prompt: `Texto completo do prompt aqui...`,
}
```

## Como adicionar um novo papel/categoria

No topo de `data.js`, adicione uma nova chave ao objeto `ROLES` com `label`, `icon` (deve existir uma entrada correspondente em `ICON_PATHS`, no `icons.js` — veja a seção abaixo) e `full`. Depois, opcionalmente, defina as cores desse papel em `styles.css` (`--role-<chave>` e `--role-<chave>-bg`, nos blocos `:root` e `:root[data-theme="dark"]`).

## Ícones

Os ícones não usam fonte de ícones (ligatures via Google Fonts): são SVGs inline definidos em `icons.js`, no objeto `ICON_PATHS`. Isso evita dois problemas comuns em apps hospedados de forma estática: tela em branco/atraso quando a fonte de ícones não carrega a tempo, e ícones aparecendo como texto cru (ex. "search") quando a fonte é bloqueada por um ad-blocker. Para adicionar um novo ícone, inclua uma nova chave em `ICON_PATHS` com o `path`/`circle` SVG (viewBox `0 0 24 24`) e referencie o nome em `data-icon="nome"` no HTML ou no `data.js`.

