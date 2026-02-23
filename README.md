# Next.js Coding Sandbox

A Next.js 15 boilerplate with Tailwind v4, Bun test runner, and full CI/CD pipelines including security scanning and automated deployment to Vercel.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime / Package Manager | Bun |
| Styling | Tailwind CSS v4 |
| Testing | Bun test + Testing Library |
| Linting | ESLint + TypeScript |
| SCA | Snyk Open Source |
| SAST | Snyk Code + SonarCloud |
| Deployment | Vercel |

## Git Flow

The diagram below shows the current state of the repository's commit history and branch structure.

```mermaid
gitGraph
   commit id: "Initial commit"
   commit id: "Add Next.js 15 boilerplate + CI/CD"
   commit id: "Fix TypeScript errors"
   commit id: "Update deprecated CI actions"
   commit id: "Fix HIGH vulnerability"
   commit id: "Fix ESLint for Next.js 16"
   commit id: "Bump SonarQube scan to v6"
   commit id: "Configure SonarCloud"
   commit id: "fix(cd): add vercel.json"
   commit id: "feat(ci): add Snyk --report flag"
   commit id: "fix(ci): add Snyk --project-name"
   commit id: "demo: add code issues"
   commit id: "fix: resolve Snyk and SonarCloud"
   commit id: "fix(cd): harden CI gate" tag: "main" type: HIGHLIGHT

   branch claude/add-git-flow-diagram
   checkout claude/add-git-flow-diagram
   commit id: "docs: add git flow diagram to README" type: HIGHLIGHT
```

## CI/CD Pipeline

Every push to `main` or `develop` (and any pull request targeting those branches) triggers the CI pipeline. A successful CI run on `main` automatically triggers deployment to Vercel.

```mermaid
flowchart TD
    A([Push / Pull Request\nto main or develop]) --> LINT

    subgraph CI["CI Workflow (.github/workflows/ci.yml)"]
        direction TB
        LINT["Lint & Type Check\n· ESLint\n· tsc --noEmit"]
        TEST["Unit Tests & Coverage\n· bun test --coverage\n· Upload coverage artifact"]
        SCA["SCA — Snyk Open Source\n· Dependency vulnerability scan\n· Upload SARIF to Security tab"]
        BUILD["Build\n· bun run build\n· Upload .next artifact"]
        SAST["SAST — Snyk Code\n· Source code security scan\n· Upload SARIF to Security tab"]
        SONAR["SonarCloud Analysis\n· Static code quality\n· Uses coverage artifact"]

        LINT --> TEST
        LINT --> SCA
        LINT --> BUILD
        LINT --> SAST
        TEST --> SONAR
    end

    SONAR --> GATE{CI passed?}
    BUILD --> GATE
    SCA --> GATE
    SAST --> GATE

    GATE -- "No (any job failed)" --> BLOCK([Deploy blocked])
    GATE -- "Yes + event is push" --> CD

    subgraph CD["CD Workflow (.github/workflows/cd.yml)"]
        direction TB
        PULL["Pull Vercel environment info\n· vercel pull --environment=production"]
        VBUILD["Build via Vercel\n· vercel build --prod"]
        DEPLOY["Deploy prebuilt artifacts\n· vercel deploy --prebuilt --prod"]

        PULL --> VBUILD --> DEPLOY
    end

    CD --> LIVE([Production on Vercel])
```

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run tests
bun test

# Run tests with coverage
bun run test:coverage

# Lint
bun run lint

# Type check
bun run type-check

# Build
bun run build
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml      # Lint → Test / SCA / Build / SAST → SonarCloud
│       └── cd.yml      # Deploy to Vercel (triggered by CI success on main)
├── config/
│   ├── bun.d.ts                 # Bun + Testing Library type declarations
│   ├── playwright.config.ts     # Playwright E2E test configuration
│   ├── sonar-project.properties # SonarCloud project configuration
│   └── test.setup.ts            # Bun test environment setup (jsdom + matchers)
├── src/
│   └── app/            # Next.js App Router pages and components
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── vercel.json
└── package.json
```

## License

[MIT](./LICENSE)
