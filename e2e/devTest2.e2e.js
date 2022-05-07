// import { reloadApp } from "detox-expo-helpers";
async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("E2E Automatic Test", () => {
	beforeAll(async () => {
		// * doesn't actually do anything
		await device.launchApp({
			launchArgs: { EXKernelDisableNuxDefaultsKey: true },
			// url: "exp+simplifinance://expo-development-client/?url=http%3A%2F%2F10.101.14.4%3A8081",
		});
		// * if --reuse comment this
		// await element(by.text("Got it")).tap();
		try {
			await element(by.text("Got it")).tap();
			await element(by.text("Development Client")).swipe("down");
		} catch (e) {}
		// continue your tests
		// * choose which url
		await device.openURL({
			url: "exp+simplifinance://expo-development-client/?url=http%3A%2F%2F10.101.14.4%3A8081",
		});
		await sleep(1000);
		// await device.openURL({
		// 	url: "exp+simplifinance://expo-development-client/?url=http%3A%2F%2F10.101.14.4%3A19000",
		// });
		// await element(by.text("http://localhost:8081")).tap();
	});

	beforeEach(async () => {
		// await device.reloadReactNative();
		// await sleep(1000);
	});

	it("Welcome text visible", async () => {
		await expect(element(by.id("homeText"))).toBeVisible();
	});

	it("Go to transactions page", async () => {
		await element(by.id("homeButton")).tap();
	});

	it("Is in the transactions page", async () => {
		await expect(element(by.id("noTransactionsText"))).toBeVisible();
	});

	it("Month navigation works", async () => {
		await expect(element(by.id("monthPrevButton"))).toBeVisible();
		await element(by.id("monthPrevButton")).tap();
		await expect(element(by.id("monthNextButton"))).toBeVisible();
		await element(by.id("monthNextButton")).tap();
		await expect(element(by.text(new Date().getFullYear))).toBeVisible();
	});

	it("Open add new transaction", async () => {
		await element(by.id("addTransactionButton")).tap();
		await element(by.id("saveButton")).tap();
		await expect(element(by.text("Error"))).toBeVisible();
		await element(by.text("OK")).tap();
	});

	it("Adds new income", async () => {
		await element(by.id("nameField")).typeText("Test Income");
		await element(by.id("amountMaskedField")).typeText("100");
		await element(by.id("descField")).typeText("Salary from jobs");
		await element(by.id("incomeRadioButton")).tap();
		await element(by.id("categoryPicker")).tap();
		await element(by.text("Housing")).swipe("up");
		await element(by.type("UITextField")).typeText("Salar");
		await element(by.text("Salary")).tap();
		await element(by.id("saveButton")).tap();
	});

	it("Adds new expense", async () => {
		await element(by.id("addTransactionButton")).tap();
		await element(by.id("nameField")).typeText("Test Outcome");
		await element(by.id("amountMaskedField")).typeText("40");
		await element(by.id("descField")).typeText("Something to eat");
		await element(by.id("expenseRadioButton")).tap();
		await element(by.id("categoryPicker")).tap();
		await element(by.text("Housing")).swipe("up");
		await element(by.type("UITextField")).typeText("Foo");
		await element(by.text("Food")).tap();
		await element(by.id("saveButton")).tap();
	});

	it("Swipe to overview", async () => {
		await element(by.text("April 2022")).swipe("left");
		await sleep(500);
	});

	it("Swipes back to transactions", async () => {
		await element(by.text("Total")).atIndex(0).swipe("right");
		await sleep(500);
	});

	it("Delete a transaction and check", async () => {
		await element(by.text("Test Outcome")).swipe("left");
		await element(by.text("Delete")).atIndex(0).tap();
		await element(by.text("April 2022")).swipe("left");
		await sleep(500);
		await element(by.text("Total")).atIndex(0).swipe("right");
		await sleep(500);
	});

	it("Delete other transaction and check", async () => {
		await element(by.text("Test Income")).swipe("left");
		await element(by.text("Delete")).atIndex(0).tap();
		await element(by.text("April 2022")).swipe("left");
		await sleep(500);
		await element(by.id("overviewNoTransactionsText")).swipe("right");
		await sleep(500);
	});
});
