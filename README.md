
# backup_firestore_database

backup your firestore collection into a json &amp; save each item in a 'backup collection'.



## Installation

## Project setup

- get credentials in firebase console, your project > account service > generate new private key

- copy json in the project folder

Install backup_firestore with npm

```bash
  npm install backup_firestore_database
```
## Init project

```javascript
const backup = require('backup_firestore_database');

// your credentials
const key = require('./key.json');

// init database
const db = backup.init(key);
```

## Backup your collection to json file

```javascript
//copy 'my_collection' collection into backup.json
backup.backupCollectionToJson(db, 'my_collection');
```

## Make a 'backup' collection from backup.json

```javascript
//copy backup.json into 'backup' collection 
backup.backupCollection(db, 'my_collection', 'backup');
```

## Delete 'backup' collection

```javascript
//delete 'backup' collection from FireStore
backup.deleteBackupCollection(db, 'backup');
```


## Usage

```bash
  node index.js
```

