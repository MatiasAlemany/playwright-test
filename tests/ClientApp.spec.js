const { test, expect } = require('@playwright/test');

test.only('Login pagina indio', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const userEmail = page.locator("#userEmail")
    const userPassword = page.locator("#userPassword")
    const submitBtn = page.locator("#login")
    const firstTitle = page.locator(".card-body b")

    await userEmail.fill("matiasalemany2@gmail.com")
    await userPassword.type("Asdasd123.")
    await submitBtn.click()
    await page.waitForLoadState('networkidle')
    const title = await firstTitle.allTextContents();
    console.log(title)

});