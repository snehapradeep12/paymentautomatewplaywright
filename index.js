const { chromium } = require('playwright');
const config = require('./config.json');



(async () => {
//Program start time
console.time("time");

//New Session
const browser = await chromium.launch({
    headless: false,
    slowMo: 60
});

const page = await browser.newPage();

////Defining Login Function
async function Login() {

await page.goto('https://'+config.canvas.host+'.in/', {timeout:120000} );
await page.click('#nav-link-accountList');
await page.waitForSelector('#ap_email');
await page.fill('#ap_email', config.canvas.email);
await page.click('.a-button-input');
await page.waitForSelector('#ap_password');
await page.fill('#ap_password', config.canvas.password);
await page.click('#auth-signin-button');
console.log('Succesfully Logged In as:', page.url());

}

//Defining Payment Function
async function Payment() {

//Navigate to Your Account Page
await page.waitForSelector('#nav-link-accountList');
await page.click('#nav-link-accountList');
await page.$("(//a[@class='ya-card__whole-card-link'])");
console.log('Successfully navigated to Your Account!');

//Navigate to Payment Options page
await page.click('text=Payment options');
 console.log('Successfully navigated to Payment Options!');
//scroll to Add your card link
await page.$("(//span[@class='a-expander-prompt'])");
await page.dblclick("(//span[@class='a-expander-prompt'])");

//Input card holder name
await page.fill('input[name="ppw-accountHolderName"]', config.canvas.cardName);

//Input Card number
await page.fill('input[type="tel"]', config.canvas.cardNNumber);
await page.click('.a-button-input');
console.log("Successfully added your card details!");

}

//Run this code

try{
    await Login()
    await Payment()

} catch(err) {

    console.log("Our Error", err);

}
//End time 
console.timeEnd("time");

})();