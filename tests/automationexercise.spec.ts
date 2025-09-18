import { test, expect } from '@playwright/test'
import { Loginpage } from '../pages/exercise'
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });
dotenv.config();
console.log('BASE_URL_AUTOMATION_EXERCISE:', process.env.BASE_URL_AUTOMATION_EXERCISE)
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL_AUTOMATION_EXERCISE!)
})
test.only('Test Case 1: Register User and delete newly created user', async ({ page }) => {
    await page.locator('a:has-text("Signup / Login")').click()
    await page.fill('[data-qa="signup-name"]',process.env.USERNAME!)
    await page.goto(process.env.BASE_URL_AUTOMATION_EXERCISE!)
    await page.fill('[data-qa="signup-email"]',process.env.SIGNUP_EMAIL_AUTOMATION_EXERCISE_REGISTER!)
    await page.locator('[data-qa="signup-button"]').click()
    await page.click('#uniform-id_gender1')
    await page.fill('[data-qa="password"]',process.env.PASSWORD!)
    await page.selectOption('[data-qa="days"]', process.env.AUTOMATION_EXERCISE_DAYS!)
    await page.selectOption('[data-qa="months"]',process.env.AUTOMATION_EXERCISE_MONTH!)
    await page.selectOption('[data-qa="years"]',process.env.AUTOMATION_EXERCISE_YEAR!)
    await page.fill('[data-qa="first_name"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="last_name"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="address"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="state"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="city"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="zipcode"]',process.env.PASSWORD_INCORRECT!)
    await page.fill('[data-qa="mobile_number"]',process.env.PASSWORD_INCORRECT!)
    await page.click('[data-qa="create-account"]')
    await expect(page).toHaveURL(process.env.REDIRECTED_URL_AUTOMATION_EXERCISE_REGISTER!)
    await page.click('[data-qa="continue-button"]')
    await expect(page).toHaveURL(process.env.BASE_URL_AUTOMATION_EXERCISE!)
    await page.getByRole('link', { name: 'Delete Account' }).click()
    await expect(page).toHaveURL(process.env.REDIRECTED_URL_AUTOMATION_EXERCISE_DELETE_USER!)
    await page.click('[data-qa="continue-button"]')
    await page.waitForURL(process.env.BASE_URL_AUTOMATION_EXERCISE!)
})
test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    await page.locator('a:has-text("Signup / Login")').click()
    await page.fill('[data-qa="login-email"]',process.env.USERNAME_AUTOMATION_EXERCISE_LOGIN!)
    await page.fill('[data-qa="login-password"]',process.env.PASSWORD_AUTOMATION_EXERCISE_LOGIN!)
    await page.click('[data-qa="login-button"]')
    await page.waitForURL(process.env.BASE_URL_AUTOMATION_EXERCISE!)
})
test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    await page.locator('a:has-text("Signup / Login")').click()
    await page.fill('[data-qa="login-email"]',process.env.USERNAME_AUTOMATION_EXERCISE_LOGIN!)
    await page.fill('[data-qa="login-password"]',process.env.PASSWORD_INCORRECT!)
    await page.click('[data-qa="login-button"]')
    await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible()
    await expect(page).toHaveURL(/.*login.*/)
})
test('Test Case 4: Logout User', async ({ page }) => {
    await page.locator('a:has-text("Signup / Login")').click()
    await page.fill('[data-qa="login-email"]',process.env.USERNAME_AUTOMATION_EXERCISE_LOGIN!)
    await page.fill('[data-qa="login-password"]',process.env.PASSWORD_AUTOMATION_EXERCISE_LOGIN!)
    await page.click('[data-qa="login-button"]')
    await page.waitForURL(process.env.BASE_URL_AUTOMATION_EXERCISE!)
    await page.getByRole('link', { name: ' Logout' }).click()
    await expect(page).toHaveURL(/.*login.*/)
})
test('Test Case 5: Register User with existing email , it should throw error', async ({ page }) => {
    await page.locator('a:has-text("Signup / Login")').click()
    await page.fill('[data-qa="signup-name"]',process.env.USERNAME!)
    await page.fill('[data-qa="signup-email"]',process.env.USERNAME_AUTOMATION_EXERCISE_LOGIN!)
    await page.locator('[data-qa="signup-button"]').click()
    await expect(page.locator('text=Email Address already exist!')).toBeVisible()
})
test('Test Case 6: Contact Us Form', async ({ page }) => {
    await page.locator('a:has-text("Contact us")').click()
    await page.fill('[data-qa="name"]',process.env.USERNAME!)
    await page.fill('[data-qa="email"]',process.env.USERNAME!)
    await page.fill('[data-qa="subject"]',process.env.USERNAME!)
    await page.fill('[data-qa="message"]',process.env.USERNAME!)
    page.once('dialog', async dialog => {
        await dialog.accept()
    })
    await page.click('[data-qa="submit-button"]')
    
    await page.getByRole('link', { name: /Home/ }).click();
    await expect(page).toHaveURL(process.env.BASE_URL_AUTOMATION_EXERCISE!)
}) 
test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    await page.locator('a:has-text("Test Cases")').nth(3).click();
    await expect(page).toHaveURL(process.env.TEST_CASE_URL!)
})
test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    await page.locator('a:has-text("Products")').click()
    await expect(page).toHaveURL(process.env.PRODUCT_UR!)
    await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();
    await expect(page).toHaveURL(process.env.PRODUCT_DETAIL_URL!)
    await expect(page.locator('text=Availability')).toBeVisible()
    await expect(page.locator('text=Condition')).toBeVisible()
})
test('Test Case 9: Search Product', async ({ page }) => {
    await page.getByRole('link', { name: /Products/ }).click()
    await expect(page).toHaveURL(process.env.PRODUCT_UR!)
    await page.fill('[placeholder="Search Product"]','blue top')
})



