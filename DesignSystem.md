# C.R.E.D.I.T. Design System: "The Transparent Ledger"

## 1. Design Philosophy

The C.R.E.D.I.T. interface is designed to feel like a high-end financial terminal—crisp, authoritative, and rooted in real-world data. It transitions away from any "kawaii" aesthetics to a high-fidelity **Institutional Data-Grid** style, leveraging geometric precision to create a professional, trustworthy environment for ecological investment.

- **The Data-Point Background:** The white background is overlaid with a subtle slate-grey dot matrix (24px spacing), symbolizing the thousands of dMRV data points (satellite and IoT) that power the protocol.
- **Geometric Synchronicity:** Every UI element—from button corners to card borders—aligns with the sharp 45-degree angles found in the C.R.E.D.I.T. logo.

---

## 2. Core Design Tokens

### Colors

These colors form the foundation of the C.R.E.D.I.T. theme. Implementing them as global CSS variables ensures consistency.

| Role | Color Name | Hex Code | rgba() | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary/Action** | Regen Emerald | `#0EDC7A` | `rgba(14, 220, 122, 1)` | "Value Creation" (successful carbon sequestration, yield verification, primary actions). |
| **Ink/Borders** | Oracle Slate | `#1A1D20` | `rgba(26, 29, 32, 1)` | Primary ink color for text and heavy borders, replacing standard black for a premium feel. |
| **Accent/Wash** | Data Mint | `#0EDC7A14` | `rgba(14, 220, 122, 0.08)` | Faint, transparent wash used for card backgrounds to indicate "Active" or "Verified" data. |
| **Background** | Terminal White | `#FFFFFF` | `rgba(255, 255, 255, 1)` | Base background color, to be overlaid with the 24px Oracle Slate dot matrix (at low opacity). |

**CSS Variables:**

```css
:root {
  --color-regen-emerald: #0EDC7A;
  --color-oracle-slate: #1A1D20;
  --color-data-mint: rgba(14, 220, 122, 0.08);
  --color-terminal-white: #FFFFFF;
}
```

### Typography

| Font Family | Usage | Characteristics |
| :--- | :--- | :--- |
| **Inter** | Primary UI text, headings, and large metrics. | Use `SemiBold` with `-0.02em` letter spacing for large metrics (e.g., "1,200 Tons") to create a "Wall Street" editorial feel. |
| **Space Mono** | Buttons, verified tags, contract hashes, data labels. | All-caps for buttons. Enhances the technical, ledger-based nature of the protocol. |

**CSS Variables:**

```css
:root {
  --font-primary: 'Inter', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

### Shadows & Elevation

- **Hard Shadow:** A solid `4px` offset in `Oracle Slate` at `5%` opacity, replacing soft blurs to create a technical, layered structural look.
- **Ghost Shadow (Interactive):** Solid black shadow that appears behind buttons on hover.

**CSS Variables:**

```css
:root {
  --shadow-hard: 4px 4px 0px rgba(26, 29, 32, 0.05);
  --shadow-ghost: 4px 4px 0px rgba(0, 0, 0, 1);
}
```

---

## 3. Re-Engineered Components

### The "Proof-of-Impact" Bento Cards

High-precision, structural containers that replace previous rounded "squircles."

- **Architecture:** `8px` corner radius with a `1px` solid `Oracle Slate` border.
- **Visual Depth:** Applies the predefined "Hard Shadow" (`var(--shadow-hard)`).
- **Header Strip:** A top `4px` accent bar on every card. If the data is verified (e.g., a VCC token), this bar becomes `Regen Emerald`. Otherwise, keep it neutral.
- **Metrics Typography:** Core data points use `Inter SemiBold`, `-0.02em` tracking.

### The "Protocol-Standard" Buttons

Buttons must feel like significant financial triggers rather than playful clicks.

- **Base State:** Solid `Regen Emerald` background with sharp `4px` corners. Text is all-caps `Space Mono` (e.g., `SYNC ORACLE` or `MINT VCC`).
- **Hover Logic (The Trigger):**
  - Button shift-transforms `2px` up and `2px` to the left (`transform: translate(-2px, -2px)`).
  - A solid black "Ghost Shadow" (`var(--shadow-ghost)`) appears behind it, mimicking the physical click of a high-end hardware toggle.
  - *Implementation:* Use extremely crisp transitions (e.g., `transition: transform 0.15s ease, box-shadow 0.15s ease`) so the hover state feels deliberate and instantaneous.

### Data Visualization & Badges

- **The Progress Rhombus:** Replaces standard circular or linear progress bars.
  - *Inactive steps:* Hollow outlines using `Oracle Slate`.
  - *Active steps:* Solid `Regen Emerald` with a faint outer glow (`box-shadow: 0 0 8px var(--color-data-mint)`).
- **Verified Tags (Micro-Labels):** Status tags (e.g., "On-Chain Verified") are presented to look like physical serial number plates.
  - *Text:* `10px Space Mono`, uppercase.
  - *Container:* Encased in a `1px` `Oracle Slate` box with minimal internal padding (e.g., `2px 4px`).

---

## 4. Layout & Interaction

### Rigid Grid System

- **Columns:** 12-column structural grid.
- **Gutters:** `32px` strict gutters.
- **Goal:** Information is never "crowded." It should feel intentionally placed, mirroring high-end institutional dashboards.

### Micro-Interactions & Animations

- **The Logo Pulse:** During active processes (e.g., data ingestion, ZK-proof generation), the four green rhombuses in the logo do not just continuously spin. Instead, they pulse in a clockwise sequence, transitioning opacity from `30%` to `100%`. This signals that the "C.R.E.D.I.T. Guard" oracle is actively processing.
- **Hash Hover (Utility-First):** When hovering over a contract hash or blockchain address (e.g., `0x71C...`):
  - The background of the text string turns `Data Mint`.
  - The cursor changes to a "Copy" icon (`cursor: copy`).
  - *Developer Note:* Ensure real click-to-copy functionality accompanies this hover state, as it reinforces the platform's utility-first nature.
