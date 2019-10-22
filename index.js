const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({devtools: true}); // {devtools: true} if you want debug inside evaluate function
    const page = await browser.newPage();

    await page.goto('http://www.bbc.co.uk/learningenglish/english/features/6-minute-english');

    const listUrlPages = await page.evaluate(() => {
      const listUrl = [];
      const ulTag = document.querySelector('.widget ul.threecol');

      for (let liTag of ulTag.children) {
        listUrl.push( liTag.querySelector('a').href );
      }

      return listUrl;
    });


    listUrlPages.forEach( async urlPage => {
      debugger;
      await page.goto(urlPage);
      const x = await page.evaluate(() => {
        debugger;
       /*  const aTag = document.querySelector('.bbcle-download-extension-mp3');
        debugger;
        return listUrl; */
      });
    }); 

    await browser.close();
  } catch (error){
    console.error(error);
  }

})();
