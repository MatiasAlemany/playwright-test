const { test, expect } = require('@playwright/test');
import { POManager } from '../page-objects/POManager';
import dataset from '../utils/placeorderTestData.json' assert { type: 'json' };


for (const data of dataset) {
    test(`Client App Login for ${data.username}`, async ({ page }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password)

        const dashboardPage = poManager.getDashboardPage()
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartShipping = poManager.getCartShipping();
        await cartShipping.cartValidationAndGoToCheckout();
        await cartShipping.fillingCartInfo(data.username);


        const thanksTitle = page.locator(".hero-primary")
        const idPurchase = page.locator(".em-spacer-1 .ng-star-inserted")
        const ordersBtn = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
        const ordersTable = page.locator("tbody tr")



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
    });
}