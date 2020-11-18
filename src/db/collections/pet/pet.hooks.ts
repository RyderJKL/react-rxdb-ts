import {PetCollection} from './pet.collection'

export default function hooks(pet: PetCollection) {
    pet.preInsert((data, self) => {
        console.log('pet preInsert')
    }, false)

    pet.postInsert((data, self) => {
        console.log('pet postInsert')
    }, false)
}

