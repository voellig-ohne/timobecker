const fs = require('fs');
const _ = require('lodash');

const json = fs.readFileSync('paintings.json', 'utf8')
const parsed = JSON.parse(json);

_.forEach(parsed, (painting, code) => {
    fs.writeFile('paintingsSingle/' + code + '.json', JSON.stringify(painting), (err) => {
        if (err) throw err;
        console.log('It\'s saved! ', code);
    });
})