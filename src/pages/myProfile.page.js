const { Button } = require('../elements');
const { Span } = require('../elements/span.element');

class MyProfilePage {
    constructor() {
        this.editProfileButton = new Button('span[class="styles_buttonIcon__2xI4i styles_edit__ftuHl"]');
        this.profName = new Span('span[class="styles_name__2vTNE"]');

        this.specialitySelector = new Button('div.selectStyles__control', 0);
        this.clinicSelector = new Button('div.selectStyles__control', 1);
        this.selectOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');
        this.saveSpecialityButton = new Button('button[type="submit"]', 0);
        this.saveClinicButton = new Button('button[type="submit"]', 1);
        this.selectedSpeciality = new Span('div.selectStyles__placeholder');


    }

    async goToEditUserProfile() {
        await this.editProfileButton.click();
    }

    async getProfileName() {
        return await this.profName.getText();
    }

    async changeSpecialityAndClinic({ newSpeciality, newClinic }) {
        await this.specialitySelector.click();
        await this.selectOption.clickByText(newSpeciality);    
        await this.clinicSelector.click();
        await this.selectOption.clickByText(newClinic);
        await this.saveSpecialityButton.click();
        await this.saveClinicButton.click();
    }

    async getSpeciality() {        
        return await this.selectedSpeciality.getText();        
    }
}

module.exports = { MyProfilePage };
