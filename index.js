const getContent = require('./getContent');
var difflib = require('difflib');
const path1 = 'C:/Users/Admin/Downloads/BaoCaoThucTap.docx';
const path2 = 'C:/Users/Admin/Downloads/Enclave_Professional_Email_Account_and_Usage~26072021.pdf'
const path3 = 'C:/Users/Admin/Downloads/689-cau-trac-nghiem-kinh-te-chinh_tri.pdf'
const path4 = 'C:/Users/Admin/Downloads/BCTTTN_102160071_1610_16T1_NguyenThiThuTrang.docx'
const name1 = 'BaoCaoThucTap.docx';
const name2 = 'Enclave_Professional_Email_Account_and_Usage~26072021.pdf';
const name3 = '689-cau-trac-nghiem-kinh-te-chinh_tri.pdf'

const getSimilitary = async (path2, path3) => {
    let data1 = await getContentFromPath(path2);
    let data2 = await getContentFromPath(path3);
    var similarity = new difflib.SequenceMatcher(null, data1, data2).ratio();
    console.log(similarity);
}

const getContentFromPath = async (path) => {
    var dot = path.lastIndexOf("/");
    var name = path.substr(dot + 1, path.length);
    let data = await getContent.getContent(path, name);
    return data.toLowerCase();
}

getSimilitary(path1, path4);

