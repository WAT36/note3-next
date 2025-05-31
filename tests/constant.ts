import * as dotenv from "dotenv";
dotenv.config();

export const TOP_PAGE_URL = process.env.PLAYWRIGHT_TEST_ROOTPAGE;
