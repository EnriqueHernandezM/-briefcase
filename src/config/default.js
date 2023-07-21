import { config } from "dotenv";
config();

const aroundConfig = {
  PORT: 8081,
  DB: "sQlite",
  WORD_SECRET: process.env.WORD_SECRET,
};
export default aroundConfig;
