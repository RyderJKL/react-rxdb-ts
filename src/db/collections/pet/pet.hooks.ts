import {PetCollection} from './pet.collection'
import {equals} from 'ramda'
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

export default function hooks(pet: PetCollection) {
    pet.preInsert(async (data, self) => {
        console.log('pet preInsert')
        const petDoc = await pet.findOne(data.petId).exec();
        const heroDoc = await petDoc?.populate('heroId');
        if (heroDoc && !equals(data, heroDoc._data.pet)) {
            console.log('在 pet document 中自动关联更新 hero document  成功')
            await heroDoc.atomicPatch({pet: data})
        }
    }, false)

    pet.postInsert((data, self) => {
        console.log('pet postInsert')
    }, false)

    pet.preSave(async (data, self) => {
    }, false);

    /**
     * pet.postSave 可能由 pet 自身触发，也可能由 hero 触发，
     * 1. 任何形式的触发都会对比新旧值，相同则不触发
     * 2. pet 自身更新，会调用 pet 后端 api
     * 3. 然后更新 pet 所属的 hero 下的 pet 数据
     * 4. hero 更新导致的联动 pet 更新，回到一
     * */
    pet.postSave(async (data, self) => {
        console.log('在 pet document 更新 pet 自身')
        const petDoc = await pet.findOne(data.petId).exec();
        console.log(petDoc, 'petDoc')

        if (!petDoc) return;

        if (equals(petDoc._data, data)) {
            console.log('is equals')
            return;
        }

        pet.updatePet$(data).pipe(tap(() => console.log('我的亮啊')), catchError(error => {
            console.error(error);
            return of(error)
        })).subscribe(async () => {
            console.log('在 pet document 更新 pet 自身 2')
        });

        const heroDoc = await petDoc?.populate('heroId');
        console.log(heroDoc._data, 'heroDoc')
        console.log(petDoc._data, 'petDoc')
        if (heroDoc && !equals(data, heroDoc._data.pet)) {
            console.log('在 pet document 中自动关联更新 hero document  成功')
            await heroDoc.atomicPatch({pet: data})
        }
    }, false)
}

