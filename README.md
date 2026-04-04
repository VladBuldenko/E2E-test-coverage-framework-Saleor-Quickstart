# Saleor Quickstart Test Automation Project

## About the Project
This project is focused on test automation for **Saleor Quickstart**, a ready-to-use test environment for an e-commerce application.

The repository contains **UI and API tests** that verify core user scenarios, key business logic, and application stability. The goal of this project is to demonstrate my skills in test automation, show my approach to building test coverage for a real web application, and highlight my experience with modern automation tools.

## Educational and Portfolio Purpose
This repository is created for **educational, research, and portfolio purposes only**.

It is used to study and demonstrate approaches to automated testing, test framework design, and quality assurance practices in a controlled local environment.

This project is **not intended for commercial use**, production deployment, or any activity that could negatively affect third-party systems or services. All tests are designed to run against a **locally deployed Saleor Quickstart environment** started by the user for learning and demonstration purposes.

## Disclaimer
Saleor Quickstart and all related components belong to their respective owners and maintainers.

This repository is an independent portfolio project and is **not affiliated with, endorsed by, or officially connected to the Saleor team**.

---

## Main Functionality of Saleor Quickstart
Saleor Quickstart provides a ready-to-use local e-commerce environment that includes the main parts of a real online store:

- GraphQL API
- Admin Dashboard
- Storefront
- Test email interface
- Payment service
- Supporting infrastructure such as databases and cache

---

## Test Types and Coverage
This project includes **UI testing**, **API testing**, and **smoke testing** for the main components of Saleor Quickstart:

- Dashboard
- Storefront
- GraphQL API

### UI Testing
UI tests are used to verify the main user flows in the **Dashboard** and **Storefront** through the browser.

These tests cover:
- login and authentication flows
- page visibility and navigation
- product browsing
- basic user interactions
- critical customer-facing scenarios

### API Testing
API tests are used to validate the **GraphQL API** that powers the application.

These tests cover:
- request and response validation
- response structure validation
- basic business logic checks
- data consistency
- negative scenarios

### Smoke Testing
Smoke tests provide a fast validation that the main application components are working correctly after startup or changes.

These checks focus on:
- Dashboard availability
- Storefront availability
- GraphQL API availability
- critical end-to-end flow readiness

---

## Functional Areas Covered by Tests
The automated tests are focused on the core e-commerce functionality of Saleor Quickstart, including:

- authentication and access to the Dashboard
- product-related flows in the Storefront
- basic API operations through GraphQL
- key business flows of the application
- basic stability checks of the main services

---

## Extended Test Coverage
The project may also include:

- **performance testing** to evaluate response time and stability under load
- **stress testing** to observe system behavior under high load
- **basic security testing** to perform baseline security checks of the application

---

## Project Structure
```bash
saleor-test-automation/
├── README.md
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
│
├── tests/
│   ├── ui/
│   │   ├── dashboard/
│   │   ├── storefront/
│   │   └── smoke/
│   ├── api/
│   │   ├── graphql/
│   │   └── smoke/
│   └── fixtures/
│
├── pages/
│   ├── dashboard/
│   └── storefront/
│
├── utils/
│   ├── api/
│   ├── config/
│   ├── data/
│   └── helpers/
│
├── test-data/
│   ├── users/
│   ├── products/
│   └── api/
│
├── docs/
│   ├── test-plan.md
│   ├── test-coverage.md
│   └── roadmap.md
│
└── .github/
    └── workflows/
        └── ci.yml


## Test Environment Setup

This automation project is designed to work with a separately cloned and locally deployed Saleor Quickstart environment.

Recommended local setup:

projects/
├── saleor-quickstart/         # application under test
└── saleor-test-automation/    # this test automation project
Important

The application under test and the test automation framework should be kept in separate directories.

saleor-quickstart contains the application
saleor-test-automation contains the automated tests

This makes the project cleaner, easier to maintain, and closer to a real-world automation setup.

##  Prerequisites

Before running the tests, make sure the following tools are installed:

Node.js
npm
Playwright
Git
A locally running Saleor Quickstart environment
Installation

## Clone this repository:

git clone <your-repository-url>
cd saleor-test-automation

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install
Environment Variables

Create a local environment file based on .env.example:

cp .env.example .env

Example .env file:

DASHBOARD_URL=http://localhost:9000
STOREFRONT_URL=http://localhost:3000
API_URL=http://localhost:8000/graphql/
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin
Running Saleor Quickstart

Before executing the tests, make sure Saleor Quickstart is cloned and started locally in a separate folder.

The tests in this repository are designed to run against that local environment.

## Test Execution
Run all tests
npx playwright test
Run UI tests
npx playwright test tests/ui
Run API tests
npx playwright test tests/api
Run smoke tests
npx playwright test --grep @smoke
Run tests in headed mode
npx playwright test --headed
Open Playwright HTML report
npx playwright show-report
Reporting

## Test execution results can include:

passed and failed test cases
execution logs
screenshots on failure
traces
HTML reports

These artifacts help analyze failures and improve test stability.

## Current Scope

The current focus of the project is:

basic UI automation
GraphQL API validation
smoke coverage for critical components
initial test framework structure
Future Improvements

Planned improvements for the project include:

deeper Dashboard functional coverage
broader Storefront coverage
reusable API client utilities
test data management improvements
CI/CD pipeline integration
performance testing
stress testing
baseline security testing
optional Python-based API test layer
Project Goals

This project is intended to demonstrate:

practical UI and API test automation skills
test framework design and structure
real-world test coverage approach
maintainable and scalable test organization
ability to work with modern automation tools in a portfolio-style project
Author

This repository is maintained as a personal test automation portfolio project focused on demonstrating practical QA Automation engineering skills.