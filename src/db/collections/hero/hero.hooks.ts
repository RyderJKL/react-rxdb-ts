import {HeroCollection} from './hero.collection'
import { equals } from 'ramda'

export default function hooks(hero: HeroCollection) {
    hero.preInsert(async (data, self) => {
        console.log('hero preInsert', data)
        if (typeof data.pet !== undefined) {
            const heroDoc = await hero.findOne(data.heroId).exec();
            const petDoc = await heroDoc?.populate('pet.petId');
            // @TODO:: 只取用 data.pet 中存在的 key 进行对比
            console.log(petDoc, 'petDoc');
            if (petDoc !== undefined && !equals(petDoc._data, data.pet)) {
                console.log('在 hero document 中自动关联更新 pet document 成功')
                await petDoc.atomicUpsert(data.pet);
            } else {
                // 如何从 doc A 中获取 doc B 所属的 collection B
            }
        }
    }, false)

    hero.postInsert((data, self) => {
        console.log('hero postInsert')
    }, false)
}
