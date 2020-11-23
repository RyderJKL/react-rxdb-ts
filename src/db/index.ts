import {RxDatabase} from 'rxdb';

import collections, {Collections} from "./collections";

import {createRxDatabase, addRxPlugin} from 'rxdb'

import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode'

import {RxDBValidatePlugin} from 'rxdb/plugins/validate'

import {RxDBLeaderElectionPlugin} from 'rxdb/plugins/leader-election'
import {RxDBReplicationPlugin} from 'rxdb/plugins/replication'

import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
// import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
// https://github.com/pubkey/rxdb/blob/master/docs-src/questions-answers.md#cant-change-the-schema
import * as PouchdbAdapterMemory from 'pouchdb-adapter-memory';

export type Database = RxDatabase<Collections>;

if (process.env.NODE_ENV !== 'development') {
    addRxPlugin(RxDBDevModePlugin)
}

addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationPlugin);
addRxPlugin(PouchdbAdapterHttp);

if (process.env.NODE_ENV === 'development') {
    addRxPlugin(PouchdbAdapterMemory)
}

// const userAdapter = 'idb';
const userAdapter = 'memory';

console.log('hostname', window.location.hostname);
const syncURL = `http://` + window.location.hostname + ':3000/'

let doSync = true;

if (window.location.hash === '#nosync') {
    doSync = false;
}

let db: Database;

// 创建数据库
const createDatabase = async (): Promise<Database> => {
    if (db) return db;
    db = await createRxDatabase<Collections>({
        name: 'database',
        adapter: userAdapter,
        multiInstance: false
    })

    console.log('DatabaseService: created database');
    (window as any).db = db; // for debug

    // show leadership in title
    await db.waitForLeadership().then(() => {
        console.log('isLeader now');
        document.title = 'xxx' + document.title
    })

    // create collections;
    await Promise.all(
        collections
            .map((colData) =>
                db.collection(colData.baseCollection)
                    // @ts-ignore
                    .then((collection) => colData.hooks(collection, db))))

    // sync with server
    await db.hero.sync({
        remote: syncURL + '/hero'
    })

    return db;
}

const DatabaseService = {
    DB_CREATE_PROMISE: createDatabase(),
    get(): Promise<Database> {
        return this.DB_CREATE_PROMISE
    }
}

export default DatabaseService
