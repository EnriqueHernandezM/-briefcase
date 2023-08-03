import { config } from "dotenv";
config();

const aroundConfig = {
  PORT: process.env.PORT,
  dbUse: process.env.DB,
  wordSecret: process.env.WORD_SECRET,
  pinAdmin: process.env.PIN_ADMIN,
  passwordRedisLab: process.env.PASSWORD_REDISLAB,
  hostRedisLab: process.env.HOST_REDISLAB,
  portRedisLab: process.env.PORT_REDISLAB,
};
export default aroundConfig;
