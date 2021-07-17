const LoginPage = require('../specs/login.po').LoginPage;
const userObj = {
  user: 'john_admin2@admin.com',
  password: 'Pa55word',
}

const { expect } = require('chai');

const rundomNumber = () => Date.now();

describe('Registration:', function () {

  it('should be able to register', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-up');

    const usernameField = await $('input[name="name"]');
    const surnameField = await $('input[name="surname"]');
    const birthDateField = await $('input[name="birthdate"]');
    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const retryPasswordField = await $('input[name="retypePassword"]');
    const phoneField = await $('input[name="phone"]');

    const ddls = await $$('div.selectStyles__control');

    const genderDdl = ddls[0];
    const statusDdl = ddls[1];

    const femaleOption = await $('div.selectStyles__option=female');
    const doctorOption = await $('div.selectStyles__option=doctor');

    const signUpButton = await $('button');

    await usernameField.waitForDisplayed({ timeout: 5000 });
    await usernameField.setValue('Marcus');

    await surnameField.waitForDisplayed({ timeout: 5000 });
    await surnameField.setValue('Aurelius');

    await birthDateField.waitForDisplayed({ timeout: 5000 });
    await birthDateField.setValue('11/11/1999');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`marcus${rundomNumber()}@gmail.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('Pa55word');

    await retryPasswordField.waitForDisplayed({ timeout: 5000 });
    await retryPasswordField.setValue('Pa55word');

    await phoneField.waitForDisplayed({ timeout: 5000 });
    await phoneField.setValue('380000000000');

    await genderDdl.waitForDisplayed({ timeout: 5000 });
    await genderDdl.click();

    await femaleOption.waitForDisplayed({ timeout: 5000 });
    await femaleOption.click();

    await statusDdl.waitForDisplayed({ timeout: 5000 });
    await statusDdl.click();

    await doctorOption.waitForDisplayed({ timeout: 5000 });
    await doctorOption.click();

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');

    await browser.reloadSession();
  });
});

describe('Login', function () {
  it('should by valid', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');

    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');

    const signInButton = await $('button');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`john_admin2@admin.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('Pa55word');

    await signInButton.waitForDisplayed({ timeout: 5000 });
    await signInButton.click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();

    expect(url).to.be.eql('http://46.101.234.121/doctors');

    await browser.reloadSession();
  });

  it('should by invalid', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');

    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signInButton = await $('button');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`john_admin2@admin.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('wrongPassword');

    await signInButton.waitForDisplayed({ timeout: 5000 });
    await signInButton.click();

    await browser.waitUntil(
      async function () {
        const toastMessage = await $$('div[class="rrt-text"]');
        const toastMessageError = await toastMessage[0];
        const errorMessage = await toastMessageError.getText();

        return errorMessage === 'Password is incorrect';
      },
      { timeout: 5000 },
      { timeoutMsg: 'Toast Error message is shown' }
    );

    await browser.reloadSession();
  });
});

describe('Change user profile - correct', function () {
  xit('should change user data', async function () {

    LoginPage.LoginPageLibs.Login(userObj.user, userObj.password);

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 10000 },
    );

    const topButtons = await $$('a[class="link_link__3zEN3"]');

    browser.setTimeout({
      'pageLoad': 5000
    });
    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    await topButtons[1].waitForDisplayed({ timeout: 5000 });
    await topButtons[1].click();

    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    const editButton = await $('span[class="styles_buttonIcon__2xI4i styles_edit__ftuHl"]');

    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    await editButton.waitForDisplayed({ timeout: 5000 });
    await editButton.click();

    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    const name = await $$('input[name="name"]');
    await name[1].waitForDisplayed({ timeout: 5000 });
    const testName = 'newName'
    await name[1].setValue(testName);

    const serName = await $('input[name="surname"]');
    await serName.waitForDisplayed({ timeout: 5000 });
    const testSername = 'newSername'
    await serName.setValue(testSername);

    const buttons = await $$('button');
    await buttons[5].waitForDisplayed({ timeout: 5000 });
    await buttons[5].click();

    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    browser.waitUntil(
      async function () {
        const profileName = await $('span[class="styles_name__2vTNE"]');
        await profileName.waitForDisplayed({ timeout: 5000 });
        const getName = profileName.getText();

        expect(getName).to.be.eql(`"${testName}" "${testSername}"`);

        return getName.length > 0;
      },
      { timeout: 30000 },
      { timeoutMsg: 'Name changed success' }
    );
  });

  xit('should change specialty/clinic', async function () {
    LoginPage.LoginPageLibs.Login(userObj.user, userObj.password);

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 10000 },
    );

    const topButtons = await $$('a[class="link_link__3zEN3"]');

    browser.setTimeout({
      'pageLoad': 5000
    });
    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    await topButtons[1].waitForDisplayed({ timeout: 5000 });
    await topButtons[1].click();

    browser.executeAsync((done) => {
      setTimeout(done, 2000);
    });

    const ddls = await $$('div.selectStyles__control');
    // const speciality = ddls[0];
    // const clinic = ddls[1];

    const specialityOption = await $('div.selectStyles__option=surgeon');
    const clinicOption = await $('div.selectStyles__option=Cleveland Clinic');

    browser.executeAsync((done) => {
      setTimeout(done, 5000);
    });

    await ddls[0].waitForDisplayed({ timeout: 5000 });
    await ddls[0].click();

    await specialityOption.waitForDisplayed({ timeout: 5000 });
    await specialityOption.click();

    await ddls[1].waitForDisplayed({ timeout: 5000 });
    await ddls[1].click();

    await clinicOption.waitForDisplayed({ timeout: 5000 });
    await clinicOption.click();

  });

  it('should add new clinic', async function () {
    LoginPage.LoginPageLibs.Login(userObj.user, userObj.password);

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 10000 },
    );

    const topButtons = await $$('a[class="link_link__3zEN3"]');

    await topButtons[0].waitForDisplayed({ timeout: 5000 });
    await topButtons[0].click();

    const controlButtons = await $$('button');
    const addButton = await controlButtons[1];

    await addButton.waitForDisplayed({ timeout: 5000 });
    await addButton.click();

    const clinicName = await $('input[name="name"]');
    const clinicAddress = await $('input[name="address"]');

    await clinicName.waitForDisplayed({ timeout: 5000 });
    const newClinicName = `New Clinic ${rundomNumber()}`
    await clinicName.setValue(newClinicName);

    await clinicAddress.waitForDisplayed({ timeout: 5000 });
    await clinicAddress.setValue('Test Address');

    const ddls = await $$('div.selectStyles__control');
    const citySelect = ddls[1];

    const cityOption = await $('div.selectStyles__option=Boston, MA');

    await citySelect.waitForDisplayed({ timeout: 5000 });
    await citySelect.click();

    await cityOption.waitForDisplayed({ timeout: 5000 });
    await cityOption.click();

    const buttons = await $$('button');

    await buttons[3].waitForDisplayed({ timeout: 5000 });
    await buttons[3].click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/clinics';
      },
      { timeout: 10000 },
    );
    const clinics = await $$('span[class="styles_title__3xRcc"]');

    expect(clinics).to.be.an('array');
  });
});