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
   pouchSettings: {},
   statics: {},
   methods: {
      getUser (this: UserDocument) {

      }
   },
   attachments: {},
   options: {},
   migrationStrategies: {},
   autoMigrate: true,
   cacheReplacementPolicy: function(){},
   sync: true
}

export default userCollection;
