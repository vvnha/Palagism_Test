const glob = require('glob');
const folder = 'D:/doc/*';
const getFile = require('./woker');

const file = glob.sync(folder);
const temp = [];
while (file.length) {
    temp.push(file.splice(0, 10));
}

(async () => {
    let i = 0;
    while (i < temp.length) {
        await Promise.all(temp[i]
            .map(getFile));
        i++;
    }

})();