import { RxDocument, RxCollection } from 'rxdb';
import { Model } from './model'

export type UserDocument = RxDocument<Model>
export type UserCollection = RxCollection<UserDocument>
export default UserCollection
