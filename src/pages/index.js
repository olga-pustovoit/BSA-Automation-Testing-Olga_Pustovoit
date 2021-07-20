const { AuthPage } = require('./auth.page');
const { ClinicsPage } = require('./clinics.page');
const { EditProfilePage } = require('./editProfile.page');
const { MainPage } = require('./main.page');
const { MyProfilePage } = require('./myProfile.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
    this.mainPage = new MainPage();
    this.myProfilePage = new MyProfilePage();
    this.editProfilePage = new EditProfilePage();
    this.clinicsPage = new ClinicsPage();
  }
}

module.exports = { App };
