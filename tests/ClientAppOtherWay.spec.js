const { test, expect } = require('@playwright/test');

test.only('Login pagina indio', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const productName = 'ZARA COAT 3'
    const email = "matiasalemany2@gmail.com"
    const userEmail = page.getByPlaceholder("email@example.com")
    const userPassword = page.getByPlaceholder("enter your passsword")
    const submitBtn = page.getByRole("button", {name: "Login "})
    const products = page.locator(".card-body")
    const goToCart = page.getByRole("listitem").getByRole("button", {name:"Cart"})
    const productCartName = page.locator("h3:has-text('ZARA COAT 3')")
    const cartSection = page.locator("div li")
    const checkout = page.getByRole("button", {name: "Checkout"})
    const creditCardInput = page.locator("input[value='4542 9931 9292 2293']");
    const mesSelect = page.locator('select.input.ddl').nth(0);
    const diaSelect = page.locator('select.input.ddl').nth(1);
    const cvvCode = page.locator('(//input[@type="text"])[2]');
    const cardName = page.locator('(//input[@type="text"])[3]');
    const coupon = page.locator("[name='coupon']")
    const couponBtn = page.locator("button:has-text('Apply Coupon')")
    const selectCountry = page.getByPlaceholder("Select Country")
    const countryOptions = page.getByRole("button",{name:"Ind"}).nth(1)
    const emailDelivery = page.locator(".user__name [type='text']").first()
    const placeOrderBtn = page.getByText("PLACE ORDER")
    const thanksTitle = page.getByText("Thankyou for the order.")
    const idPurchase = page.locator(".em-spacer-1 .ng-star-inserted")
    const ordersBtn = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    const ordersTable = page.locator("tbody tr")

    await userEmail.fill(email)
    await userPassword.type("Asdasd123.")
    await submitBtn.click()
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor();

    /* RECORRER LOS PRODUCTOS */
    await products.filter({hasText:productName}).getByRole("button", {name: "Add to Cart"}).click()
    await goToCart.click()

    /* CART SECTION */
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
    await countryOptions.click();

    await placeOrderBtn.click()
    await expect(thanksTitle).toBeVisible()
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