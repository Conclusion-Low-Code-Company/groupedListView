# \<WidgetName\> — Mendix Pluggable Widget

> Vervang `<WidgetName>` door de naam van de widget (bijv. `GroupedListview`).

---

## Inhoudsopgave

1. [Overzicht](#overzicht)
2. [Repo-structuur](#repo-structuur)
3. [Mendix-projecten (PW\_\<WidgetName\>)](#mendix-projecten)
4. [Branch-strategie](#branch-strategie)
5. [Versienummering](#versienummering)
6. [Werkwijzen](#werkwijzen)
   - [Nieuwe feature](#nieuwe-feature)
   - [Fix voor één versie](#fix-voor-één-versie)
   - [Fix porten naar meerdere versies](#fix-porten-naar-meerdere-versies)
   - [Hotfix op productie](#hotfix-op-productie)
   - [Nieuwe Mendix-versie toevoegen](#nieuwe-mendix-versie-toevoegen)
   - [Feature porten naar andere versies](#feature-porten-naar-andere-versies)
7. [Releases en Mendix Marketplace](#releases-en-mendix-marketplace)
8. [Algemene werkafspraken](#algemene-werkafspraken)

---

## Overzicht

Deze repo bevat de broncode van de **\<WidgetName\>** pluggable widget voor Mendix. De widget wordt onderhouden voor meerdere Mendix-versies. Elke Mendix-versie heeft een eigen branch-stroom zodat fixes en features per versie onafhankelijk kunnen worden gereleased en indien nodig naar andere versies worden geport.

De widget wordt gepubliceerd via de **Mendix Marketplace**. Elke Marketplace-release is gekoppeld aan een `main`-branch en getagd met een versienummer.

---

## Repo-structuur

```
<WidgetName> (GitHub repo)
│
├── mx9.24-main          ← Stabiele releases voor Mendix 9.24
├── mx9.24-develop       ← Integratie en testen voor Mendix 9.24
│
├── mx10.24-main         ← Stabiele releases voor Mendix 10.24
├── mx10.24-develop      ← Integratie en testen voor Mendix 10.24 (primaire versie)
│
└── mx11.6-main          ← Stabiele releases voor Mendix 11.6 (indien nodig)
    mx11.6-develop       ← Integratie en testen voor Mendix 11.6 (indien nodig)
```

> **Een versie-branch wordt alleen aangemaakt als de widget voor die Mendix-versie aanpassingen nodig heeft.** Werkt de widget van een oudere versie ook op een nieuwere Mendix-versie zonder wijzigingen, dan is een aparte branch niet nodig.

---

## Mendix-projecten

Naast deze widget-repo is er een apart Mendix-project: **`PW_<WidgetName>`**. Dit project dient als testomgeving per Mendix-versie. De widget-broncode staat *niet* in de Mendix-repo; die wordt als lokale clone beheerd.

### Inrichting per versie

Elke Mendix-versie heeft een eigen branch in het Mendix-project:

| Mendix-branch (PW-project) | Widget-branch (deze repo) |
|---|---|
| `<WidgetName>-mx9.24-develop` | `mx9.24-develop` |
| `<WidgetName>-mx10.24-develop` | `mx10.24-develop` |
| `<WidgetName>-mx11.6-develop` | `mx11.6-develop` |

### Setup per Mendix-versie-branch

1. Maak een map `PluggableWidgets` aan in de root van het Mendix-project.
2. Voeg deze map toe aan de `.gitignore` van de Mendix-project-repo zodat de widget-broncode niet wordt meegecommit.
3. Clone deze widget-repo in die map en checkout de bijbehorende develop-branch:

```bash
cd <mendix-project-root>/PluggableWidgets
git clone https://github.com/<org>/<WidgetName>.git
cd <WidgetName>
git checkout mx10.24-develop   # of de versie die bij deze branch hoort
```

> De Mendix-project-branch volgt altijd de widget **develop**-branch, nooit de main-branch.

---

## Branch-strategie

```
main ←──── develop ←──── feature/<naam>
                   ←──── fix/<naam>
main ←──── fix/<naam>    (alleen voor hotfixes, zie §Hotfix)
```

Per Mendix-versie bestaat de volgende branch-stroom:

| Branch | Doel |
|---|---|
| `mx<versie>-main` | Alleen stabiele, geteste releases. Nooit direct op committen. |
| `mx<versie>-develop` | Integratiebranch. Feature- en fix-branches komen hier samen en worden getest. |
| `feature/<naam>` | Ontwikkeling van een nieuwe feature. Aftakken van develop. |
| `fix/<naam>` | Oplossen van een bug. Aftakken van develop (of van main bij hotfix). |

### Merge-regels

- `feature/*` en `fix/*` → merge naar **develop**, nooit direct naar main.
- **develop** → merge naar **main** alleen als de develop-branch stabiel is en klaar voor release.
- Na een release: **main** taggen (zie [Releases](#releases-en-mendix-marketplace)).
- Hotfix op main → ook altijd terugmergen naar develop.

---

## Versienummering

### Branch-namen
Gebruik **major.minor** voor branch-namen, geen patch-versie:

```
✅  mx10.24-main
✅  mx10.24-develop
❌  mx10.24.18-develop   ← niet doen: raakt snel gedateerd
```

### Git-tags (releases)
Tags bevatten wél een patch-versie zodat exacte Marketplace-releases terug te vinden zijn:

```
v1.2.0-mx10.24
v1.2.0-mx9.24
v1.0.0-mx11.6
```

---

## Werkwijzen

### Nieuwe feature

> Ontwikkel nieuwe features altijd eerst op de **primaire versie** (op dit moment `mx10.24`). Port daarna naar andere versies.

```
1. git checkout mx10.24-develop
2. git checkout -b feature/<naam>
3. Ontwikkelen en lokaal testen in Mendix PW-project (mx10.24-develop branch)
4. git merge feature/<naam> → mx10.24-develop
5. Testen op develop (regressiecheck)
6. git merge mx10.24-develop → mx10.24-main
7. Tag aanmaken: v<major.minor.patch>-mx10.24
8. Feature eventueel porten naar andere versies (zie §Feature porten)
```

---

### Fix voor één versie

```
1. git checkout mx<versie>-develop
2. git checkout -b fix/<naam>
3. Fix maken en testen in Mendix PW-project
4. git merge fix/<naam> → mx<versie>-develop
5. Testen op develop
6. git merge mx<versie>-develop → mx<versie>-main
7. Tag aanmaken: v<major.minor.patch>-mx<versie>
```

---

### Fix porten naar meerdere versies

Gebruik **cherry-pick** om de fix naar andere versies te porten. Squash de fix-commits tot één commit vóórdat je merget naar develop, zodat cherry-pick een atomaire operatie is.

```bash
# Squash commits op fix-branch voordat je merget:
git rebase -i mx10.24-develop   # squash naar 1 commit

# Noteer de commit-hash na de merge:
git log mx10.24-develop -1 --oneline
# → a1b2c3d fix: crash bij lege dataset

# Port naar mx9.24:
git checkout mx9.24-develop
git cherry-pick a1b2c3d
# Eventuele conflicten oplossen (API-verschil Mendix 9 vs 10)
# Testen in Mendix PW-project (mx9.24-develop branch)
git merge mx9.24-develop → mx9.24-main
# Tag aanmaken

# Port naar mx11.6 (zelfde stappen):
git checkout mx11.6-develop
git cherry-pick a1b2c3d
```

> **Vuistregel**: port fixes altijd naar *alle* actieve versies, tenzij de bug versie-specifiek is.

---

### Hotfix op productie

Een hotfix is een kritieke fix die niet via de normale develop-stroom kan wachten.

```
1. git checkout mx<versie>-main
2. git checkout -b fix/<naam>-hotfix
3. Fix maken
4. git merge fix/<naam>-hotfix → mx<versie>-main
5. Tag aanmaken (patch-versie ophogen)
6. git merge fix/<naam>-hotfix → mx<versie>-develop
   (zodat develop ook de fix bevat)
7. Fix cherry-picken naar andere versies indien nodig (zie §Fix porten)
```

> Nooit alleen naar main mergen en develop vergeten — dan ontstaan conflicten bij de volgende release.

---

### Nieuwe Mendix-versie toevoegen

Nieuwe versie-branches worden aangemaakt op basis van de dichtstbijzijnde bestaande versie.

```bash
# Voorbeeld: Mendix 11.6 toevoegen op basis van mx10.24-main
git checkout mx10.24-main
git checkout -b mx11.6-main
git checkout -b mx11.6-develop

# Mendix-specifieke aanpassingen maken voor versie 11:
git checkout -b fix/mx11-breaking-api
# ... aanpassen en testen ...
git merge fix/mx11-breaking-api → mx11.6-develop
git merge mx11.6-develop → mx11.6-main
# Tag aanmaken: v<versie>-mx11.6
```

Stel vervolgens het bijbehorende Mendix PW-project in (zie [Mendix-projecten](#mendix-projecten)).

> Een nieuwe versie-branch is alleen nodig als de widget aanpassingen vereist voor die Mendix-versie. Werkt de widget zonder wijzigingen op een nieuwere versie, gebruik dan de bestaande branch.

---

### Feature porten naar andere versies

Na ontwikkeling op de primaire versie (mx10.24):

```bash
# Squash feature-commits tot 1 commit vóór merge naar develop:
git rebase -i mx10.24-develop

# Noteer de commit-hash:
git log mx10.24-develop -1 --oneline
# → d4e5f6g feat: collapsible groups

# Port naar mx11.6 (nieuwer — doorgaans weinig aanpassingen):
git checkout mx11.6-develop
git cherry-pick d4e5f6g
# Testen → merge naar mx11.6-develop → mx11.6-main → tag

# Port naar mx9.24 (ouder — mogelijk meer aanpassingen):
git checkout mx9.24-develop
git cherry-pick d4e5f6g
# Aanpassingen voor oudere Mendix API indien nodig
# Testen → merge naar mx9.24-develop → mx9.24-main → tag
```

> Port altijd van nieuw naar oud: mx10.24 → mx11.6 → mx9.24. Oudere versies vereisen soms meer aanpassingswerk door beperkingen in de oudere Mendix API.

---

## Releases en Mendix Marketplace

- Elke Marketplace-release is gebaseerd op een `main`-branch.
- Tag de main-branch direct na elke release:

```bash
git tag v1.2.0-mx10.24
git push origin v1.2.0-mx10.24
```

- In de Marketplace-vermelding: verwijs naar de relevante `main`-branch en noteer de Mendix-versiecompatibiliteit expliciet.
- Elke Mendix-versie heeft een eigen Marketplace-release indien de widget verschilt per versie.

---

## Algemene werkafspraken

| Afspraak | Toelichting |
|---|---|
| **Primaire versie** | Nieuwe features worden eerst ontwikkeld op `mx10.24` (of de meest gebruikte versie op dat moment). |
| **Squash voor port** | Squash commits op een feature/fix-branch tot één commit vóór de merge naar develop. Dit maakt cherry-picken naar andere versies eenvoudiger. |
| **Atomaire commits** | Schrijf duidelijke commit-messages: `feat: <omschrijving>` of `fix: <omschrijving>`. |
| **Mendix PW-project** | De Mendix-project-branch volgt altijd de widget develop-branch, nooit main. |
| **Versie-branch aanmaken** | Alleen als de widget daadwerkelijk aanpassingen nodig heeft voor die Mendix-versie. |
| **Hotfix altijd dubbel mergen** | Main én develop, zodat er geen divergentie ontstaat. |
| **Tags bij elke release** | Altijd taggen op main met het formaat `v<major.minor.patch>-mx<versie>`. |
| **Branchnamen** | Gebruik major.minor voor versie-branches, geen patch-versie in de naam. |
