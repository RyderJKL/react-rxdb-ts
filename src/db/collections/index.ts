// import user, { UserCollection } from './user'
import hero, { HeroCollection } from './hero'
import pet, { PetCollection } from './pet'

export interface Collections {
    // user: UserCollection,
    hero: HeroCollection
    pet: PetCollection
}

const collections = [
    // user,
    hero,
    pet
]

export default collections


