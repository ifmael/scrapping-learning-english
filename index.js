const puppeteer = require('puppeteer');

(async () => {
  try {
    const USERNAME_SELECTOR = '#bbcle-content > div > div.widget-container.widget-container-full > div.widget.widget-bbcle-coursecontentlist.widget-bbcle-coursecontentlist-standard.widget-progress-enabled > ul';
    const browser = await puppeteer.launch({devtools: true}); // {devtools: true} if you want debug inside evaluate function
    const page = await browser.newPage();
    await page.goto('http://www.bbc.co.uk/learningenglish/english/features/6-minute-english');
  
    const result = await page.evaluate(() => {
      debugger;
      return document.querySelector('ul').length;
    })
    console.log(result);
    await browser.close();
  } catch (error){
    console.error(error);
  }

})();