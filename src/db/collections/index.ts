import user, { UserCollection } from './user'
import hero, { HeroCollection } from './hero'

export interface Collections {
    user: UserCollection,
    hero: HeroCollection
}

const collections = [
    user,
    hero
]

export default collections


