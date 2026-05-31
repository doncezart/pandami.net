import { test, expect } from '@playwright/test';

test('homepage has JSON-LD structured data', async ({ page }) => {
  await page.goto('/');
  const ldJson = await page.$('script[type="application/ld+json"]');
  expect(ldJson).not.toBeNull();
  const content = await ldJson!.textContent();
  const data = JSON.parse(content!);
  expect(data['@type']).toBe('ProfessionalService');
  expect(data.name).toBe('Pandami');
});
