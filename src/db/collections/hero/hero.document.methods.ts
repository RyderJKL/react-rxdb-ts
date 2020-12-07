import {Observable, of} from 'rxjs'
import {HeroDocument} from "./hero.collection";
export interface KeyFunctionMap {
    [key: string]: Function;
}

export interface HeroDocMethods extends KeyFunctionMap {
    hpPercent$: (self: HeroDocument) => Observable<number>;
}

const hpPercent$ = (self: HeroDocument) => {
    return of(self.hp)
}

const documentMethods: HeroDocMethods = {
    hpPercent$
}

export default documentMethods
