const environment: { baseUrl: string | undefined } = {
  baseUrl: 'http://localhost:3000',
};

if (process.env.REACT_APP_ENV === 'dev') {
  environment.baseUrl = process.env.REACT_APP_BESTBUY_DEV_API;
}

if (process.env.REACT_APP_ENV === 'qa') {
  environment.baseUrl = process.env.REACT_APP_BESTBUY_QA_API;
}

if (process.env.REACT_APP_ENV === 'prod') {
  environment.baseUrl = process.env.REACT_APP_BESTBUY_PROD_API;
}

export default environment;
