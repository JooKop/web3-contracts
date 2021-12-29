const path = require('path');
const fs = require('fs');

module.exports = function (contract) {
    try {
        const contractFile = fs.readFileSync(path.resolve(__dirname, '../build/' + contract), "utf8");
        return JSON.parse(contractFile);
    }
    catch (e) {
        throw(`Failed to load contract '${contract}' from the build folder. Please run 'npm run compile' first, or test with 'npm run testc'.`);
    }
};
