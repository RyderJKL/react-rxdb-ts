import { RxDocument, RxCollection } from 'rxdb';
import { HeroModel } from './hero.model'

export type UserDocument = RxDocument<HeroModel>
export type HeroCollection = RxCollection<UserDocument>
export { default } from './hero.collection';
