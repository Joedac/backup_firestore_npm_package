const fs = require('fs');

/**
 * Save all collection in a json
 * @returns {Promise<void>}
 */
async function backupCollectionToJson(db, collection) {
    const snapshot = await db.collection(collection).get().catch(e => console.log('Error: ', e.message));
    if (snapshot.empty) {console.log('Collection not exist, abort writing json');return;}
    let backup = snapshot.docs.map(doc => doc.data());
    this.countWrite = snapshot.docs.length;
    fs.writeFile("backup.json", JSON.stringify(backup, null, 2),
        (err) => {
            if (err)
                throw new Error(`It seems there's a problem : ${err.code}`);
            else
                console.log('Write json success')
        });
}

/**
 * record every items in backup collection
 * @returns {Promise<void>}
 */
async function saveBackupToFirestore(db, collection) {
    await fs.readFile('backup.json', (err, json) => {
        if (err) throw err;
        let backup = JSON.parse(json);
        let countRead = backup.length;
        if (this.countWrite !== countRead) throw  new Error('countWrite and countRead does not match !');
        backup.forEach(function (item) {
            db.collection(collection).doc().set(item)
                .then(function (docRef) {
                    console.log("Document written for: ", item.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    })
}

/**
 * delete old backup
 * @returns {Promise<void>}
 */
async function deleteCollection(db, collection) {
    let batch = db.batch();
    await db.collection(collection).listDocuments().then(item => {
        item.map((item) => {
            batch.delete(item);
        });
        batch.commit();
    }).catch(e => console.log('Error: ', e.message))
}

module.exports.backupCollectionToJson = backupCollectionToJson;
module.exports.saveBackupToFirestore = saveBackupToFirestore;
module.exports.deleteCollection = deleteCollection;
