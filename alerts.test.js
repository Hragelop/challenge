import {test, expect} from '@playwright/test';


test('Alert with OK', async ({page}) => {

    await page.goto("file:///C:/Users/c.aggelopoulos/Desktop/speedcast-sc-qa-challenge-018d94fddb10/index.html")
    
    //Alert handling enabling
    page.on('dialog',async dialog=>{
        expect (dialog.type()).toContain('alert')
        expect (dialog.message()).toContain('I am a JS Alert')
        await dialog.accept();
    })

    //Click first alert by xpath
    await page.click('//*[@id="content"]/div/ul/li[1]/button');
    await page.waitForTimeout(3000);
})

test('Alert with confirmation dialogue for OK', async ({page}) => {

    await page.goto("file:///C:/Users/c.aggelopoulos/Desktop/speedcast-sc-qa-challenge-018d94fddb10/index.html")
    
    //Enabling dialogue handler
    page.on('dialog',async dialog=>{
        expect (dialog.type()).toContain('confirm')
        expect (dialog.message()).toContain('I am a JS Confirm')
        await dialog.accept(); //close by OK
    })
    
    //Click second alert by xpath
    await page.click('//*[@id="content"]/div/ul/li[2]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText('You clicked: Ok')
    await page.waitForTimeout(3000);
})

test('Alert with confirmation dialogue for cancel', async ({page}) => {

    await page.goto("file:///C:/Users/c.aggelopoulos/Desktop/speedcast-sc-qa-challenge-018d94fddb10/index.html")
    
    //Enabling dialogue handler for custom handling
    page.on('dialog',async dialog=>{
        expect (dialog.type()).toContain('confirm')
        expect (dialog.message()).toContain('I am a JS Confirm')
        await dialog.dismiss(); //close by Cancel
    })
    
    //Click second alert by xpath
    await page.click('//*[@id="content"]/div/ul/li[2]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText('You clicked: Cancel')
    await page.waitForTimeout(3000);
})


test('Alert with prompt for OK', async ({page}) => {

    await page.goto("file:///C:/Users/c.aggelopoulos/Desktop/speedcast-sc-qa-challenge-018d94fddb10/index.html")
    
    //Enabling dialogue handler
    page.on('dialog',async dialog=>{
        expect (dialog.type()).toContain('prompt')
        expect (dialog.message()).toContain('I am a JS prompt')

        await dialog.accept('asdf'); //close by OK
    })
    
    //Click third alert by xpath
    await page.click('//*[@id="content"]/div/ul/li[3]/button')
    await expect(page.locator('//*[@id="result"]')).toHaveText('You entered: asdf')
    await page.waitForTimeout(3000);
})

test('Alert with prompt for cancel', async ({page}) => {

    await page.goto("file:///C:/Users/c.aggelopoulos/Desktop/speedcast-sc-qa-challenge-018d94fddb10/index.html")
    
    //Enabling dialogue handler
    page.on('dialog',async dialog=>{
        expect (dialog.type()).toContain('prompt')
        expect (dialog.message()).toContain('I am a JS prompt')

        await dialog.dismiss(); //close by cancel
    })
    
    //Click third alert by xpath
    await page.click('//*[@id="content"]/div/ul/li[3]/button')
    await expect(page.locator('//*[@id="result"]')).toHaveText('You entered: null')
    await page.waitForTimeout(3000);
})