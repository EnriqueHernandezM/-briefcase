import { config } from "dotenv";
config();

const aroundConfig = {
  PORT: process.env.PORT || 8081,
  dbUse: process.env.DB,
  wordSecret: process.env.WORD_SECRET,
  pinAdmin: process.env.PIN_ADMIN,
  passwordRedisLab: process.env.PASSWORD_REDISLAB,
  hostRedisLab: process.env.HOST_REDISLAB,
  portRedisLab: process.env.PORT_REDISLAB,
  accesKeyId: process.env.ACCES_KEY_ID,
  accesKeySecret: process.env.ACCES_KY_SECRET,
  awsRegionBucket: process.env.AWS_REGION_BUCKET,
  awsNameBucket: process.env.AWS_NAME_BUCKET,
};
export default aroundConfig;
