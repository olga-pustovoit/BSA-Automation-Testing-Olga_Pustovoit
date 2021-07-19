const { AuthPage } = require('./auth.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
  }
}

module.exports = { App };
