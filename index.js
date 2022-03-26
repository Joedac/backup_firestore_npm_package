const admin = require('firebase-admin');
const utils = require('./utils')
/**
 * Make the backup (read collection & write to json, delete old backup, read json & save in backup collection)
 * @param db
 * @param myCollection
 * @param backupCollection
 */
exports.backupCollection = function (db, myCollection, backupCollection) {
    utils.backupCollectionToJson(db, myCollection).then(() => utils.deleteCollection(db, backupCollection).then(() => utils.saveBackupToFirestore(db, backupCollection)));
};

/**
 * save collection in a json
 * @param db
 * @param collection
 */
exports.backupCollectionToJson = function (db, collection) {
    utils.backupCollectionToJson(db, collection);
};

/**
 * delete backup collection
 * @param db
 * @param backupCollection
 */
exports.deleteBackupCollection = function (db, backupCollection) {
    utils.deleteCollection(db, backupCollection);
};
/**
 * copy json to database
 * @param db
 * @param collection
 */
exports.backupJsonToCollection = function (db, collection) {
    utils.saveBackupToFirestore(db, collection);
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
    } catch (e) {
        throw new Error(`It seems there's a problem : ${e.code}`);
    }

    const db = admin.firestore();
    db.settings({ignoreUndefinedProperties: true});
    return db;
};
