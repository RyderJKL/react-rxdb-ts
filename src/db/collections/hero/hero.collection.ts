import schema  from './hero.schema'
import {
    RxCollection,
    RxDocument,
    RxCollectionCreator,
} from 'rxdb';
import { HeroModel } from './hero.model';

export type HeroDocument = RxDocument<HeroModel, HeroDocMethods>
export type HeroCollection = RxCollection<HeroModel, HeroDocMethods, HeroCollectionStatics>

export interface HeroDocMethods {
    hpPercent(this: HeroDocument): number;
}

export interface HeroCollectionStatics {
    getName: (this: HeroCollection) => string;
}

const heroCollection = {
    name: 'hero',
    schema: schema,
    statics: {
        getName (this: HeroCollection) {
            console.log(this.name, 'hero collection name')
            return this.name;
        }
    },
    methods: {
        hpPercent(this: HeroDocument): number {
            const result = this.hp / this.maxHP * 100;
            console.log(result, 'result')
            return result;
        }
    },
}

export default heroCollection;
