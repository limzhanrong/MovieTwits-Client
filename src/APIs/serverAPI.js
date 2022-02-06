const axios = require('axios').default;
require('dotenv').config();

export default axios.create({
    // baseURL: process.env.REACT_APP_SERVER_URL,
    // data: {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // }
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
  