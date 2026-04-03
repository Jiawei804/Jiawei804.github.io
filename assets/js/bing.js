const https = require('https')
const fs = require('fs')

const options = {
  hostname: 'www.bing.com',
  port: 443,
  path: '/HPImageArchive.aspx?format=js&idx=0&n=8',
  method: 'GET'
}

const req = https.request(options, bing_res => {
  let bing_body = [], bing_data = {};
  if (bing_res.statusCode !== 200) {
    console.error(`Bing API request failed: status ${bing_res.statusCode}`);
    bing_res.resume();
    process.exitCode = 1;
    return;
  }
  bing_res.on('data', (chunk) => {
    bing_body.push(chunk);
  });
  bing_res.on('end', () => {
    try {
      bing_body = Buffer.concat(bing_body);
      bing_data = JSON.parse(bing_body.toString());
      if (!bing_data.images || !Array.isArray(bing_data.images)) {
        throw new Error('Invalid Bing response payload: missing images array');
      }
      let img_array = bing_data.images;
      let img_url = [];
      img_array.forEach(img => {
        img_url.push(img.url);
      });
      var jsonpStr = "getBingImages(" + JSON.stringify(img_url) + ")";
      fs.writeFile('./assets/json/images.json', jsonpStr, (err) => {
        if (err) {
          throw err;
        }
        console.log("JSON data is saved: " + jsonpStr);
      });
    } catch (error) {
      console.error('Failed to parse Bing response:', error.message);
      process.exitCode = 1;
    }
  });
})

req.on('error', error => {
  console.error(error)
})

req.end()