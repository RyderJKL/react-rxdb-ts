import heroSchema  from './hero.schema'
import { RxCollection } from 'rxdb';
import { HeroModel } from './hero.model';
import { HeroDocument, HeroDocMethods } from './hero.document'

export type HeroCollection = RxCollection<HeroModel, HeroDocMethods, {}>

const userCollection = {
    name: 'heroes',
    schema: heroSchema,
    pouchSettings: {},
    statics: {},
    methods: {
        hpPercent(this: HeroDocument): number {
            return this.hp / this.maxHP * 100;
        }
    },
    attachments: {},
    options: {},
    migrationStrategies: {},
    autoMigrate: true,
    cacheReplacementPolicy: function(){},
    sync: true
}

export default userCollection;
