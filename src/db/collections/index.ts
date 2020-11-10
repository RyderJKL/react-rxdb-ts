import userCollection, { UserCollection } from './user'
import heroCollection, { HeroCollection } from './hero'

export interface Collections {
    user: UserCollection,
    hero: HeroCollection
}

const collections = [
    userCollection,
    heroCollection
]

export default collections


