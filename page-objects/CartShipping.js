import { expect } from "@playwright/test";

export class CartShipping {

    constructor(page) {
        /* CartValidation */
        
        this.cartSection = page.locator("div li")
        this.productCartName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkout = page.locator("button:has-text('Checkout')")

        /* Personal information */
        this.creditCardInput = page.locator("input[value='4542 9931 9292 2293']");
        this.mesSelect = page.locator('select.input.ddl').nth(0);
        this.diaSelect = page.locator('select.input.ddl').nth(1);
        this.cvvCode = page.locator('(//input[@type="text"])[2]');
        this.cardName = page.locator('(//input[@type="text"])[3]');
        this.coupon = page.locator("[name='coupon']")

        /* Shipping information */
        this.selectCountry = page.locator("[placeholder*='Country']")
        this.countryOptions = page.locator(".ta-results")
        this.emailDelivery = page.locator(".user__name [type='text']").first()
        this.placeOrderBtn = page.locator(".action__submit")
    }


    async cartValidationAndGoToCheckout() {
        /* await cart.click(); */
        await this.cartSection.first().waitFor()
        const bool = await this.productCartName.isVisible();
        await expect(bool).toBeTruthy();
        await this.checkout.click();
    }

    async fillingCartInfo(username) {
        /* Personal information */
        await this.creditCardInput.fill("4542 9931 9292 2293")
        await this.mesSelect.selectOption('04')
        await this.diaSelect.selectOption('10')
        await this.cvvCode.fill("666")
        await this.cardName.fill("Rahul")
        await this.coupon.fill("asdasd")

        /* Shipping Information */
        await expect(this.emailDelivery).toHaveText(username)

        await this.selectCountry.pressSequentially("ind")
        await this.countryOptions.waitFor();
        const optionsCount = await this.countryOptions.locator("button").count()
        for (let i = 0; i < optionsCount; ++i) {

            const text = await this.countryOptions.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.countryOptions.locator("button").nth(i).click();
                break;
            }
        }

        await this.placeOrderBtn.click()
    }
}