const { Button, Input } = require('../elements');

class ClinicsPage {
    constructor() {        
         this.addClinicButton = new Button('button', 1);
         this.newClinicName = new Input('input[name="name"]');        
         this.newClinicAddress = new Input('input[name="address"]'); 
         this.citySelector = new Button('div.selectStyles__control', 1);
         this.selectOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE'); 
         this.addNewClinicButton = new Button('button', 3)      
                
    }

    async goToAddClinic() {
        await this.addClinicButton.click();
    }

    async addNewClinic({ newClinicName, newClinicAddress, newClinicCity}) {
        await this.newClinicName.setValue(newClinicName);
        await this.newClinicAddress.setValue(newClinicAddress);
        await this.citySelector.click();
        await this.selectOption.clickByText(newClinicCity);
        await this.addNewClinicButton.click();
    }


}

module.exports = { ClinicsPage };
