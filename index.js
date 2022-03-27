const admin = require('firebase-admin');
const utils = require('./utils')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
/**
 * Make the backup (read collection & write to json, delete old backup, read json & save in backup collection)
 * @param db
 * @param myCollection
 * @param backupCollection
 */
exports.backupCollection = function (db, myCollection, backupCollection) {
    readline.question(`Are you sure you want to make a backup of ${myCollection} in the collection named ${backupCollection} ?[yes]/no : `, async function (answer) {
        if (answer === 'no') {
            console.log("Ok, bye.");
            process.exit(1);
        } else  {
            utils.backupCollectionToJson(db, myCollection).then(() => utils.deleteCollection(db, backupCollection).then(() => utils.saveBackupToFirestore(db, backupCollection)));
        }
    });
};

/**
 * save collection in a json
 * @param db
 * @param collection
 */
exports.backupCollectionToJson = function (db, collection) {
    readline.question(`Are you sure you want to make a backup of ${collection} in backup.json ?[yes]/no : `, async function (answer) {
        if (answer === 'no') {
            console.log("Ok, bye.");
            process.exit(1);
        } else  {
            await utils.backupCollectionToJson(db, collection);
        }
    });
};

/**
 * delete backup collection
 * @param db
 * @param backupCollection
 */
exports.deleteBackupCollection = function (db, backupCollection) {
    readline.question(`Are you sure you want to delete ${backupCollection} ?[yes]/no : `, async function (answer) {
        if (answer === 'no') {
            console.log("Ok, bye.");
            process.exit(1);
        } else  {
            await utils.deleteCollection(db, backupCollection);
        }
    });
};
/**
 * copy json to database
 * @param db
 * @param collection
 */
exports.backupJsonToCollection = function (db, collection) {
    readline.question(`Are you sure you want to copy backup.json in ${collection} ?[yes]/no : `, async function (answer) {
        if (answer === 'no') {
            console.log("Ok, bye.");
            process.exit(1);
        } else  {
            await utils.saveBackupToFirestore(db, collection);
        }
    });
}

/**
 * Initialize admin SDK using serciceAcountKey
 * @param key
 */
exports.init = function (key) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(key)
        });
        console.log('Successfully connected to Firebase !');
    } catch (e) {
        throw new Error(`It seems there's a problem : ${e.code}`);
    }

    const db = admin.firestore();
    db.settings({ignoreUndefinedProperties: true});
    return db;
};
