import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

type ApiFixture = {
  apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixture>({
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      extraHTTPHeaders: {
      'X-Master-Key': process.env.MASTER_KEY || '',
      'Content-Type': 'application/json',
    },
  });

  await use(apiContext);
},
});
export const expect = test.expect;