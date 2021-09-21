const glob = require('glob');
const folder = 'D:/doc/*';
const getFile = require('./woker');

(async () => {
    await Promise.all(glob.sync(folder)
        .map(getFile));
})();
