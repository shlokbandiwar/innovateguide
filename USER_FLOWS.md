# User Flows Specification - InnovateGuide IT Project Marketplace

This document details user personas, core interaction flows, step-by-step wizard forms, checkout processes, and error validation states for the **InnovateGuide IT Project Marketplace**.

---

## 1. User Personas & Target Audiences

To validate navigation design decisions, two core customer personas are supported:

### A. The Project Buyer / Client (SME Owner, Project Manager)
*   **Need**: Discovering and purchasing production-ready templates, source code bases, or hiring developers for custom enhancements.
*   **Key Path**: Search → Filter by Stack → Inspect Product Page → Complete Checkout → Download Source Code. Or alternatively: Submit a Custom Project Request.

### B. The Project Seller / Developer (Freelancer, Tech Shop)
*   **Need**: Publishing pre-built software project templates to generate passive income.
*   **Key Path**: Upload Assets → Set Price & Tags → Publish Listing → Monitor Sales Performance Dashboard.

---

## 2. Core User Journeys

Here we blueprint the key interactive paths through sequence flows and steps.

### Journey 1: Discovery-to-Purchase Flow (Project Template Checkout)

This flow tracks a buyer searching for, selecting, and purchasing a pre-built project template.

```mermaid
sequenceDiagram
    actor Buyer as Client (Buyer)
    participant Browse as Browse Projects Page
    participant Product as Project Detail Page
    participant Cart as Checkout Drawer/Cart
    participant Gateway as Payment Gateway
    participant Success as Success Page / Download

    Buyer->>Browse: Enter query or filter categories
    Browse-->>Buyer: Dynamic filtered list of Project Cards
    Buyer->>Browse: Click Project Card
    Browse->>Product: Render specific product details
    Buyer->>Product: Click "Add to Cart / Buy Now"
    Product->>Cart: Open checkout drawer with item summary
    Buyer->>Cart: Click "Proceed to Checkout"
    Cart->>Gateway: Render Secure Stripe Mock Form
    Buyer->>Gateway: Fill Card Details & Click Pay
    Gateway-->>Cart: Payment Authorised
    Cart->>Success: Route to /success with downloadable zip link
```

---

### Journey 2: Multi-step Custom Project Request Flow

A cornerstone feature of InnovateGuide is the multi-step request wizard. The stepper must hold local field validation and update progress indicators dynamically.

```mermaid
graph TD
    Step1[Step 1: Project Overview] -->|Validate Description & Category| Step2[Step 2: Technical Specifications]
    Step2 -->|Validate Frameworks & Scope| Step3[Step 3: Budget & Timeline]
    Step3 -->|Validate Budget Ranges & Delivery Dates| Step4[Step 4: Review & Submit]
    
    subgraph Step 1 Controls
        S1_Desc[Text Area: Description]
        S1_Cat[Select Category Dropdown]
    end
    
    subgraph Step 2 Controls
        S2_Tags[Multiselect Tech Tags]
        S2_Upload[File Drag & Drop Attachment]
    end
    
    subgraph Step 3 Controls
        S3_Range[Budget Range Slider / Input]
        S3_Timeline[Select Timeline Picker]
    end
    
    subgraph Step 4 Controls
        S4_Review[Card Summary of inputs]
        S4_Terms[Checkbox Terms Confirmation]
        S4_Btn[Submit Button]
    end
```

#### Detailed Stepper Form Validation Rules

| Stepper Phase | Form Fields | Validation Rules | Error Recovery State |
| :--- | :--- | :--- | :--- |
| **1. Overview** | Title, Description, Core Category | Title length must be `>= 10` characters. Description must be `>= 50` characters. Category select is required. | Fields show red outline border with message: "Please detail your requirements to obtain accurate developer quotes." |
| **2. Tech Specs** | Frameworks, Target Platform, Scope document (Optional File) | Select at least `1` technology tag. Optional files must be `< 10MB` in PDF, DOCX, or ZIP. | Dynamic warning label shows: "Selecting specific stacks increases response rate by 40%." |
| **3. Budget & Timeline**| Target budget range, expected delivery date | Budget must be a positive number. Timeline date must be at least `7 days` in the future. | Soft validation warning triggers if budget is below `$100` for complex projects. |
| **4. Final Review** | Edit triggers for all fields, Terms acceptance check | Review and confirm terms check constraint. | Clicking "Submit" triggers full form submit animation. |

---

### Journey 3: Developer Project Listing Flow

This flow covers how a developer publishes a project template.

```mermaid
sequenceDiagram
    actor Developer
    participant Dashboard as Developer Portal
    participant Form as New Listing Form
    participant Preview as Preview Card Mockup
    participant DB as Marketplace Database

    Developer->>Dashboard: Click "Sell Project Template"
    Dashboard->>Form: Render Listing Editor
    Developer->>Form: Fill title, stack details, set price
    Form->>Preview: Update card mockup in real-time
    Developer->>Form: Drag & Drop Zip File & Screenshots
    Developer->>Form: Click "Publish Project"
    Form->>DB: Upload files and write metadata
    DB-->>Dashboard: Return "Success" with link to live page
```

---

## 3. Interactive States & Edge Cases

All paths throughout the site must handle the following UI visual states:

### A. Loading / Transition States
*   **Component Skeleton Loaders**: Standard gray pulse blocks match card container roundness metrics (`rounded-xl` or `16px`) to reduce layout shift during asynchronous fetches.
*   **Button Loading Toggles**: Clicking action buttons changes label text to a spinner animation and disables further clicks.

### B. Success & Confirmation Modals
*   **Checkout Completion**: Renders a glass-morphic modal displaying a visual transaction ID, invoice print button, and a prominent call-to-action button to download the purchased zip file.
*   **Custom Request Success**: Displays a clean stepper completion indicator alongside animated checkmark feedback.

### C. Error States & Fallbacks
*   **API Network Timeout**: Renders an alert box at the top of the card grids with a "Retry Connection" action button.
*   **Route Not Found (404)**: Renders a friendly "Project Lost in Orbit" page with returning navigation paths.
