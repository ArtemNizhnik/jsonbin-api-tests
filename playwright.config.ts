import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://api.jsonbin.io';

export default defineConfig({
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: {
  'X-Master-Key': process.env.JSONBIN_API_KEY as string,
  'Content-Type': 'application/json'
}
  }
});