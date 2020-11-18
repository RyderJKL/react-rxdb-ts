import hero, {HeroCollection, heroHooks} from './hero'
import pet, {PetCollection, petHooks} from './pet'

export interface Collections {
    hero: HeroCollection
    pet: PetCollection
}

const collections = [
    {
        baseCollection: hero,
        hooks: heroHooks
    },
    {
        baseCollection: pet,
        hooks: petHooks
    }
]

export default collections


