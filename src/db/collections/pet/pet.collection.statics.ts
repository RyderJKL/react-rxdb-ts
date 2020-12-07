import {Observable, from as RxFrom, defer} from 'rxjs';
import {shareReplay, tap, merge, concatMap, share, catchError} from 'rxjs/operators';
import {PetModel} from "./pet.model";
import {PetCollection} from './pet.collection'
import {mapTo} from "rxjs/operators";
import {of} from "ramda";

export interface KeyFunctionMap {
    [key: string]: Function;
}

const sleep = (delay: 200, callback: Function) => new Promise((resolve) => setTimeout(resolve, delay));

export interface PetCollectionStatics extends KeyFunctionMap {
    createPet$: (pet: PetModel) => Observable<PetModel>;
    updatePet$: (pet: PetModel) => Observable<PetModel>;
    // fetchpetes$: () => Observable<PetModel[]>;
    // deletepet$: () => Observable<void>;
    // putpet$: () => Observable<void>;
}

export const createPet = (self: PetCollection) => (pet: PetModel) => {
    return defer(() => sleep(200, () => console.log('createPet')))
        .pipe(
            merge(RxFrom(self.atomicUpsert(pet))),
            shareReplay(1),
            mapTo(pet),
            tap(() => console.log('obs 执行了'))
        )
}

export const updatePet = (self: PetCollection) => (pet: PetModel) => {
    return defer(() => sleep(200, () => console.log('update pet')))
        .pipe(
            tap(() => console.log('update fuck')),
            concatMap(() => RxFrom(self.atomicUpsert(pet))),
            mapTo(pet),
            tap(() => console.log('pet 更新 执行了')),
            catchError(error =>{  console.log(error); return of(error);})
        )
}

const statics: PetCollectionStatics = {
    createPet$(pet: PetModel) {
        return createPet(this as PetCollection)(pet)
    },
    updatePet$(pet: PetModel) {
        return updatePet(this as PetCollection)(pet)
    }
}

export default statics
