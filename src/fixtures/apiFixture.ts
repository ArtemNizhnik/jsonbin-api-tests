import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

type ApiFixture = {
  apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixture>({
  apiContext: async ({ playwright }, use) => {
  const context = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'X-Master-Key': process.env.JSONBIN_API_KEY!,
      'Content-Type': 'application/json'
    }
  });

  await use(context);
},
});
export const expect = test.expect;