import {
    RxHeroesDatabase,
    RxHeroesCollections,
    RxHeroDocument,
    RxHeroDocumentType,
} from '../type'

import HeroSchema from '../schema/Hero.schema'

import { createRxDatabase, addRxPlugin  } from 'rxdb/dist/types/core'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { RxDBLeaderElectionPlugin  } from 'rxdb/plugins/leader-election'
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'

import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';

if (process.env.NODE_ENV !== 'development') {
    addRxPlugin(RxDBDevModePlugin)
}

addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationPlugin);
addRxPlugin(PouchdbAdapterHttp);
addRxPlugin(PouchdbAdapterIdb)

const userDdapther = 'idb';

const collections = [
    {
        name: 'heroes',
        schema: HeroSchema,
        methods: {
            hpPercent(this: RxHeroDocument): number {
                return this.hp / this.maxHP * 100
            }
        },
        sync: true
    }
]

console.log('hostname', window.location.hostname);
const syncURL = `http://` + window.location.hostname + ':3001/'

let doSync = true;

if (window.location.hash === '#nosync') { doSync = false; }

// 创建数据库
const createDatabase = async (): Promise<RxHeroesDatabase> => {
    console.log('DatabaseService: creating database...');
    const db = await createRxDatabase<RxHeroesCollections>({
        name: 'heroes',
        adapter: userDdapther
        // password
    })
    console.log('DatabaseService: created database');
    (window as any).db = db; // for debug

   // show leadership in title
    db.waitForLeadership().then(() => {console.log('isLeader now'); document.title = 'xxx' + document.title})

    // create collections;
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map((colData) => db.collection(colData)))

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.heroes.preInsert((docObj: RxHeroDocumentType) => {
        const color = docObj.color;
        return db.collections.heroes.findOne({
            selector: {
                color
            }
        }).exec().then(((has: RxHeroDocument | null) => {
           if (has != null) {
               console.error('another hero already has the color', color);
               throw new Error('color already there');
           }
           return db
        }))
    }, true)

    // sync with server
    console.log('DatabaseService: sync');
    await db.heroes.sync({
        remote: syncURL + '/hero'
    })

    return db;
}

const DatabaseService = {
    DB_CREATE_PROMISE: createDatabase(),
    get (): Promise<RxHeroesDatabase> {
        return this.DB_CREATE_PROMISE
    }
}

export default DatabaseService
