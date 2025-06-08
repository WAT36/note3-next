import * as dotenv from "dotenv";
dotenv.config();

export const TOP_PAGE_URL = process.env.PLAYWRIGHT_TEST_ROOTPAGE;

export const LOGIN_USERNAME = process.env.PLAYWRIGHT_TEST_USERNAME;
export const LOGIN_PASSWORD = process.env.PLAYWRIGHT_TEST_PASSWORD;
