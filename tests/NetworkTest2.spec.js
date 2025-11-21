const { test, expect } = require("@playwright/test");



test('Security Test Intercept', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    const email = "matiasalemany2@gmail.com"
    const userEmail = page.locator("#userEmail")
    const userPassword = page.locator("#userPassword")
    const submitBtn = page.locator("#login")

    await userEmail.fill(email)
    await userPassword.type("Asdasd123.")
    await submitBtn.click()
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    await page.locator(".btn.btn-custom[routerlink*='myorders']").click()

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route =>
        route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=12345679854654"
        })
    )
    await page.locator("button:has-text('View')").first().click()
    
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})