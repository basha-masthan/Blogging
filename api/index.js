// api/index.js
const app = require('../app'); // path to your Express app

module.exports = (req, res) => {
  app(req, res);
};
