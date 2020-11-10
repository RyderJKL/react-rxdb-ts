import { RxDocument, RxCollection } from 'rxdb';
import { UserModel } from './user.model'

export type UserDocument = RxDocument<UserModel>
export type UserCollection = RxCollection<UserDocument>
export { default } from './user.collection';
