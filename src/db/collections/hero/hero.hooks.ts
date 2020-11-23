import {HeroCollection} from './hero.collection'
import { equals } from 'ramda'
import { Database } from '../../index';

export default function hooks(hero: HeroCollection, dataBase: Database) {
    hero.preInsert(async (data, self) => {
        if (data.pet !== undefined) {
            // 根据 heroId 找到 hero collection 中对应的 hero document
            const heroDoc = await hero.findOne(data.heroId).exec();
            // 根据 heroDocument 中的 pet.petId populate 找到 对应的 pet document
            const petDoc = await heroDoc?.populate('pet.petId');
            // @TODO:: 只取用 data.pet 中存在的 key 进行对比
            if (petDoc !== undefined && !equals(petDoc._data, data.pet)) {
                // pet document 存在，更新 pet
                await petDoc.atomicPatch(data.pet);
                console.log('在 hero 插入时自动关联更新 pet document 成功')
            } else {
                // pet document 不存在，则向 pet collection 中插入一个新的 pet document
                await dataBase.pet.upsert({ ...data.pet })
                console.log('在 hero 插入时自动新增 pet')
            }
        }
    }, false)

    hero.postInsert((data, self) => {
    }, false)

    hero.preSave((data, self) => {

    }, false)

    hero.postSave(async (data, self) => {
        if (data.pet !== undefined) {
            // 根据 heroId 找到 hero collection 中对应的 hero document
            const heroDoc = await hero.findOne(data.heroId).exec();
            // 根据 heroDocument 中的 pet.petId populate 找到 对应的 pet document
            const petDoc = await heroDoc?.populate('pet.petId');
            if (petDoc && !equals(petDoc._data, data.pet)) {
                // pet document 存在，更新 pet
                await petDoc.atomicPatch(data.pet);
                console.log('在 hero 更新时自动关联更新 pet')
            } else {
                // pet document 不存在，则向 pet collection 中插入一个新的 pet document
                console.log('在 hero 更新时新增 pet')
                await dataBase.pet.upsert(data.pet)
            }
        }
    }, false)
}
