import {Observable, from as RxFrom, defer} from 'rxjs';
import {shareReplay, tap, concatMap, merge} from 'rxjs/operators';
import {HeroModel} from "./hero.model";
import {HeroCollection} from './hero.collection'
import {mapTo} from "rxjs/operators";

export interface KeyFunctionMap {
    [key: string]: Function;
}

const sleep = (delay = 200, callback: Function) => new Promise((resolve) => setTimeout(() => resolve(callback), delay));

export interface HeroCollectionStatics extends KeyFunctionMap {
    createHero$: (hero: HeroModel) => Observable<HeroModel>;
    updateHero$: (hero: HeroModel) => Observable<HeroModel>;
    // fetchHeroes$: () => Observable<HeroModel[]>;
    // deleteHero$: () => Observable<void>;
    // putHero$: () => Observable<void>;
}

export const createHero = (self: HeroCollection) => (hero: HeroModel) => {
    return defer(() => sleep(2000, () => console.log('准备插入 hero')))
        .pipe(
            merge(RxFrom(self.atomicUpsert(hero))),
            shareReplay(1),
            mapTo(hero),
            tap(() => console.log('createHero 成功'))
        )
}

export const updateHero = (self: HeroCollection) => (hero: HeroModel) => {
    // return RxFrom(self.atomicUpsert(hero));
    return defer(() => sleep(200, () => console.log('update hero')))
         .pipe(
             merge(RxFrom(self.atomicUpsert(hero))),
             shareReplay(1),
             mapTo(hero),
             tap(() => console.log('obs 执行了'))
         )
}

const statics: HeroCollectionStatics = {
    createHero$ (hero: HeroModel) {
        return createHero(this as HeroCollection)(hero)
    },
    updateHero$ (hero: HeroModel) {
        return updateHero(this as HeroCollection)(hero)
    }
}

export default statics
