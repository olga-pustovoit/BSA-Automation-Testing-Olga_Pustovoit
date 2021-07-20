const { Button } = require('../elements');

class MainPage {
    constructor() {
        this.myProfileButton = new Button('a[class="link_link__3zEN3"]', 1);        
        this.clinicsButton = new Button('a[class="link_link__3zEN3"]', 0);        
    }

    async goToMyProfile() {
        await this.myProfileButton.click();        
    }

    async goToClinics() {
        await this.clinicsButton.click();        
    }
}

module.exports = { MainPage };
