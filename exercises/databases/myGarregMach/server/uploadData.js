import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { exit } from 'process';

const dbData = readFileSync('./dbData.json', 'utf-8');
const jsonData = JSON.parse(dbData);

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = JSON.parse(readFileSync('./fireBaseConfig.json', 'utf-8'));

const app = initializeApp({
    apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
});

const db = getFirestore(app);


async function pushData() {
    try {
        for (const col of Object.keys(jsonData)) {
            const newCollect = collection(db, col);
    
            for (const data of jsonData[col]) {
                const newDoc = await addDoc(newCollect, data);
                console.log('Document written with ID: ', newDoc.id);
            }
        }

    } catch (e) {
        console.error('Error adding document: ', e);
    }

}

await pushData();
console.log('FINISHED UPLOADING!');
exit(0);

