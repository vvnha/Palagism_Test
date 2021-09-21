const { Worker, isMainThread, threadId, workerData, parentPort } = require('worker_threads');

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
    console.log(`${threadId} starting ${workerData}`);
    //console.log(workerData);
    parentPort.postMessage(workerData);
}
