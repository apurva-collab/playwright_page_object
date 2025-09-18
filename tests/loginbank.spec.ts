import { test, expect } from '@playwright/test'
import { Loginpage } from '../pages/loginbank'
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!)
  const login = new Loginpage(page);
  await login.login(process.env.USERNAME!, process.env.PASSWORD!)
})
test('login using valid cred', async ({ page }) => {
})
test('Logot flow',async ({ page }) =>{
    await page.locator('xpath=//div[@id="leftPanel"]//li/a[@href="logout.htm"]').click();
          


})
test('Open new account',async ({ page }) =>{
     await page.getByRole('link', { name: 'Open New Account' }).click();
})
test.describe('login using invalid cred', () => {
test('login using invalid cred', async ({ page }) => {
    const login = new Loginpage(page)
        await login.login(process.env.USERNAME_INCORRECT!, process.env.PASSWORD_INCORRECT!)
        await expect(page.getByText('The username and password could not be verified.')).toBeVisible()
})
test.only('new register', async ({ page }) => {        
        await page.click('#loginPanel > p:nth-child(3) > a')
        await page.goto(process.env.REDIRECTED_URL!)
        await page.fill('#customer\\.firstName',' ')
        await page.fill('#customer\\.lastName',' ')
        await page.fill('#customer\\.address.street',' ')
        await page.fill('#customer\\.address.city',' ')
        await page.fill('#customer\\.address.state',' ')
        await page.fill('#customer\\.address.zipCode',' ')
        await page.fill('#customer\\.phoneNumber',' ')
        await page.fill('#customer\\.ssn',' ')
        await page.fill('#customer\\.username',' ')
        await page.fill('#customer\\.password',' ')
        await page.fill('#repeatedPassword',' ')
        await page.click('[value="Register"]')

})

})