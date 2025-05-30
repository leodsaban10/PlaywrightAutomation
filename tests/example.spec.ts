import { test, expect } from '@playwright/test';


async function loginWithValidCredentials(page) {
  await page.goto("/");
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Products')).toBeVisible();
}

test('login with valid credentials', async ({ page }) => {
  await loginWithValidCredentials(page);
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();  
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Add to cart and secure checkout', async ({page}) => {
  await loginWithValidCredentials(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

test('Accurate product information', async ({page}) => {
  await loginWithValidCredentials(page);
  await page.getByText('Sauce Labs Backpack').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByAltText('Sauce Labs Backpack')).toBeVisible();
});
