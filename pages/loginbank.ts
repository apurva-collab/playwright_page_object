import { Page, Locator } from '@playwright/test'
export class Loginpage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly submit: Locator
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('input[name="username"]')
        this.password = page.locator('input[name="password"]')
        this.submit = page.locator('[type="submit"]')
    }
    async login(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.submit.click()
    }
}

