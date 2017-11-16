const path = require('path');
const fs = require('fs');
const parse = require('csv-parse');

exports.sortAndSave = function(data, res, dev){
    const userData = [];
    const badEmails = [];

    const finalData = {
        user: {
            file: `data/${dev ? 'dev-' : ''}data.json`,
            data: []
        },
        'no-user': {
            file: `data/${dev ? 'dev-' : ''}bad-emails.json`,
            data: []
        }
    }
    
    data.map( item => {
        if(finalData[item.type]){
            finalData[item.type].data.push(item.data);
        }
    });

    const promises = Object.keys(finalData).map( key => {
        const item = finalData[key];
        return saveData(item.file, item.data, true);
    });

    Promise.all(promises).then(()=>{
        console.log('IT WORKED!');
        res.send({success: true});
    }).catch((err) => {
        console.log('FAIL FAIL', err);
        res.send({success: false, msg: 'Error Saving Dev Data'});
    })
}

function saveData(filename, dataToAppend, cleanFile = false){
    return new Promise((resolve, reject) => {

        const filePath = path.resolve( __dirname, '..', filename);

        fs.readFile(filePath, (err, data) => {
            if(err) {
                console.log('ERROR:', err);
                reject(err);
                return;
            }

            if(cleanFile){
                fs.writeFile(filePath, JSON.stringify(dataToAppend), resolve);
                return;
            }
            
            if(data == ''){
                var updatedData = Array.isArray(dataToAppend) ? dataToAppend : [ dataToAppend ];
            } else {
                updatedData = JSON.parse(data);
                updatedData.push(dataToAppend);
            }

            fs.writeFile(filePath, JSON.stringify(updatedData), resolve);
        })
    });
}

function csvToJson(fileName){
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '..', 'data', `${fileName}.csv`);
        
        fs.readFile(filePath, (err, data) => {
            if(err){
                reject({error: err, msg: 'csv file read error'});
                return;
            }
    
            parse(data, {columns: true}, (err, output) => {
                if(err){
                    reject({error: err, msg: 'csv parse error'});
                    return;
                }
                const studentDataPath = path.resolve(__dirname, '..', 'data', `${fileName}.json`);
    
                fs.writeFile(studentDataPath, JSON.stringify(output), err => {
                    if(err){
                        reject({error: err, msg: 'error writing student list json file'});
                        return;
                    }
    
                    resolve({success: true});
                });
            });
        });
    });
}

function readStudentList(filename){
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '..', 'data', `${filename}.json`);

        fs.readFile(filePath, (err, data) => {
            if(err){
                reject({success: false, msg: 'error reading student list data'});
                return;
            }

            resolve({success: true, data: JSON.parse(data)});
        });
    });
}

function readMarketingData(){
    return new Promise((resolve, reject) => {
        const dataPath = path.resolve(__dirname, '..', 'data', 'data.json');
        const badListPath = path.resolve(__dirname, '..', 'data', 'bad-emails.json');

        fs.readFile(dataPath, (err, data) => {
            if(err){
                reject({success: false, msg: 'error reading marketing data'});
                return;
            }
            fs.readFile(badListPath, (err, badList) => {
                if(err){
                    reject({success: false, msg: 'error reading bad list data'});
                    return;
                }
                
                resolve({success: true, data: JSON.parse(data), badList: JSON.parse(badList)});
            });
        });
    });
}

exports.saveData = saveData;
exports.csvToJson = csvToJson;
exports.readStudentList = readStudentList;
exports.readMarketingData = readMarketingData;
