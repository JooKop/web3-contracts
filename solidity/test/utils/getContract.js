const path = require('path');
const fs = require('fs');

module.exports = function (contract) {
    const contractFile = fs.readFileSync(path.resolve(__dirname, '../../build/' + contract), "utf8");
    return JSON.parse(contractFile);
};
