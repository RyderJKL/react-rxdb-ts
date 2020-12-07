import schema  from './hero.schema'
import {
    RxCollection,
    RxDocument,
} from 'rxdb';
import { HeroModel } from './hero.model';

import methods, { HeroDocMethods } from './hero.document.methods';
import statics, { HeroCollectionStatics } from './hero.collection.statics'

export type HeroDocument = RxDocument<HeroModel, HeroDocMethods>
export type HeroCollection = RxCollection<HeroModel, HeroDocMethods, HeroCollectionStatics>

const heroCollection = {
    name: 'hero',
    schema: schema,
    // for collection
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    statics: statics,
// : {
//         statics
//         // getName () {
//         //     console.log(this, 'this')
//         // },
//         // createHero$ () {
//         //     console.log(this, 'createHero this')
//         // }
//     },
    // for document
    methods: methods
}

export default heroCollection;
