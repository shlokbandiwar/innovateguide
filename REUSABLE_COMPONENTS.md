# Reusable Component Specification: InnovateGuide Marketplace

This document defines the interface, props, structures, and behavior of all identified reusable React components. Implementing these components as stateless/state-managed primitives prevents code duplication and ensures absolute consistency with the design system.

---

## 1. Shared Layouts

### `MainLayout.jsx`
The primary page template wrapper containing universal navigation systems.
- **Props**:
  - `children` (React Node) - Page content.
- **Features**:
  - Automatically loads the sticky shrunken `<TopAppBar>` on scroll.
  - Controls layout offsets for mobile viewports using bottom padding to prevent `<BottomNavBar>` overlap.
  - Automatically resets scroll position on route changes.

---

## 2. Navigation System

### `TopAppBar.jsx`
A sticky responsive navigation header with scroll-aware height resizing and shadow toggle.
- **Props**:
  - `activePath` (String) - Highlight active navigation link.
  - `onOpenMobileMenu` (Function) - Toggle sidebar state on mobile viewports.
- **Features**:
  - Scrolls from `h-20 shadow-sm` down to `h-16 shadow-md` when viewport vertical scroll exceeds `20px`.
  - Integrates the global search overlay toggle.

### `BottomNavBar.jsx`
The mobile-only bottom navigation system (`md:hidden`) with floating active states.
- **Props**:
  - `activePath` (String) - Active page route.
- **Features**:
  - Positioned `fixed bottom-0 left-0 w-full z-50`.
  - Integrates direct mapping to core routes: Home, Search, Cart, Profile.

---

## 3. General Primitives

### `Button.jsx`
Universal button with design-system variant mappings.
- **Props**:
  - `variant` (Enum: `'primary' | 'accent' | 'outline' | 'text'`)
  - `size` (Enum: `'sm' | 'md' | 'lg'`)
  - `icon` (String) - Material icon identifier.
  - `disabled` (Boolean) - Disabled state.
  - `onClick` (Function) - Callback.
  - `className` (String) - Ad-hoc overrides.
- **Tailwind Mappings**:
  - `primary`: `bg-primary text-white hover:opacity-90 active:scale-95`
  - `accent`: `bg-secondary-container text-white hover:bg-secondary active:scale-95`
  - `outline`: `border-2 border-primary text-primary hover:bg-primary/5`
  - `text`: `text-secondary hover:underline`

### `Input.jsx` / `Select.jsx` / `TextArea.jsx`
Controlled form controls with design-compliant active and focus styling.
- **Props**:
  - `label` (String) - Display label.
  - `error` (String) - Error messages.
  - `value` (Any) - Control value.
  - `onChange` (Function) - Setter callback.
  - `className` (String) - Custom styling.

---

## 4. Structural Sections

### `Hero.jsx`
Parametric hero banner that handles four distinct background/layout configurations.
- **Props**:
  - `variant` (Enum: `'homepage' | 'about' | 'custom' | 'simple'`)
  - `badgeText` (String) - Top banner pill text.
  - `title` (String / React Node) - Main heading text.
  - `subtitle` (String) - Accompanying description.
  - `onSearch` (Function) - Search action callback (exclusive to `homepage` variant).
  - `imageSrc` (String) - Floating image URL (exclusive to `about` variant).
  - `ctas` (Array of CTA definitions) - Action buttons configurations.

### `StatsBlock.jsx`
Grid wrapper that displays summary stats, featuring negative offset overrides for landing heroes.
- **Props**:
  - `stats` (Array of `{ value: String, label: String, icon: String }`)
  - `floating` (Boolean) - If true, applies absolute margins (`-mt-12`) to overlay the landing hero.

---

## 5. Listing & Categories

### `ProjectCard.jsx`
Product showcase card featuring the premium 3D lift hover interaction.
- **Props**:
  - `id` (String) - Project identifier.
  - `title` (String) - Project name.
  - `description` (String) - Explanatory summary.
  - `category` (String) - Filter tag name.
  - `difficulty` (String) - Difficulty rating.
  - `price` (Number) - Cost.
  - `image` (String) - Graphic banner URL.
  - `isTrending` (Boolean) - Renders absolute badge overlay.
  - `onViewDetails` (Function) - Navigate event.

### `CategoryCard.jsx`
Interactive bento grids that route users to pre-filtered Browse results.
- **Props**:
  - `title` (String) - Domain Category name.
  - `icon` (String) - Material symbol identifier.
  - `count` (Number) - Available items count.
  - `onSelect` (Function) - Selected filter callback.
- **Features**:
  - Icon triggers scale increases (`group-hover:scale-110`) on item selection.
  - Border transitions to Secondary Accent (`group-hover:border-secondary`).

### `ProjectGridCarousel.jsx`
Responsive carousel wrapper for product sections.
- **Props**:
  - `title` (String) - Grid heading.
  - `subtitle` (String) - Descriptive copy.
  - `projects` (Array of Project Objects)
  - `onViewAll` (Function) - View all callback.
- **Features**:
  - Maps items to responsive grid breakpoints (`grid-cols-1 md:grid-cols-3 lg:grid-cols-4`).

---

## 6. Functional Widgets

### `StepperForm.jsx`
Multi-step form stepper managing progress indicators, animations, back/next operations, and final submission.
- **Props**:
  - `steps` (Array of `{ label: String, component: React Element }`)
  - `onSubmit` (Function) - Final form submit callback.
- **Features**:
  - Handles page flow validations before moving to the next steps.
  - Controls progress bar overlays and numeric indicator state transitions.

### `FilterSidebar.jsx`
Search listing sidebar containing facet selectors.
- **Props**:
  - `filters` (Object) - Selection states.
  - `onChange` (Function) - Callback to update parent state.
- **Filters Managed**:
  - Categories (Checkboxes)
  - Difficulty Levels (Radio Group)
  - Price Range (Range Slider)
  - Tech Stack (Dynamic Tag Chips)

### `SearchToolbar.jsx`
Input and Sorting wrapper that directs querying parameters to project results.
- **Props**:
  - `query` (String) - Search input value.
  - `sortBy` (String) - Sort select value.
  - `onQueryChange` (Function)
  - `onSortChange` (Function)
