export const config = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'BACKEND_URL_must_be_set_in_env',
  MAX_LINES_SHOWN: process.env.REACT_APP_MAX_LINES_SHOWN || 500,
};
