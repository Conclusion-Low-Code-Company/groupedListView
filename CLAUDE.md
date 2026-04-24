# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Guidelines

See [MX_PW_WEB_CODING_GUIDELINES.md](MX_PW_WEB_CODING_GUIDELINES.md)

For Mendix widget XML descriptor reference see [MX_PW_XML.md](MX_PW_XML.md)

## Commands

```bash
npm run build       # production build → dist/
npm run dev         # watch mode (webpack dev server)
npm run start       # start:server mode
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run release     # lint + release build (mpk package)
```

There are no automated tests in this project.

The Mendix project root is two levels up (`../../` relative to this directory), configured via `config.projectPath` in `package.json`. The dev server proxies to `http://localhost:8080`.

## Versioning

When bumping the widget version, update it in **all three places**:

1. `package.json` — `version` field
2. `src/package.xml` — `version` attribute on `<clientModule>`


## Architecture

This is a **Mendix pluggable widget** (React 17 / TypeScript) that renders a datasource list grouped by a string attribute, with optional sticky group headers and a click action per item.

### Widget descriptor

`src/GroupedListView.xml` defines the widget descriptor (see `MX_PW_XML.md` for XML reference). It declares all configurable properties consumed as `GroupedListViewContainerProps` (typed in `typings/GroupedListViewProps.d.ts` — auto-generated, do not edit manually):

| Property | Type | Purpose |
|---|---|---|
| `inputList` | `ListValue` | The datasource |
| `groupId` | `ListAttributeValue<string>` | String attribute that identifies a group; **list must be sorted on this** |
| `groupTitle` | `ListWidgetValue` | Widget slot rendered once per group (receives the first item of that group) |
| `widget` | `ListWidgetValue` | Widget slot rendered for every item |
| `emptyMessage` | `ReactNode` | Optional slot shown when list is empty |
| `stickyGroupHeaders` | `boolean` | Adds CSS `sticky` class to group headers |
| `listItemClick` | `ListActionValue` | Optional click action per item |

### Component tree

```
GroupedListView          ← entry point; guards for undefined/empty list
  ├─ AlertMessage        ← shown when inputList.items is undefined
  ├─ EmptyMessage        ← shown when list is empty; renders emptyMessage slot or empty div
  └─ GroupedList         ← main render; iterates items tracking lastKnownGroupId
       ├─ GroupTitle     ← <li class="glv__listHeader [sticky]">; one per group change
       └─ ListItem       ← <li class="glv__listItem [link]">; executes listItemClick action
```

**Grouping logic** lives entirely in `GroupedList.tsx`: a mutable `lastKnownGroupId` variable is reset on each render and compared per item. A new `GroupTitle` is injected whenever `groupId` changes. This relies on the datasource already being sorted by `groupId` — the widget does not sort itself.

### CSS classes

All widget elements use the `glv__` prefix. The outer container also carries `mx-listview` for Mendix theme compatibility. Sticky headers use the standard CSS `position: sticky` (with `-webkit-sticky` fallback). Styles live in `src/ui/GroupedListView.css`.
