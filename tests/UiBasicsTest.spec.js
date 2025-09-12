const { test, expect } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser}) => {
    /* Iniciar playwright con un browser limpio y podemos insertar plugins o cookies que necesitemos */
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://www.kruza.com.ar")
    console.log(await page.title());
});

test('Page playwright test', async ({page}) => {
    /* Si vamos directamente con page.goto, significa que necesitamos un default browser y listo, sino usamos el codigo comentado arriba con la informacion de cookies o plugins que requiera nuestra prueba */
    await page.goto("https://www.google.com")
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});