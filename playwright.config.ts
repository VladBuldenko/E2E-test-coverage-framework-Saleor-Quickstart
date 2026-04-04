import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory that contains the test files.
  testDir: './tests',

  // Maximum time one test is allowed to run.
  timeout: 30_000,

  // Configuration for Playwright assertions.
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5_000,
  },

  // Controls whether all tests in all files can run fully in parallel.
  fullyParallel: false,

  // Fails the build on CI if test.only is accidentally committed.
  forbidOnly: !!process.env.CI,

  // Retries failed tests on CI only.
  retries: process.env.CI ? 2 : 0,

  // Limits the number of worker processes on CI for more predictable runs.
  workers: process.env.CI ? 1 : undefined,

  // Test reporters used during execution.
  reporter: [
    // Prints a live list of executed tests in the terminal.
    ['list'],

    // Generates an HTML report for post-run analysis.
    ['html', { open: 'never' }],
  ],

  use: {
    // Runs the browser in headless mode by default.
    headless: true,

    // Maximum time for each Playwright action such as click() or fill().
    actionTimeout: 10_000,

    // Maximum time for navigation-related operations such as page.goto().
    navigationTimeout: 15_000,

    // Captures a trace on the first retry for failed tests.
    trace: 'on-first-retry',

    // Captures screenshots only for failed tests.
    screenshot: 'only-on-failure',

    // Retains video only for failed tests.
    video: 'retain-on-failure',
  },
});