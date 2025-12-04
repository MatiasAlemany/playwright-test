const { test, expect, request } = require('@playwright/test');
import { APIUtils } from '../utils/APIUtils';

const loginPayLoad = { userEmail: "matiasalemany2@gmail.com", userPassword: "Asdasd123." }
const orderPayLoad = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]}
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad);
})


test('Login pagina indio', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client/")

    const ordersBtn = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    const ordersTable = page.locator("tbody tr")

    await ordersBtn.click()
    await page.locator("tbody").waitFor()

    const ordersCount = await ordersTable.count()
    for (let i = 0; i < ordersCount; ++i) {

        const rowOrderId = await ordersTable.nth(i).locator("th").textContent();
        if
            (response.orderId.includes(rowOrderId)) {
            await ordersTable.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});