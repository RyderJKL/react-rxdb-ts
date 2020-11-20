import {PetCollection} from './pet.collection'
import { equals } from 'ramda'

export default function hooks(pet: PetCollection) {
    pet.preInsert(async (data, self) => {
        console.log('pet preInsert')
        const petDoc = await pet.findOne(data.petId).exec();
        const heroDoc = await petDoc?.populate('heroId');
        if (heroDoc && !equals(data, heroDoc._data.pet)) {
            console.log('在 pet document 中自动关联更新 hero document  成功')
            await heroDoc.atomicPatch({ pet: data })
        }
    }, false)

    pet.postInsert((data, self) => {
        console.log('pet postInsert')
    }, false)
}

