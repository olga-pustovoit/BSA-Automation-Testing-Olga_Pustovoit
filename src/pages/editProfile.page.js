const { Button, Input } = require('../elements');

class EditProfilePage {
    constructor() {
        this.profileNameField = new Input('input[name="name"]', 1);
        this.profileSernameField = new Input('input[name="surname"]');
        this.submitEditButton = new Button('button', 5);
    }
    
    async changeProfileName({newProfileName, newProfileSername}) {
        await this.profileNameField.setValue(newProfileName);
        await this.profileSernameField.setValue(newProfileSername);
        await this.submitEditButton.click();
    }
}

module.exports = { EditProfilePage };
