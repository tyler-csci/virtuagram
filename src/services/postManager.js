import firebase, { analytics, auth, firestore, storage } from '../firebase';

const postManager = {};

postManager.getFeed = (fields) => {
    return new Promise((resolve, reject) => {
        if (!fields){
            reject();

            return;
        }

        const lastVisit = fields.lastVisit;
    });
};

function getTime() {
    return firebase.firestore.Timestamp.now();
}

postManager.post = (file, description) => {
    return new Promise((resolve, reject) => {
        if (!file){
            reject();

            return;
        }

        const obj = file;
        const description = description;

        if (!obj){
            reject();

            return;
        }

        const currentUser = auth.currentUser;

        if (!currentUser){
            reject();

            return;
        }

        const uid = currentUser.uid;

        if (!uid){
            reject();

            return;
        }
        const storageReference = storage.ref().child('images').child(uid).child(getTime().toString());

        if (!storageReference) {
            reject();

            return;
        }

        storageReference.put(file).then((uploadTaskSnapshot) =>{

            storageReference.getDownloadURL().then((value) => {
                firestore.collection('feed').doc(uid).collection('timeline').add(
                    {
                        timestamp: getTime(),
                        objURL: value,
                        description: description
                    }
                ).then((value) => {
                    analytics.logEvent('create post');

                    resolve(value);
                }).catch((reason) => {
                    reject(reason);
                });
            }).catch((reason) => {
                reject(reason);
            });
        }).catch((reason) => {
            reject(reason);
        });
    });
};

postManager.getTimeLine = () => {
    return new Promise((resolve, reject) =>
    {
        const currentUser = auth.currentUser;

        if (!currentUser){
            reject();

            return;
        }

        const uid = currentUser.uid;

        if (!uid){
            reject();

            return;
        }

        const reference = firestore.collection('feeds').doc(uid).collection('timeline');

        if (!reference) {
            reject();

            return;
        }

        reference.orderBy('timestamp').then((value) => {
            analytics.logEvent('get timeline');

            resolve(value);
        }).catch((reason) => {
            reject(reason);
        });

    });
};
export default postManager;