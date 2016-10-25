## Features

- **dev tooling**
    - Bundle-free development environment
    - Short and sweet time-to-dev (see [Getting Started](#getting-started) below)
    - Babel for on-the-fly component transpilation
    - react-transform-hmr for hot component reloading
    - jspm + SystemJS for client-side module resolving
    - Karma + Mocha + Chai + Sinon for unit tests
    - Istanbul for code coverage
    - Protractor + Mocha + Chai for e2e integration tests
    - eslint for static code analysis
- **client**
    - React + React Router on the cilent and server
    - Route-based lazy component loading with React Router + jspm
    - Radium for inline styling
    - Helmet for managing your document head
    - React Metrics for tracking analytics
    - Store-agnostic Prefetching for client data hydration
- **server**
    - Loads client dependencies from a centralized location (no more per-project bundles)
    - Koa + (optional) HTTP2 for fast file serving
    - TLS-only via secure HTTP
    - Optimized production workflow