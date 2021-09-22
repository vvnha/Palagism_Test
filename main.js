const glob = require('glob');
const folder = 'C:/Users/Admin/OneDrive/Documents/thuctap/*';
const getFile = require('./woker');
const keyword_extractor = require("keyword-extractor");


// folder = 'D:/doc/*;

// const file = glob.sync(folder);
// const temp = [];
// while (file.length) {
//     temp.push(file.splice(0, 10));
// }

// (async () => {
//     let i = 0;
//     while (i < temp.length) {
//         await Promise.all(temp[i]
//             .map(getFile));
//         i++;
//     }

// })();

const sentence =
    "Chào Mừng thế giới, nè hẽ"

//  Extract the keywords
const extraction_result =
    keyword_extractor.extract(sentence, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
    });

const sortPriority = (arr) => arr.sort(function (a, b) {
    return b.length - a.length;
});

console.log(sortPriority(extraction_result));