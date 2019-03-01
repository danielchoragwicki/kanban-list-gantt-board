const {
    Builder,
    By,
    Key
} = require('selenium-webdriver');
require("chromedriver");

(async function selenium() {
    let driver = await new Builder().forBrowser('chrome').build();
    async function clickFunc (className) {
        const element = await driver.findElement(By.className(className));
        await element.click();
        await driver.sleep(700);
    }

    async function sendKeysFunc (className, keys, key) {
        const element = await driver.findElement(By.className(className));
        key ? await element.sendKeys(keys, key) : await element.sendKeys(keys);
        await driver.sleep(700);
    }

    try {
        await driver.get('http://localhost:3000/');

        await clickFunc('board-item__link--add');

        await sendKeysFunc("addboard__input", "New board");

        await clickFunc('night-fade');

        await clickFunc('addboard__submit');

        await clickFunc('board-item__link night-fade');

        await sendKeysFunc("new-list__input", 'New list', Key.ENTER);

        await sendKeysFunc('new-card__input', 'New list', Key.ENTER);

        await clickFunc('card__edit-button');

        await sendKeysFunc('card-edit__desc', 'New desc');

        await clickFunc('button--save');

        // await sendKeysFunc('new-list__input', 'New list', Key.ENTER);

    } finally {
        await driver.sleep(2000);
        await driver.quit();
    }
})();