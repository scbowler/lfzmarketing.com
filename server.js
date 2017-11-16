const app = require('express')();
const path = require('path');
const PORT = process.env.PORT || 4000;

const { emailList } = require('./data/test_data');
const { sortAndSave, parseCsv, readStudentList, readMarketingData } = require('./services/file_ops');
const { getData } = require('./services/firebase_ops');
require('./services/firebase_init');

const studentFileName = 'student_data';

app.get('/api/marketing-data/update-dev', (req, res) => {
    
    // const promises = emailList.map(getData);

    // Promise.all(promises).then( data => sortAndSave(data, res, true) ).catch( err => {
    //     res.status(500).send({success: false, msg: 'Error Saving Dev Marketing Data'});
    // });

    res.send({data: 'for testing switch to dev firebase'});
});

app.get('/api/marketing-data/update', (req, res) => {
    
    readStudentList(studentFileName).then(resp => {

        const promises = resp.data.map(getData);

        Promise.all(promises).then( data => sortAndSave(data, res) ).catch( err => {
            res.status(500).send({success: false, msg: 'Error Saving Marketing Data'});
        });
    });
});

app.get('/api/marketing-data', (req, res) => {
    readMarketingData().then( resp => {
        res.send(resp);
    }).catch( err => {
        res.status(500).send(err);
    });
});

app.get('/api/student-list/update', (req, res) => {

    csvToJson(studentFileName).then( resp => {
        res.send(resp);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/api/student-list', (req, res) => {

    readStudentList(studentFileName).then( resp => {
        res.send(resp);
    }).catch( err => {
        res.status(500).send(err);
    });
});



app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});
