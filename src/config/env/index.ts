export default () => {
  return {
    appPort: Number(process.env.APP_PORT),
    domain: process.env.DOMAIN,
    urlConnection: String(process.env.URL_CONNETION),
    mongoLogDB: String(process.env.MONGO_LOG_DB),
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_IN,
      token: process.env.JWT_TOKEN,
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    database: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
  };
};
