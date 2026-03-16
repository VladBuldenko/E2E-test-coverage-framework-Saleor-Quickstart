# Saleor Quickstart Test Automation Project

This project is focused on test automation for Saleor Quickstart, a ready-to-use test environment for an e-commerce application.
The repository contains UI and API tests that verify core user scenarios, key business logic, and application stability.
The goal of this project is to demonstrate my skills in test automation, show my approach to building test coverage for a real web application, and highlight my experience with modern automation tools.

Main functionality of Saleor Quickstart

Saleor Quickstart provides a ready-to-use local e-commerce environment that includes the main parts of a real online store: a GraphQL API, an admin dashboard, a storefront, a test email interface, a payment service, and the required infrastructure such as databases and cache.

Test Types and Coverage

This project includes UI testing, API testing, and smoke testing for the main components of Saleor Quickstart: the Dashboard, Storefront, and GraphQL API. Saleor Quickstart provides a local e-commerce environment with these core services, plus supporting components such as a payment service and test email interface.

UI Testing

UI tests are used to verify the main user flows in the Dashboard and Storefront through the browser. These tests cover actions such as login, navigation, product browsing, and other core interactions available in the e-commerce interface. The Storefront is the customer-facing application, while the Dashboard is used for store management.

API Testing

API tests are used to validate the GraphQL API that powers the application. They cover request and response validation, core business logic, data consistency, and negative scenarios. Saleor communicates through public and private GraphQL APIs, which makes API-level verification an important part of the test coverage.

Smoke Testing

Smoke tests provide a fast validation that the main application components are working correctly after startup or changes. These checks focus on the basic availability of the Dashboard, Storefront, and GraphQL API, as well as the most critical end-to-end flows.

Functional Areas Covered by Tests

The automated tests are focused on the core e-commerce functionality of Saleor Quickstart, including:

- authentication and access to the Dashboard
- product-related flows in the Storefront
- basic API operations through GraphQL
- key business flows of the application
- basic stability checks of the main services

Extended Test Coverage

The project may also include:
- performance testing to evaluate response time and stability under load
- stress testing to observe system behavior under high load
- basic security testing to perform baseline security checks of the application
