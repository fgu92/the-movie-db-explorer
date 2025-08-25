# The Movie DB Explorer

A modern web application for exploring movies and TV shows using The Movie Database (TMDB) API. Built with Next.js 15, React 19, and TypeScript.

![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## Features

- Search movies and TV shows
- Multi-language support (English/French)
- Responsive design with Tailwind CSS
- Server-side rendering with Next.js
- Real-time search with debouncing
- Pagination support
- Comprehensive test coverage with Vitest

## Tech Stack

### Frontend Framework

- **Next.js 15.5.0**
  - Full-stack React framework with the new App Router architecture
  - Server Components for improved performance and SEO
  - Built-in optimizations: automatic code splitting, image optimization, font optimization
  - File-based routing system for intuitive navigation structure
  - API routes for backend functionality
  - Static Site Generation (SSG) and Server-Side Rendering (SSR) capabilities

### UI Library & Language

- **React 19.1.0**
  - Latest React with concurrent features for better user experience
  - Automatic batching for improved performance
  - Suspense boundaries for better loading states
  - Enhanced server components integration
  - Improved hydration process

- **TypeScript 5**
  - Static type checking prevents runtime errors
  - Enhanced IDE support with intelligent code completion
  - Better refactoring capabilities and code navigation
  - Improved code documentation through type definitions
  - Easier maintenance and collaboration in team environments

### Styling & UI Components

- **Tailwind CSS 4**
  - Utility-first approach for rapid development
  - Consistent design system with predefined spacing, colors, and typography
  - Tree-shaking removes unused CSS for smaller bundle sizes
  - Responsive design utilities for mobile-first development
  - Dark mode support and custom theming capabilities

- **clsx 2.1.1**
  - Lightweight utility for conditional CSS class names
  - Clean and readable conditional styling logic
  - TypeScript support for better developer experience

- **Heroicons 2.2.0**
  - Professionally designed SVG icon library
  - Tree-shakable icons for optimal bundle size
  - Consistent visual language across the application
  - Available in multiple styles (outline, solid, mini)

### Internationalization

- **next-intl 4.3.5**
  - Type-safe translations with TypeScript integration
  - Server-side rendering support for SEO benefits
  - Automatic locale detection and routing
  - Pluralization rules for different languages
  - Message formatting with variables and rich text support
  - Built-in date, time, and number formatting

### Performance Optimization

- **use-debounce 10.0.5**
  - Prevents excessive API calls during user input
  - Improves application performance and user experience
  - Reduces server load and API costs
  - Customizable delay configuration
  - React hooks integration for clean component logic

### Testing Framework

- **Vitest 3.2.4**
  - Native ES modules support without additional configuration
  - Built-in TypeScript support without setup overhead
  - Jest-compatible API for easy migration
  - Instant feedback with watch mode and HMR
  - Parallel test execution for faster test runs
  - Built-in code coverage reporting

- **Testing Library Ecosystem**
  - `@testing-library/react 16.3.0` - Component testing utilities focused on user behavior
  - `@testing-library/jest-dom 6.8.0` - Custom matchers for better assertions
  - `@testing-library/user-event 14.6.1` - Realistic user interaction simulation
  - `jsdom 26.1.0` - Browser environment simulation for Node.js testing

### Code Quality & Formatting

- **ESLint 9**
  - Static code analysis for catching potential bugs
  - Enforces consistent coding standards across the project
  - Next.js specific rules for best practices
  - Integration with TypeScript for type-aware linting
  - Customizable rules for team preferences

- **Prettier 3.6.2**
  - Automatic code formatting for consistent style
  - Integration with popular editors and IDEs
  - Reduces time spent on code review discussions about formatting
  - Supports multiple file formats (JS, TS, CSS, Markdown, etc.)

### Package Management

- **pnpm**
  - Faster installation compared to npm/yarn through hard linking
  - Strict dependency resolution prevents phantom dependencies
  - Efficient disk space usage with global store
  - Monorepo support with workspace functionality
  - Built-in support for peer dependencies

## Prerequisites

Before getting started, you'll need:

- A [TMDB (The Movie Database)](https://www.themoviedb.org/) account
- TMDB API key (get it from your [TMDB API settings](https://www.themoviedb.org/settings/api))
- Node.js 18+ (recommended)
- pnpm package manager

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/fgu92/the-movie-db-explorer.git
cd the-movie-db-explorer
```

### 2. Install Node.js with NVM (if not already installed)

#### Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

After installation, close and reopen your terminal, or run:

```bash
source ~/.bashrc
nvm --version
```

#### Install Node.js:

```bash
nvm install --lts
node --version
npm --version
```

### 3. Install pnpm

```bash
npm install -g pnpm
```

### 4. Install dependencies

```bash
pnpm install
```

### 5. Configure environment variables

Create the `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file and replace the placeholder values with your actual configuration:

```env
TMDB_API_KEY="your_actual_tmdb_api_key_here"
TMDB_BASE_URL="https://api.themoviedb.org/3"
TMDB_IMAGES_BASE_URL="https://www.themoviedb.org/t/p"
TMDB_LANGUAGE="fr-FR"
TMDB_VOTE_COUNT_GTE=100
```

## Available Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `pnpm dev`           | Start development server on http://localhost:3000 |
| `pnpm build`         | Build the application for production              |
| `pnpm start`         | Start the production server                       |
| `pnpm lint`          | Run ESLint to check code quality                  |
| `pnpm format`        | Format code with Prettier                         |
| `pnpm format:check`  | Check if code is properly formatted               |
| `pnpm test`          | Run all tests once                                |
| `pnpm test:watch`    | Run tests in watch mode                           |
| `pnpm test:coverage` | Run tests with coverage report                    |

## Getting Started

1. Follow the installation steps above
2. Start the development server:
   ```bash
   pnpm dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser
4. Start exploring movies and TV shows

## Environment Variables

| Variable               | Description                        | Required | Example                            | Default |
| ---------------------- | ---------------------------------- | -------- | ---------------------------------- | ------- |
| `TMDB_API_KEY`         | Your TMDB API key                  | Yes      | `edec32524208db2f823e23dd3adf2e22` |         |
| `TMDB_BASE_URL`        | TMDB API base URL                  | Yes      | `https://api.themoviedb.org/3`     |         |
| `TMDB_IMAGES_BASE_URL` | TMDB images base URL               | Yes      | `https://www.themoviedb.org/t/p`   |         |
| `TMDB_LANGUAGE`        | Default language for API responses | No       | `en-US`                            | `fr-FR` |
| `TMDB_VOTE_COUNT_GTE`  | Minimum vote count filter          | No       | `10`                               | `100`   |

### Getting your TMDB API Key

1. Create an account on [The Movie Database](https://www.themoviedb.org/)
2. Go to your account settings
3. Navigate to the "API" section
4. Request a new API key (choose "Developer" for personal use)
5. Copy your API key and paste it in your `.env` file

## Project Structure

```
the-movie-db-explorer-project/
├── .next/                   # Next.js build files
├── coverage/                # Test coverage reports
├── messages/                # Message files (i18n)
├── node_modules/            # Project dependencies
├── public/                  # Static files (images, fonts, etc.)
├── src/
│   ├── app/                 # Main Next.js application directory
│   │   ├── [locale]/        # Localization handling (i18n)
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── layout.tsx   # Main layout
│   │   │   └── ...
│   │   └── ...
│   ├── lib/
│   │   ├── types/           # TypeScript type definitions
│   │   ├── data.ts          # Data-related functions
│   │   ├── utils.ts         # Utility functions
│   │   └── ...
│   ├── ui/                  # React components
│   │   ├── assets/          # Icons, images, and assets
│   │   └── ...
│   ├── middleware.ts        # Next.js middleware (e.g., localization handling)
│   └── ...
├── .env.example             # Example environment variables file
├── .env.test                # Environment variables for testing
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignored files
├── next.config.ts           # Next.js configuration
├── package.json             # npm dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vitest.config.ts         # Vitest configuration
└── README.md                # Project documentation
```

## Testing

The project uses Vitest and Testing Library for comprehensive testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
