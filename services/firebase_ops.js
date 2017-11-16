const firebase = require('firebase');

exports.getData = function(student){
    return new Promise((res, rej) => {

        const userRef = firebase.database().ref('users/').orderByChild('email').equalTo(student.email);
        
        userRef.once('value').then( (snapshot, err) => {
            
            const userData = snapshot.val();
    
            if(userData){
                const userId = Object.keys(userData)[0];
    
                const trackingPath = `trackingData/${userData[userId].tracking_id}/`;
    
                const trackingDataRef = firebase.database().ref(trackingPath);
    
                trackingDataRef.once('value').then( (snapshot, err) => {
                    const trackingData = snapshot.val();
    
                    const finalData = {
                        ...userData[userId],
                        _id: userId,
                        tracking_data: trackingData,
                        confirmed_data: student
                    };
    
                    res({type: 'user', data: finalData});
                }).catch( err => {
                    console.log('GET TRACKING ERROR:', err.message);
                    rej(err);
                });
            } else {
                res({type: 'no-user', data: student});
            }
        }).catch( err => {
            console.log('GET USER ERROR:', err.message);
            rej(err);
        });
    });
}
