import {Observable, from as RxFrom, defer, of, zip} from 'rxjs';
import {catchError, concatMap, share, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {HeroModel} from "./hero.model";
import {HeroCollection} from './hero.collection'
import {mapTo} from "rxjs/operators";

export interface KeyFunctionMap {
    [key: string]: Function;
}

let sleepCount: number = 0;

const sleep = async (delay = 200, callback: Function) => await new Promise((resolve) => setTimeout(() => {
    sleepCount += 1;
    callback();
    resolve();
}, delay));

export interface HeroCollectionStatics extends KeyFunctionMap {
    createHero$: (hero: HeroModel) => Observable<HeroModel>;
    updateHero$: (hero: HeroModel) => Observable<HeroModel>;
    // fetchHeroes$: () => Observable<HeroModel[]>;
    // deleteHero$: () => Observable<void>;
    // putHero$: () => Observable<void>;
}

export const createHero = (self: HeroCollection) => (hero: HeroModel) => {
    return RxFrom(sleep(400, () => console.log('准备插入 hero', sleepCount)))
        .pipe(
            concatMap(() => defer(() => self.atomicUpsert(hero))),
            mapTo(hero),
            tap(() => console.log('createHero 成功'))
        )
}

export const updateHero = (self: HeroCollection) => (hero: HeroModel) => {
    console.log('updateHero')
    return RxFrom(sleep(200, () => console.log('update hero', hero)))
        .pipe(
            tap(() => console.log('..... ')),
            concatMap(() =>
                defer(() => self.atomicUpsert(hero))
            ),
            tap(() => console.log('开始更新 hero ')),
            mapTo(hero),
            tap(() => console.log('更新 hero 成功')),
            catchError(e => {
                console.error(e);
                return of(e);
            })
        )
}

const statics: HeroCollectionStatics = {
    createHero$(hero: HeroModel) {
        return createHero(this as HeroCollection)(hero)
    },
    updateHero$(hero: HeroModel) {
        return updateHero(this as HeroCollection)(hero)
    }
}

export default statics
