require('dotenv').config();

module.exports ={
  sassOptions: {
    includePaths: ['./src']
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    DEFAULT_AVATAR_URL: process.env.DEFAULT_AVATAR_URL,
  }
};