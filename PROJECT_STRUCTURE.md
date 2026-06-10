# Project Architecture and Directory Structure: InnovateGuide

This document details the exact directory layout, files generated, dependencies, and code configuration for the React + Vite codebase.

---

## 1. Directory Tree Generated

```
innovative-antigravity/
├── public/
│   └── favicon.svg           # Application favicon
├── src/
│   ├── assets/               # Branding graphics, icons, and SVG backgrounds
│   ├── components/           # Reusable functional UI primitives
│   │   ├── common/           
│   │   │   └── PageLoader.jsx # Dynamic skeleton spinner wrapper for lazy loading
│   │   └── layout/           
│   │       ├── BottomNavBar.jsx # Persistent fixed bottom menu dock for mobile layout
│   │       ├── Footer.jsx     # Detailed sitemap footer column layout for desktop
│   │       └── TopAppBar.jsx  # Responsive top header navigation menu
│   ├── context/              # Truly global shared contexts
│   │   ├── AuthContext.jsx   # Global user login / session state using standard Context Provider
│   │   └── ThemeContext.jsx  # Global theme selector (Light / Dark mode)
│   ├── data/                 # Static data constants and mocks
│   │   └── mockData.js       # Raw categories, project details lists, and FAQ lists
│   ├── hooks/                # Custom React hooks
│   │   └── useDebounce.js    # Debounce utility for active keyword filtering
│   ├── layouts/              # Routing viewport layouts
│   │   └── MainLayout.jsx    # Structural framework rendering TopAppBar, Footer, and Outlet
│   ├── pages/                # Route components (lazy-loaded skeletons)
│   │   ├── AboutUs.jsx
│   │   ├── BrowseProjects.jsx
│   │   ├── ContactUs.jsx
│   │   ├── CustomRequest.jsx
│   │   ├── FAQPage.jsx
│   │   ├── Homepage.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LoginMock.jsx
│   │   ├── NotFound.jsx
│   │   └── ProjectDetails.jsx
│   ├── services/             # API data access layer
│   │   ├── categoriesService.js # Fetches categories metadata
│   │   ├── customRequestService.js # Simulates custom project request submissions
│   │   └── projectsService.js # Handles filter queries, budget calculations, and tags matching
│   ├── styles/               # Styling configuration sheets
│   │   └── index.css         # Tailwind styles & font bindings
│   ├── utils/                # Helper tools
│   │   └── validation.js     # Form input validation rules
│   ├── App.jsx               # Main React entry router (BrowserRouter layout)
│   └── main.jsx              # React DOM mounting and StrictMode wrapper
├── package.json              # Main dependencies list (React 18, React Router DOM v6.28)
├── tailwind.config.js        # Design tokens and themes mapping
├── vite.config.js            # Vite configurations
└── README.md
```

---

## 2. File-by-File Purpose

### Root Configurations
*   **`package.json`**: Package configuration specifying React 18, React DOM, Vite builder, Tailwind CSS, and React Router DOM.
*   **`vite.config.js`**: Vite development config. Sets local port to `3000` and activates browser open triggers.
*   **`tailwind.config.js`**: Registers custom design tokens including primary Navy (`#003d58`), secondary Red-Orange (`#ad3300`), default container spacing, and Plus Jakarta Sans typography.
*   **`index.html`**: Host template containing metadata tags, pre-cached Google Fonts, and Google Material Icons.

### Services Layer (`src/services/`)
*   **`projectsService.js`**: Simulated async database search queries. Handles matching search query terms, categorizing tag parameters, ordering lists (price-asc, price-desc, trending), and bounding prices (budgetMin/budgetMax).
*   **`categoriesService.js`**: Simulated database fetches for active category item lists.
*   **`customRequestService.js`**: Handles simulated multi-step stepper submission payloads.

### Contexts & Hooks (`src/context/` & `src/hooks/`)
*   **`AuthContext.jsx`**: Global authentication layer saving local mock sessions to localStorage and exporting a customized `useAuth` hook.
*   **`ThemeContext.jsx`**: Handles site dark-mode settings and toggles the `dark` class dynamically.
*   **`useDebounce.js`**: Optimization hook to delay search query filtering events.

### Page & Layout Skeletons (`src/pages/` & `src/layouts/`)
*   **`MainLayout.jsx`**: Handles layout structural framework based on viewport dimensions.
*   **Page Skeletons**: Standard exports (e.g. `Homepage.jsx`, `BrowseProjects.jsx`, `ProjectDetails.jsx`, `SellProject.jsx`, `CustomRequest.jsx`, `AboutUs.jsx`, `HowItWorks.jsx`, `FAQPage.jsx`, `ContactUs.jsx`, `LoginMock.jsx`, `NotFound.jsx`) configured for code-split lazy loading.
