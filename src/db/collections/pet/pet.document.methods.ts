import {Observable, of} from 'rxjs'
import {PetDocument} from "./pet.collection";

export interface KeyFunctionMap {
    [key: string]: Function;
}

export interface PetDocMethods extends KeyFunctionMap {
    getPetName$: (self: PetDocument) => Observable<string>;
}

const getPetName$ = (self: PetDocument) => {
    return of(self.name)
}

const documentMethods: PetDocMethods = {
    getPetName$
}

export default documentMethods
