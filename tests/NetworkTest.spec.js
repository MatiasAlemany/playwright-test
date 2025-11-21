const { test, expect, request } = require('@playwright/test');
import { APIUtils } from './utils/apiUtils';

const loginPayLoad = { userEmail: "matiasalemany2@gmail.com", userPassword: "Asdasd123." }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] }
const fakePayLoadOrderds = { data: [], message: "No Orders" };
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response - APi response ->|WE INSERT FAKE REPSONSE HERE| -> browser -> render our data
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoadOrderds);
            route.fulfill(
                {
                    response,
                    body,
                }
            )   
        }
    )

    const ordersBtn = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    const ordersTable = page.locator("tbody tr")

    await ordersBtn.click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent())
});