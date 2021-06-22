const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
// Felkod vid test "ReferenceError: jasmine is not defined" jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5; // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});

describe("Pop button", () => {
  it('Should make sure that element is a text and not integer', async () => {
    let push = await driver.findElement(By.id("push"));
    await push.click();
    let alert = await driver.switchTo().alert();
    await alert.sendKeys(1);
    await alert.accept();
    let peek = await driver.findElement(By.id("peek"));
    peek.click();
    let peeked_value = await driver.findElement(By.id("top_of_stack")).getText();
    expect(peeked_value).toBeDefined();
    expect(peeked_value).toEqual("1");

  });
});
