var fs = require('fs');

var dataPath = __dirname + "/data.json";
global.config = {sampleDataPath: dataPath, dataDir: "./tmp-test"}

var data = JSON.parse(fs.readFileSync(dataPath));

module.exports = data