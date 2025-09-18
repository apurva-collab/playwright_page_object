import { test, expect } from '@playwright/test';
import { Loginpage } from '../pages/loginswag';
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL_SWAGLABS!)
  const login = new Loginpage(page);
  await login.login(process.env.USERNAME_SWAG!, process.env.PASSWORD_SWAG!)
  await expect(page).toHaveURL(process.env.REDIRECTED_URL_SWAG!)
})
test('login using valid cred', async ({ page }) => {
  await expect(page.locator('.shopping_cart_link')).toBeVisible()
})
test('logout after entering cred', async ({ page }) => {
  await page.click('#react-burger-menu-btn')
  await page.click('#logout_sidebar_link')
  await expect(page).toHaveURL(process.env.REDIRECTED_URL_SWAG_LOGOUT!)
})
test.describe('add to cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('.shopping_cart_link').click()
})
test('verify item is added to cart', async ({ page }) => {
    await expect(page.locator('.cart_item')).toHaveCount(1)
})
test('remove item from cart', async ({ page }) => {
    await page.locator('#remove-sauce-labs-backpack').click()
    await expect(page.locator('.cart_item')).toHaveCount(0)
  })
})
test.describe('checkout from cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('.shopping_cart_link').click()
    await page.locator('#checkout').click()
    await page.fill('#first-name', process.env.USERNAME!)
    await page.fill('#last-name', process.env.PASSWORD!)
    await page.fill('#postal-code', '200200')
    await page.click('#continue')
    await expect(page).toHaveURL(process.env.REDIRECTED_URL_SWAG_CHECKOUT!)
    await page.click('#finish')
})
test('checkout from cart', async ({ page }) => {
    
    await expect(page).toHaveURL(process.env.REDIRECTED_URL_SWAG_CHECKOUT_COMPLETE!)
})
test('checkout from cart and return back to home page', async ({ page }) => {
    await page.click('#back-to-products')
    await expect(page).toHaveURL(process.env.REDIRECTED_URL_SWAG!)
  })
})
