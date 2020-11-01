import { RxDocument, RxCollection, RxDatabase } from 'rxdb';

export interface RxHeroDocumentType {
    name: string;
    color: string;
    hp: number;
    maxHP: number;
    team?: string;
    skills?: Array<{
        name?: string;
        damage?: string
    }>
}

interface RxHeroDocMethods {
    hpPercent(): number;
}

export type RxHeroDocument = RxDocument<RxHeroDocumentType, RxHeroDocMethods>;
export type RxHeroCollection = RxCollection<RxHeroDocumentType, RxHeroDocMethods, {}>

export interface RxHeroesCollections {
    heroes: RxHeroCollection
}

export type RxHeroesDatabase = RxDatabase<RxHeroesCollections>
