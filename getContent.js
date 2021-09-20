var fs = require('fs');
var PdfReader = require("pdfreader").PdfReader;
var filereader = require('./filereader');
var XLSX = require('xlsx');
const pdfParse = require('pdf-parse');

exports.getContent = (path, name) => {
    let filecontent = "";
    return new Promise((resolve, reject) => {
        fs.readFile(path, async (err, data) => {
            let filePath = path;
            let filebuffer = data;
            let filename = name;
            var fileextension = await filereader.getFileExtension(filename);
            switch (fileextension) {
                case '.pdf':
                    filecontent = await readPdfContent(filePath);
                    break;
                case '.docx':
                case '.doc':
                    filecontent = await filereader.extract(filePath).then(function (res, err) {
                        if (err) {
                            console.log(err);
                        }
                        return res;
                    })
                    break;
                default:
                    filecontent = filename;
                    break;
            }
            resolve(filecontent);
        });
    })
}

const readPdfContent = async (uri) => {
    const buffer = fs.readFileSync(uri);
    try {
        const data = await pdfParse(buffer);

        return data.text;
    } catch (err) {
        throw new Error(err);
    }
}