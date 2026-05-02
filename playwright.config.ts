import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load environment variables from .env file.
 * This is a best practice for Senior-level projects to avoid hardcoding environment-specific data.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',
  
  // Maximum time for one test (30 seconds)
  timeout: 30_000,
  
  // Configuration for assertions
  expect: { timeout: 5_000 },
  
  // Enable parallel execution to speed up test runs
  fullyParallel: true, 
  
  // Fail the build on CI if test.only is present in the code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI to handle flakiness
  retries: process.env.CI ? 2 : 0,
  
  // Limit workers on CI for better stability
  workers: process.env.CI ? 2 : undefined,

  // Test execution reporters
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    // Add GitHub Actions reporter to show test failures directly in the PR
    process.env.CI ? ['github'] : ['list'],
  ],

  use: {
    // Standard execution settings
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Default base URL for navigation (points to Saleor API by default)
    baseURL: process.env.BASE_URL,
  },

  /**
   * Projects configuration allows running tests in different browsers
   * or targeting specific application environments (Storefront vs Dashboard).
   */
  projects: [
    {
      name: 'storefront-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // Overriding baseURL for Storefront specific tests
        baseURL: process.env.STOREFRONT_URL,
      },
      testMatch: /.*storefront.*/,
    },
    {
      name: 'dashboard-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // Overriding baseURL for Dashboard specific tests
        baseURL: process.env.DASHBOARD_URL,
      },
      testMatch: /.*dashboard.*/,
    },
    /**
     * API tests target the Core GraphQL API directly.
     * Use this project for backend-level validation.
     */
    {
      name: 'api-tests',
      testMatch: /.*api.*/,
      use: {
        // Pointing directly to the GraphQL endpoint
        baseURL: process.env.BASE_URL,
      }
    },
  ],
});