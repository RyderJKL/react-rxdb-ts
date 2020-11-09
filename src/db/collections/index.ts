import {RxDatabase} from "rxdb";

import UserCollection from './user'

export  interface Collections {
    user: UserCollection
}

export type RxHeroesDatabase = RxDatabase<Collections>
export default RxHeroesDatabase
