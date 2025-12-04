const { test, expect } = require('@playwright/test');

 test('Login pagina indio', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const productName = 'ZARA COAT 3'
    const email = "matiasalemany2@gmail.com"
    const userEmail = page.locator("#userEmail")
    const userPassword = page.locator("#userPassword")
    const submitBtn = page.locator("#login")
    const products = page.locator(".card-body")
    const cart = page.locator(".btn.btn-custom[routerlink='/dashboard/cart']")
    const productCartName = page.locator("h3:has-text('ZARA COAT 3')")
    const cartSection = page.locator("div li")
    const checkout = page.locator("button:has-text('Checkout')")
    const creditCardInput = page.locator("input[value='4542 9931 9292 2293']");
    const mesSelect = page.locator('select.input.ddl').nth(0);
    const diaSelect = page.locator('select.input.ddl').nth(1);
    const cvvCode = page.locator('(//input[@type="text"])[2]');
    const cardName = page.locator('(//input[@type="text"])[3]');
    const coupon = page.locator("[name='coupon']")
    const couponBtn = page.locator("button:has-text('Apply Coupon')")
    const selectCountry = page.locator("[placeholder*='Country']")
    const countryOptions = page.locator(".ta-results")
    const emailDelivery = page.locator(".user__name [type='text']").first()
    const placeOrderBtn = page.locator(".action__submit")
    const thanksTitle = page.locator(".hero-primary")
    const idPurchase = page.locator(".em-spacer-1 .ng-star-inserted")
    const ordersBtn = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    const ordersTable = page.locator("tbody tr")

    await userEmail.fill(email)
    await userPassword.type("Asdasd123.")
    await submitBtn.click()
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor();

    const count = await products.count()
    for (let i = 0; i < count; ++i) {
        console.log("PRODUCTS", products.nth(i))
        if (await products.nth(i).locator("b").textContent() === productName) {

            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    /* CART SECTION */
    await cart.click();
    await cartSection.first().waitFor()
    const bool = await productCartName.isVisible();
    await expect(bool).toBeTruthy();
    await checkout.click();

    /* CART FORM PERSONAL DATA */
    await creditCardInput.fill("4542 9931 9292 2293")
    await mesSelect.selectOption('04')
    await diaSelect.selectOption('10')
    await cvvCode.fill("666")
    await cardName.fill("Rahul")
    await coupon.fill("asdasd")
    // await couponBtn.click();

    /* CART SHIPPING INFORMATION */
    await expect(emailDelivery).toHaveText(email)

    await selectCountry.pressSequentially("ind")
    await countryOptions.waitFor();
    const optionsCount = await countryOptions.locator("button").count()
    for (let i = 0; i < optionsCount; ++i) {

        const text = await countryOptions.locator("button").nth(i).textContent();
        if (text === " India") {
            await countryOptions.locator("button").nth(i).click();
            break;
        }
    }

    await placeOrderBtn.click()
    await expect(thanksTitle).toHaveText(" Thankyou for the order. ");
    const orderId = await idPurchase.textContent();
    console.log(orderId);

    await ordersBtn.click()
    await page.locator("tbody").waitFor()

    const ordersCount = await ordersTable.count()
    for (let i = 0; i < ordersCount; ++i) {

        const rowOrderId = await ordersTable.nth(i).locator("th").textContent();
        if
            (orderId.includes(rowOrderId)) {
            await ordersTable.nth(i).locator("button").first().click();
            break;
        }
    }

     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});