const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');
// const config = require('./config');
const { emailList } = require('./data/test_data');
const { sortAndSave, parseCsv, readStudentList, readMarketingData } = require('./services/file_ops');
const { getData } = require('./services/firebase_ops');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

const studentFileName = 'student_data';

module.exports = function(app){
    app.get('/api/marketing-data/update-dev', requireAuth, Authentication.verifyToken, (req, res) => {
        
        res.send({msg: 'Not Authorized', auth: false});
        
        // const promises = emailList.map(getData);
    
        // Promise.all(promises).then( data => sortAndSave(data, res, true) ).catch( err => {
        //     res.status(500).send({success: false, msg: 'Error Saving Dev Marketing Data'});
        // });
    
        // res.send({data: 'for testing switch to dev firebase'});
    });
    
    app.get('/api/marketing-data/update', requireAuth, Authentication.verifyToken, (req, res) => {
        
        res.send({msg: 'Not Authorized', auth: false});
    
        // readStudentList(studentFileName).then(resp => {
    
        //     const promises = resp.data.map(getData);
    
        //     Promise.all(promises).then( data => sortAndSave(data, res) ).catch( err => {
        //         res.status(500).send({success: false, msg: 'Error Saving Marketing Data'});
        //     });
        // });
    });
    
    app.get('/api/marketing-data', requireAuth, Authentication.verifyToken, (req, res) => {
    
        readMarketingData().then( resp => {
            res.send(resp);
        }).catch( err => {
            res.status(500).send(err);
        });
    });
    
    app.get('/api/student-list/update', requireAuth, Authentication.verifyToken, (req, res) => {
    
        res.send({msg: 'Not Authorized', auth: false});
    
        // csvToJson(studentFileName).then( resp => {
        //     res.send(resp);
        // }).catch(err => {
        //     res.status(500).send(err);
        // });
    });
    
    app.get('/api/student-list', requireAuth, Authentication.verifyToken, (req, res) => {
    
        readStudentList(studentFileName).then( resp => {
            res.send(resp);
        }).catch( err => {
            res.status(500).send(err);
        });
    });

    app.post('/auth/sign-up', Authentication.signUp);
    app.post('/auth/sign-in', requireSignIn, Authentication.signIn);
    
    app.get('/health-check', (req, res) => res.sendStatus(200));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
