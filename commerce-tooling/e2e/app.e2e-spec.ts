import { HclCommerceToolingAngularStarterPage } from "./app.po";

describe("hcl-commerce-tooling-angular-starter App", () => {
	let page: HclCommerceToolingAngularStarterPage;

	beforeEach(() => {
		page = new HclCommerceToolingAngularStarterPage();
	});

	it("should display message saying app works", () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual("app works!");
	});
});
