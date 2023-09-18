export default () => {
  return {
    appPort: Number(process.env.APP_PORT),
    domain: process.env.DOMAIN,
    urlConnection: String(process.env.URL_CONNETION),
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_IN,
      token: process.env.JWT_TOKEN,
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
