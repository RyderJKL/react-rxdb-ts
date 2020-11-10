import { RxDocument, RxCollection } from 'rxdb';
import { HeroModel } from './hero.model'

export type HeroDocument = RxDocument<HeroModel, {}>
export type HeroCollection = RxCollection<HeroDocument, {}, {}>
export { default } from './hero.collection';
