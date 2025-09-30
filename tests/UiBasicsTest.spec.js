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

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    /* Locators */
    const userName = page.locator("#username")
    const signInBtn = page.locator("#signInBtn")
    const terms = page.locator("#terms")
    const documentLink = page.locator("[href*='documents-request']")

    /* DropDown */
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")

    /* CheckBox */
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    //assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    console.log(await page.locator(".radiotextsty").last().isChecked())


    /* Fill text Inputs */
    await userName.fill("rahulshetty")
    await page.locator("#password").fill("learning")

    /* Checkbox + assertion */
    await terms.click();
    expect(await terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();

    /* Assertion link */
    await expect(documentLink).toHaveAttribute("class", "blinkingText")

    await page.pause();
});

test('Child Windows Handling', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator("#username")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']")
    

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])

    const text = await newPage.locator(".red").textContent();
    console.log(text)

    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain)

    await userName.fill(domain)
    console.log(await userName.inputValue())
    await page.pause();
})