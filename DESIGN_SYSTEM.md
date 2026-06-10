# Design System Specification: InnovateGuide IT Project Marketplace

This document specifies the design tokens, color palette, typography system, spacing utilities, and visual guidelines derived from the high-fidelity UI screens of the **InnovateGuide IT Project Marketplace**. These tokens form the design system foundation for building a premium, production-ready frontend using React + Vite + Tailwind CSS.

---

## 1. Color Palette

The color scheme is designed for a premium, corporate-modern tech ecosystem. It establishes trust and professional authority via deep blues while driving action through energetic orange-red elements.

### Brand Colors

| Token Name | Hex Value | Tailwind Mapping | Description / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#003d58` | `bg-primary`, `text-primary` | Brand identity, headers, main titles, buttons. |
| **Primary Container** | `#1b5573` | `bg-primary-container` | Dark section backgrounds, status panels, dark hero layouts. |
| **Secondary Accent** | `#ad3300` | `bg-secondary`, `text-secondary` | Highlight color, category focus borders, pricing, secondary links. |
| **Secondary Container** | `#fc6028` | `bg-secondary-container` | High-priority calls to action (CTAs), badge states, stepper buttons. |
| **Background / Surface** | `#f5faff` | `bg-surface`, `bg-background` | Default page background, bright section panels. |
| **On-Surface (Charcoal)** | `#001e2d` | `text-on-surface`, `text-on-background`| Main body copy, high-contrast inputs, form titles. |
| **Muted Grey** | `#41484d` | `text-on-surface-variant` | Descriptions, metadata, secondary menu text, labels. |
| **Border / Outline** | `#c1c7ce` | `border-outline-variant` | Card borders, inputs, divider lines (used at 10%–30% opacity). |
| **Surface Lowest (White)** | `#ffffff` | `bg-surface-container-lowest` | Primary content cards, active inputs, headers. |
| **Surface Container Low** | `#e9f5ff` | `bg-surface-container-low` | Bento grid cards, bento statistics, section containers. |
| **Surface Container High**| `#d1ecff` | `bg-surface-container-high` | Divider lines, card hover overlays, filter chips background. |

### Accent Highlights (Tailwind config extension)
- `on-secondary-container`: `#561500` (Dark orange text on light orange chips)
- `on-secondary-fixed`: `#390b00` (Footer social icon hover text)
- `secondary-fixed`: `#ffdbd0` (Footer social icon hover background)
- `on-primary-container`: `#95c9eb` (Light navy highlights on dark navy surfaces)
- `primary-fixed`: `#c6e7ff` (Subtitle text on primary backgrounds)

---

## 2. Typography

The design system exclusively utilizes **Plus Jakarta Sans** for both headings and body text, promoting a highly readable, modern geometric look. For icons, **Material Symbols Outlined** are loaded dynamically.

### Typographic Scale

| Font Class | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `font-display-lg` | `48px` (`3rem`) | `56px` | Bold (`700`) | Main page hero titles, landing page headlines. |
| `font-display-lg-mobile` | `32px` (`2rem`) | `40px` | Bold (`700`) | Hero titles on mobile viewports. |
| `font-headline-lg` | `32px` (`2rem`) | `40px` | Bold (`700`) | Main section headers (e.g., FAQ, Values, Category grid). |
| `font-headline-md` | `24px` (`1.5rem`) | `32px` | Semi-Bold (`600`) | Subsections, card headers, sidebar widget titles. |
| `font-body-lg` | `18px` (`1.125rem`) | `28px` | Regular (`400`) | Sub-headings, intro paragraphs, testimonial quotes. |
| `font-body-md` | `16px` (`1rem`) | `24px` | Regular (`400`) | Default body copy, details text, form controls, filter options. |
| `font-label-md` | `14px` (`0.875rem`) | `20px` | Semi-Bold (`600`) | Button labels, categories, metadata badges, input titles. |

---

## 3. Shape & Elevation

To avoid standard, blocky designs, the interface uses a structured hierarchy of rounded shapes combined with extremely soft ambient shadows.

### Border Radius
- `DEFAULT` / `rounded-lg`: `0.5rem` (`8px`) — Used for buttons, badge chips, and small cards.
- `rounded-xl`: `0.75rem` (`12px`) — Used for standard project cards, sidebar filter containers, input textboxes.
- `rounded-2xl`: `1rem` (`16px`) — Used for stats panels, category cards, CTAs.
- `rounded-[2rem]`: `2rem` (`32px`) — Used for large section highlights, Bento cards, custom requests forms.
- `rounded-full`: `9999px` — Used for stepper numbers, badge highlights, circular social buttons.

### Elevation & Shadows
- **Standard Shadow (sm)**: `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)` (Header, default sidebar).
- **Premium Card Shadow (lg)**: `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` (Bento sections, form panels).
- **Hover Lift (xl)**: `box-shadow: 0px 12px 32px rgba(27, 85, 115, 0.12)` (Triggered alongside `transform -translate-y-2` on project cards).

---

## 4. Spacing & Grid Guidelines

Layouts are structured using a responsive, fluid grid matching Tailwind's layout constraints.

- **Maximum Container Width**: `max-w-[1280px]` (`max-w-container-max`).
- **Margins**:
  - Desktop: `px-10` (`px-margin-desktop`)
  - Mobile: `px-4` (`px-margin-mobile`)
- **Gutter Spacing**: `gap-6` (`gap-gutter`)
- **Layout Margins**:
  - Vertical section margins are generous: `py-24` on desktop and `py-16` on mobile.

---

## 5. Micro-interactions & Transitions

Micro-interactions make the application feel fluid, responsive, and premium:

- **Button Hover States**: Scale-down press transitions (`active:scale-95 duration-200`) and slight opacity changes (`hover:opacity-90 transition-all duration-300`).
- **Card Hover Effects**: Smooth 3D-lift effect on project/category cards:
  ```css
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transform: translateY(-8px);
  box-shadow: 0px 12px 32px rgba(27, 85, 115, 0.12);
  ```
- **Form Focus Transitions**: Input fields use a 2px light-grey border that scales to primary navy with a smooth glow on focus.
- **Scroll Reveal animations**: Page sections utilize `IntersectionObserver` to trigger fade-in and slide-up:
  - Initial: `opacity-0 translate-y-8`
  - Active: `opacity-100 translate-y-0 transition-all duration-700`
- **Dynamic Headers**: The sticky navigation header shrinks in height (`h-20` down to `h-16`) and gains a shadow when scroll offset is greater than 20px.
