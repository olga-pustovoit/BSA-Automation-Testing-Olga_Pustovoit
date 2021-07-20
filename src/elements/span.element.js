const { BaseElement } = require('./base.element');

class Span extends BaseElement {
  constructor(selector, index) {
    super(selector, index);
  }

  async getText() {
    let element;
    if (this.index) {
      element = (await $$(this.selector))[this.index];
    } else {
      element = await $(this.selector);
    }
    await this.waitForVisible(element);
    await element.getText();
  }
}

module.exports = { Span };
