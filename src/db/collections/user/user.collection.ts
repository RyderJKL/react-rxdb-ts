import userSchema  from './user.schema'
import {RxCollection, RxDocument} from 'rxdb';
import { UserModel } from './user.model';

export type UserDocument = RxDocument<UserModel, UserDocMethods>
export type UserCollection = RxCollection<UserModel, UserDocMethods, {}>

export interface UserDocMethods {
   getUser(): number;
}

const userCollection = {
   name: 'user',
   schema: userSchema,
   statics: {},
   sync: false,
}

export default userCollection;
