const { expect } = require('chai');
const { App } = require('../src/pages');

const rundomNumber = () => Date.now();

const app = new App();

describe('Registration:', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-up');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should be able to register doctor', async function () {
    await app.authPage.register({
      name: `John${rundomNumber()}`,
      surname: 'Doctor',
      email: `marcus${rundomNumber()}@gmail.com`,
      password: 'Pa55word',
      phone: '380999999',
      birthDate: '11/11/2000',
      status: 'doctor',
      gender: 'female',
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');
  });

  it('should be able to register patient', async function () {
    await app.authPage.register({
      name: `John${rundomNumber()}`,
      surname: 'Patient',
      email: `marcus${rundomNumber()}@gmail.com`,
      password: 'Pa55word',
      phone: '380999999',
      birthDate: '11/11/2000',
      status: 'patient',
      gender: 'male',
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');
  });
});

describe('Login', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should by valid', async function () {
    await app.authPage.login({
      email: `john_admin1@admin.com`,
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();

    expect(url).to.be.eql('http://46.101.234.121/doctors');
  });

  it('should by invalid', async function () {
    await app.authPage.login({
      email: `john_admin1@admin.com`,
      password: 'wrongPassword'
    });

    await browser.waitUntil(
      async function () {
        const toastMessage = await $$('div[class="rrt-text"]');
        const toastMessageError = await toastMessage[0];
        const errorMessage = await toastMessageError.getText();

        return errorMessage === 'Password is incorrect';
      },
      { timeout: 5000 },
      { timeoutMsg: 'Toast Error message is not shown' }
    );

    const url = await browser.getUrl();

    expect(url).to.be.eql('http://46.101.234.121/sign-in');
  });
});

describe('Change user profile - correct', function () {
  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    await app.authPage.login({
      email: `john_admin1@admin.com`,
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 15000 },
    );
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should change user data', async function () {
    const testName = `newName ${rundomNumber()}`;
    const testSername = `newSername ${rundomNumber()}`;

    await app.mainPage.goToMyProfile();
    await app.myProfilePage.goToEditUserProfile();

    await app.editProfilePage.changeProfileName({
      newProfileName: testName,
      newProfileSername: testSername
    });

    await browser.waitUntil(
      async function () {
        const profileName = await $('span[class="styles_name__2vTNE"]');
        await profileName.waitForDisplayed({ timeout: 5000 });
        const name = await profileName.getText();

        return name.length > 0;
      },
      { timeout: 5000 },
      { timeoutMsg: 'Name could not find' }
    );

    const profileName = await $('span[class="styles_name__2vTNE"]');
    await profileName.waitForDisplayed({ timeout: 5000 });
    const name = await profileName.getText();

    expect(name).to.be.eql(`${testName} ${testSername}`);
  });

  it('should change specialty/clinic', async function () {
    await app.mainPage.goToMyProfile();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        await app.myProfilePage.specialitySelector;

        return url.includes('/user-profile/');
      },
      { timeout: 10000 },
    );

    const testSpeciality = 'surgeon';
    const testClinic = 'Cleveland Clinic';


    await app.myProfilePage.changeSpecialityAndClinic({
      newSpeciality: testSpeciality,
      newClinic: testClinic
    });

    await browser.refresh();

    const specialityDrop = await $('div.selectStyles__placeholder');
    await specialityDrop.waitForDisplayed({ timeout: 5000 });
    const selectedSpeciality = await specialityDrop.getText();

    expect(selectedSpeciality.toLowerCase()).to.be.eql(`${testSpeciality}`);

  });

  it('should add new clinic', async function () {
    const testClinicName = `New Clinic ${rundomNumber()}`;
    const testAddress = `Street ${rundomNumber()}`;
    const testClinicCity ='Boston, MA';    

    await app.mainPage.goToClinics();  

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/clinics';
      },
      { timeout: 15000 },
    );   
    
    await app.clinicsPage.goToAddClinic();   

    await app.clinicsPage.addNewClinic({
      newClinicName: testClinicName,
      newClinicAddress: testAddress,
      newClinicCity: testClinicCity
    });

    await browser.refresh();

    await browser.waitUntil(
      async function () {
        const clinic = await $(`span[class="styles_title__3xRcc"]=${testClinicName}`);

        await clinic.waitForDisplayed({ timeout: 5000 });
        const name = await clinic.getText();

        return name === testClinicName;
      },
      { timeout: 5000 },
    );

    const clinic = await $(`span[class="styles_title__3xRcc"]=${testClinicName}`);

    await clinic.waitForDisplayed({ timeout: 5000 });

    const result = await clinic.getText();

    expect(result).to.be.eql(testClinicName);
  });
});