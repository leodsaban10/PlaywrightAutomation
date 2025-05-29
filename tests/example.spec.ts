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

test('secure checkout', async ({page}) => {
  // Login first
  await loginWithValidCredentials(page);
  
  // Add first item to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  
  // Go to cart
  await page.getByTestId('shopping_cart_link').click();
  
  // Verify item is in cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  
  // Start checkout process
  await page.getByTestId('checkout').click();
  
  // Fill checkout information
  await page.getByTestId('firstName').fill('John');
  await page.getByTestId('lastName').fill('Doe');
  await page.getByTestId('postalCode').fill('12345');
  
  // Continue to overview
  await page.getByTestId('continue').click();
  
  // Verify we're on the overview page
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  
  // Complete purchase
  await page.getByTestId('finish').click();
  
  // Verify order completion
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});


