const axios = require('axios');
const fs = require('fs');
const { setTimeout } = require('timers/promises');

const { corpList } = require('./corpList.json');

const main = async () => {
  corpList.forEach(async (corpId) => {

    const url = `https://liveapi.innoforest.co.kr/seed/corp/v1/getseedcorpdata?corpId=${corpId}&chnlId=`
    // console.log(url);

    const config = {
      url,
      method: 'get',
      responseType: 'json',
      headers: {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,es-US;q=0.6,es;q=0.5",
        "origin": "https://www.innoforest.co.kr",
        "referer": "https://www.innoforest.co.kr/",
        "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjNhc2RmcUBzbnUuYWMua3IiLCJST0xFUyI6WyJVU0VSIl0sImV4cCI6MTY3MDIzODgzNCwiaWF0IjoxNjcwMTUyNDM0fQ.6i-QGMuw7nsoT9LVovbPmC_382SXG2eHaUE9lRn8Gkgs6IOM2Xr09ABkxbglrJvHW0uiWozXpLceu2XP3BIGCg",
      }
    };


    try {
      const result = await axios.request(config);

      fs.writeFile(`./jsons/${corpId}.json`, JSON.stringify(result.data.data, null, 2), (error) => {
        if (error) {
          console.log(error.message)
        }
      });

      await setTimeout(1000);
    } catch(e) {
      console.log("axios error: ", e.message);
    }
  })
}


main();