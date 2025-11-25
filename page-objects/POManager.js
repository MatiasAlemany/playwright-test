import { LoginPage } from "./loginPage"
import { DashboardPage } from "./DashboardPage"
import { CartShipping } from "./CartShipping";

export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartShipping = new CartShipping(page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartShipping(){
        return this.cartShipping;
    }
}