const config = {
  development: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  },
  test: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  },
  production: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_DEPLOYMENT_URL,
  },
};
let variables = config.development;
if (import.meta.env.DEV) {
  variables = config.development;
} else {
  variables = config.test;
}

export { variables };
