# Research Data Management Labs (rdm-labs)

[![Open Science](https://img.shields.io/badge/Open-Science-0ea5e9?style=flat&logo=databricks&logoColor=white)](https://www.movebank.org)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031?style=flat&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Pages Deployment](https://img.shields.io/badge/Cloudflare-Pages-000?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

Interactive scientific hub for animal tracking, spatial-temporal migration playback and multidimensional bio-telemetry data visualization

---

## 🌌 Architecture & Data Flow

- **Hub & Spoke Pattern:** The main hub aggregates independent research portals hosted on isolated edge domains.
- **Decoupled JSON Manifests:**
  - `public/data/projects.json` contains the lightweight catalog for the main landing page grid.
  - `public/data/{id}.json` contains full technical specifications and deep-dive descriptions fetched dynamically via Angular services when viewing a specific project route (`/project/:id`).

---

## 🚀 Live Demo

🔗 **[View Live Application on Cloudflare Pages](https://psychophysiology.pages.dev)**

## 🛠️ Tech Stack

- **Framework:** This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.7 (Standalone architecture, Signals API)
- **Language:** TypeScript
- **Styles:** SCSS (Custom cosmic theme, CSS Grid, fluid typography)
- **Networking:** Angular `HttpClient`, RxJS streams (`map`, `catchError`, `of`)
- **Hosting & CI/CD:** Cloudflare Pages [https://rdm-labs.pages.dev/](https://rdm-labs.pages.dev/)

---

## 📂 Project Structure

```text
rdm-labs/
├── public/
│   ├── *.png                     # ico, img
│   └── data/
│       ├── projects.json         # Main catalog manifest for the landing page
│       └── moverdm-explorer.json # Detailed metadata for individual projects
├── src/
   ├── app/
   │     ├── core/
   │     │   ├── models/          # TypeScript interfaces (project.model.ts)
   │     │   └── services/        # Data ingestion service (project.service.ts)
   │     ├── features/            # Home & Project Detail components
   │     └── app.routing.ts       # SPA routing configuration
   ├── index.html
   ├── main.ts
   └── styles.scss
```

---

## 🚀 Getting Started Locally

To run this repository locally on your machine, follow these steps:

**Clone the repository & Install dependencies**

```bash
   git clone git@github.com:wixhub/rdm-labs.git

   cd rdm-labs

   npm install
```

**Development server**

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
