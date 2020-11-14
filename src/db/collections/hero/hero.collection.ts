import schema  from './hero.schema'
import {RxCollection, RxDocument} from 'rxdb';
import { HeroModel } from './hero.model';

export type HeroDocument = RxDocument<HeroModel, HeroDocMethods>
export type HeroCollection = RxCollection<HeroModel, HeroDocMethods, {}>

export interface HeroDocMethods {
    hpPercent(): number;
}

const heroCollection = {
    name: 'hero',
    schema,
    methods: {
        hpPercent(this: HeroDocument): number {
            return this.hp / this.maxHP * 100;
        }
    },
    sync: true
}

export default heroCollection;
