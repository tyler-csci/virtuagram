import * as txtgen from 'txtgen';
import firebase, {firestore} from "../firebase";

const userList = [
    'ts2frbk22dUh1YVvCnGTjd2kquD2',
    'ycxNYCGnkLf6eUjR7IyBJKFBDmG2',
];
const postCount = 100;
function getTimestamp() {
    return firebase.firestore.Timestamp.now();
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    let wasCreated = [];
    for (let i=0; i < userList.length; i++){
        wasCreated[i] = false;
    }
    for (let i = 0; i < postCount; i++) {
        const chooseUser = getRandomIntInclusive(0, (userList.length-1));
        const uid = userList[chooseUser];
        const postDescription = txtgen.sentence();

        const reference = firestore.collection('feeds');
        const newDoc = reference.doc(uid);
        if (!wasCreated[chooseUser]) {
            newDoc.set({
                created: getTimestamp()
            });
        }
        const newCollection = newDoc.collection('timeline');


        newCollection.add({
            description: postDescription,
            timestamp: getTimestamp(),
        })
    }
}

export default generate();