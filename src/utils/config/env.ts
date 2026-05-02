import 'dotenv/config';

/**
 * Global Environment Configuration.
 * Centralizes all process.env calls to provide validation and autocomplete.
 */
export const ENV = {
  // API URL берем из BASE_URL, который прописан в твоем .env
  API_URL: process.env.BASE_URL || 'http://localhost:8000/graphql/',
  
  // URL фронтенда (если понадобится для UI тестов)
  STOREFRONT_URL: process.env.STOREFRONT_URL || 'http://localhost:30000',
  DASHBOARD_URL: process.env.DASHBOARD_URL || 'http://localhost:9000',

  // Админские креды
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin',

  // Настройки таймаутов
  COMMAND_TIMEOUT: parseInt(process.env.COMMAND_TIMEOUT || '30000', 10),
};

// Simple validation to ensure critical variables are present during startup
if (!ENV.ADMIN_EMAIL || !ENV.ADMIN_PASSWORD) {
  console.warn('⚠️ WARNING: Admin credentials are not fully set in .env file!');
}