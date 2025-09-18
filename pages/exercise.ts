import { Page, Locator } from '@playwright/test'
export class Loginpage {
    readonly page: Page
    readonly username1: Locator
    readonly password1: Locator
    readonly submit1: Locator
    constructor(page: Page) {
        this.page = page;
        this.username1 = page.locator('[data-qa="login-email"]')
        this.password1 = page.locator('[data-qa="login-password"]')
        this.submit1 = page.locator('[data-qa="login-button"]')
    }
    async login(username: string, password: string) {
        await this.username1.fill(username)
        await this.password1.fill(password)
        await this.submit1.click()
    }
}
