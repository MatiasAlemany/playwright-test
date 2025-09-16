const { test, expect } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser }) => {
    /* Iniciar playwright con un browser limpio y podemos insertar plugins o cookies que necesitemos */
    const context = await browser.newContext()
    const page = await context.newPage()

    const userName = page.locator("#username")
    const signInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")

    /* Aca le decimos a que pagina web ir */
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    /* Aca conseguimos el titulo de la web por consola. */
    console.log(await page.title());

    /* Aca localizamos el input para usuario y contraseña y lo llenamos con los datos que le pasemos */
    await userName.fill("rahulshetty")
    await page.locator("#password").fill("learning")
    /* Aca localizamos el boton de submit y lo clickeamos. */
    await signInBtn.click()
    /* Aca conseguimos con consola el texto de la alerta si el usuario o contraseña estan mal. */
    console.log(await page.locator("[style*='block']").textContent())
    /* Esperamos mensaje de error porque el usuario o contraseña estan mal. */
    await expect(page.locator("[style*=block]")).toContainText("Incorrect")

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
});

test('Page playwright test', async ({ page }) => {
    /* Si vamos directamente con page.goto, significa que necesitamos un default browser y listo, 
    sino usamos el codigo comentado arriba con la informacion de cookies o plugins que requiera nuestra prueba */
    /* Aca le decimos a que pagina web ir con "page.goto" */
    await page.goto("https://www.google.com")
    /* Conseguimos el titulo por consola. */
    console.log(await page.title());
    /* Aca le decimos que esperamos que el titulo sea "Google" */
    await expect(page).toHaveTitle("Google");
});