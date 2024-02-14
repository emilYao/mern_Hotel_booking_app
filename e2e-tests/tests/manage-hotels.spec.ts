import {test, expect} from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({page})=>{
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", {name:"Sign In"}).click();

    await expect(page.getByRole("heading", {name:"Sign In"})).toBeVisible();

    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("1234567890");

    await page.getByRole("button", {name:"Login"}).click()

  await page.getByRole("button", {name:"Login"}).click();

})


test("should allow user to add a hotel", async ({page})=>{
    await page.goto(`${UI_URL}add-hotel`);
    
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator("[name='pricePerNight']").fill("100");
    await page.selectOption('select[name[name="startRating"]', "3");
    await page.locator('[name="country"]').fill("Test Country");

    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpeg"),
        path.join(__dirname, "files", "2.jpeg")

    ])

    await page.getByRole("button", {name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})


test("should display hotels", async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("AMOS")).toBeVisible();
    await expect(page.locator(':has-text("ddfgmfb")')).toBeVisible();
    await expect(page.locator(':has-text("ANFOETA , Ghana")')).toBeVisible();
    await expect(page.locator(':has-text("All Inclusive")')).toBeVisible();
    await expect(page.locator(':has-text("$5 per night")')).toBeVisible();
    await expect(page.locator(':has-text("1 adults, children")')).toBeVisible();
    await expect(page.locator(':has-text("2 Star Rating")')).toBeVisible();

    await expect(page.getByRole("link", {name:"View Details"})).toBeVisible();
    await expect(page.getByRole("link", {name:"Add Hotel"})).toBeVisible();




})