const puppeteer = require('puppeteer');
const download  = require('download-file');



(async () => {
  try {
    const browser = await puppeteer.launch(); // {devtools: true} if you want debug inside evaluate function
    const page = await browser.newPage();
    const listMp3Url = [];
    await page.goto('http://www.bbc.co.uk/learningenglish/english/features/6-minute-english');

    const listUrlPages = await page.evaluate(() => {
      const listUrl = [];
      const ulTag = document.querySelector('.widget ul.threecol');

      for (let liTag of ulTag.children) {
        listUrl.push( liTag.querySelector('a').href );
      }

      return listUrl;
    });


    const tinyArray = listUrlPages.slice(0,4);

    for(let i=0; i < tinyArray.length -1;i++){
      await page.goto(tinyArray[i]);
      const urlMp3Download = await page.evaluate(() => {
        return document.querySelector('.bbcle-download-extension-mp3').href;
      });

      const urlMp3Split = urlMp3Download.split('/');
      const filename = urlMp3Split[urlMp3Split.length - 1];

      const options = {
        directory: "./download",
        filename
      }

      download(urlMp3Download, options, function(err){
        if (err) throw err
        listMp3Url.push(urlMp3Download);
      });
    }





    debugger;

    page.close()
    await browser.close();
  } catch (error){
    console.error(error);
  }

})();
