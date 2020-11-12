import { RxDocument } from 'rxdb';
import { HeroModel } from './hero.model'

export interface HeroDocMethods {
    hpPercent(): number;
}

export type HeroDocument = RxDocument<HeroModel, HeroDocMethods>

