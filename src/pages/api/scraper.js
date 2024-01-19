import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(
      "https://data.gov.il/dataset/metavhim/resource/a0f56034-88db-4132-8803-854bcdb01ca1",
      { waitUntil: "networkidle2" }
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = ".search-box__link";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "text/Customize and automate"
    );
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
