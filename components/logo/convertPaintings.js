const fs = require('fs');

const json = fs.readFileSync('paintings.json', 'utf8');
const parsed = JSON.parse(json);

// CONVERTED WHEN REMOVING LODASH DEPENDENY. NOT TESTED 🙃
Object.entries(parsed).forEach(([code, painting]) => {
    fs.writeFile('paintingsSingle/' + code + '.json', JSON.stringify(painting), (err) => {
        if (err) throw err;
        console.log("It's saved! ", code);
    });
});
