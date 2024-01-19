import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      "https://data.gov.il/dataset/metavhim/resource/a0f56034-88db-4132-8803-854bcdb01ca1"
    );

    await page.waitForSelector("#download");

    await page.click("#download");

    await page.waitForTimeout(5000);

    await browser.close();

    const filePath = path.join(__dirname, "downloaded.csv");
    const fileData = fs.readFileSync(filePath, "utf-8");

    const jsonResponse = {
      title: "CSV Download",
      fileData: fileData,
    };

    // Send the JSON response
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
