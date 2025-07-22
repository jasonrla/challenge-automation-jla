# Challenge Automation Framework

## Overview

This project is an automation testing framework built with Playwright. It includes both API and UI tests for demonstrating automation capabilities. The framework is designed to test Pokemon-related APIs and UI interactions, as well as JSONPlaceholder API endpoints.

## Table of Contents

- [Challenge Automation Framework](#challenge-automation-framework)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Running Tests](#running-tests)
    - [Running Tests in Different Environments](#running-tests-in-different-environments)
    - [Viewing Test Report](#viewing-test-report)
  - [Test Data](#test-data)
  - [Fixtures](#fixtures)
  - [Models](#models)
  - [Services](#services)
  - [Pages](#pages)
  - [Utilities](#utilities)
  - [CI/CD Integration](#cicd-integration)
  - [Test Implementation Details](#test-implementation-details)
    - [API Tests](#api-tests)
      - [Pokemon API Test](#pokemon-api-test)
      - [JSONPlaceholder API Test](#jsonplaceholder-api-test)
    - [UI Tests](#ui-tests)
      - [Wikipedia Pokemon Test](#wikipedia-pokemon-test)

## Prerequisites

- Node.js (v22)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jasonrla/challenge-automation-jla.git
cd challenge-automation-jla
```

2. Install dependencies:

```bash
npm install
```

1. Install Playwright:

```bash
npx playwright install
```

4. Set up environment variables:

```bash
cp .env.example .env.qa
cp .env.example .env.cert
```

The project supports multiple environments (QA and CERT) with different configuration files:

- `.env.qa` - Configuration for QA environment
- `.env.cert` - Configuration for CERT environment

Edit the `.env` files and add their specific SECRET_KEY

## Project Structure

```
├── .github/workflows/    # GitHub Actions workflows for CI/CD
├── data/                 # Test data files
├── fixtures/             # Playwright fixtures
├── models/               # Data models
├── pages/                # Page Object Models
├── services/             # API service clients
├── tests/                # Test files
│   ├── api/              # API tests
│   └── ui/               # UI tests
├── utils/                # Utility functions
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
├── playwright.config.ts  # Playwright configuration
└── README.md             # Project documentation
```

## Running Tests

### Running Tests in Different Environments

The project supports running tests in different environments:

```bash
# Run tests in QA environment
npm run test:qa

# Run tests in CERT environment
npm run test:cert
```

These commands use the corresponding environment variables from `.env.qa` and `.env.cert` files.

### Viewing Test Report

```bash
npm run report
```

## Test Data

Test data is stored in the `data/` directory. The project uses Excel files for test data management:

- `Challenge automation - Datos-pruebas.xlsx`: Contains Pokemon test data

The `excelReader.ts` utility is used to read and parse this data for tests. The Excel file is loaded once and stored in a variable to avoid loading it multiple times during test execution.

## Fixtures

The project uses Playwright fixtures to set up test contexts and share common functionality:

- `api-context.fixture.ts`: Sets up API test context
- `auth.fixture.ts`: Handles authentication and SECRET KEY encryption (using SHA256)
- `ui-context.fixture.ts`: Sets up UI test context

Fixtures are used instead of `beforeEach` hooks for better test organization and reusability.

## Models

Data models are defined in the `models/` directory:

- `jsonplaceholder-model.ts`: Models for JSONPlaceholder API data
- `pokemon-excel-row-model.ts`: Model for Pokemon data from Excel

## Services

API service clients are defined in the `services/` directory:

- `JsonPlaceholderApi.ts`: Client for JSONPlaceholder API
- `PokemonApi.ts`: Client for Pokemon API

## Pages

The project follows the Page Object Model (POM) design pattern. Page Objects are defined in the `pages/` directory:

- `PokemonPage.ts`: Page object for Pokemon UI interactions

## Utilities

Utility functions are defined in the `utils/` directory:

- `capitalizeFirstLetter.ts`: Utility for string capitalization
- `encrypt.ts`: Encryption utilities for SECRET KEY (SHA256)
- `ensureImagesDir.ts`: Ensures image directories exist for UI tests
- `excelReader.ts`: Reads and parses Excel files
- `getPokemonData.ts`: Retrieves Pokemon data
- `loadEnv.ts`: Loads environment variables
- `pokemonUtils.ts`: Pokemon-specific utilities

## CI/CD Integration

The project includes GitHub Actions workflows in the `.github/workflows/` directory:

- `playwright.yml`: Runs Playwright tests on push and pull requests to the master branch

The CI workflow is configured to run tests in both environments (QA and CERT) using an environment matrix:

```yaml
strategy:
  matrix:
    environment: [qa, cert]

environment: ${{ matrix.environment }}
```

Environment variables and secrets are configured in GitHub:

1. **Environment Secrets**:
   - `SECRET_KEY`: The secret key specific to each environment (QA and CERT)

2. **Environment Variables**:
   - `JSON_PLACEHOLDER_BASE_URL`: Base URL for the JSONPlaceholder API
   - `POKEMON_EXCEL_PATH`: Path to the test data Excel file
   - `POKEMON_API_BASE_URL`: Base URL for the Pokemon API
   - `POKEMON_WIKI_URL`: Base URL for the Pokemon wiki

These variables and secrets are configured in GitHub environments and are used during test execution in the CI pipeline.

The workflow runs environment-specific tests using the command:

```yaml
- name: Run Playwright tests
  run: npm run test:${{ matrix.environment }}
```

This will execute either `npm run test:qa` or `npm run test:cert` depending on the environment in the matrix, using the environment variables and secrets corresponding to each environment.

## Test Implementation Details

### API Tests

#### Pokemon API Test

1. Reads test data from the Excel file "Challenge automation - Datos-pruebas.xlsx"
2. Logs the encrypted SECRET KEY (SHA256) before each test
3. Makes GET requests to `https://pokeapi.co/api/v2/pokemon/{id or name}`
4. Validates:
   - Pokemon ID, name, and abilities
   - Response time is less than 10 seconds
5. Logs date and time at the end of each test

#### JSONPlaceholder API Test

1. Logs the encrypted SECRET KEY (SHA256) before each test
2. Makes POST requests to `https://jsonplaceholder.typicode.com/posts`
3. Performs appropriate assertions
4. Logs date and time at the end of each test

### UI Tests

#### Wikipedia Pokemon Test

1. Reads test data from the Excel file "Challenge automation - Datos-pruebas.xlsx"
2. Logs the encrypted SECRET KEY (SHA256) before each test
3. Navigates to `https://en.wikipedia.org/wiki/{pokemonName}`
4. Validates the page title
5. Logs who created the drawing
6. Downloads the image to the "images" folder:
   - Creates the folder if it doesn't exist
   - Interacts with web elements to download (not hardcoded URLs)
   - Overwrites existing files with the same name
