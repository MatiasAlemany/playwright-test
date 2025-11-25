export class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator(".btn.btn-custom[routerlink='/dashboard/cart']");
    }

    async searchProductAddCart(productName) {
        const titles = await this.productsText.allTextContents();

        const count = await this.products.count()
        for (let i = 0; i < count; ++i) {
            console.log("PRODUCTS", this.products.nth(i))
            if (await this.products.nth(i).locator("b").textContent() === productName) {

                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click()
    }
}
