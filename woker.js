const { Worker, isMainThread, threadId, workerData, parentPort } = require('worker_threads');
const getContent = require('./getContent');
var difflib = require('difflib');
const path1 = 'C:/Users/Admin/Downloads/BaoCaoThucTap.docx';

const getContentFromPath = async (path) => {
    var dot = path.lastIndexOf("/");
    var name = path.substr(dot + 1, path.length);
    let data = await getContent.getContent(path, name);
    if (data === null || data.trim() === null) {
        throw new Error('file empty!');
        return;
    }
    return data.toLowerCase();
}

const getSimilitary = async (path2, path3) => {
    let data1 = await getContentFromPath(path2);
    let data2 = await getContentFromPath(path3);
    var similarity = new difflib.SequenceMatcher(null, data1, data2).ratio();
    return similarity;
}

if (isMainThread) {
    module.exports = (file) => new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
            workerData: file
        });
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error('error'))
            }
        })
    })
} else {
    (async () => {
        const simi = await getSimilitary(path1, workerData);
        console.log(simi + "~" + workerData)
        parentPort.postMessage(workerData);
    })();
}
