import schema  from './hero.schema'
import {
    RxCollection,
    RxCollectionHookNoInstanceCallback,
    RxDocument,
    RxCollectionCreator,
    RxCollectionGenerated
} from 'rxdb';
import { HeroModel } from './hero.model';

export type HeroDocument = RxDocument<HeroModel, HeroDocMethods>
export type HeroCollection = RxCollection<HeroModel, HeroDocMethods, {}>

export interface HeroDocMethods {
    hpPercent(hero: HeroDocument): number;
}

const heroCollection: RxCollectionCreator = {
    name: 'hero',
    schema: schema,
    methods: {
        hpPercent(this: HeroDocument): number {
            return this.hp / this.maxHP * 100;
        }
    },
}

export default heroCollection;
