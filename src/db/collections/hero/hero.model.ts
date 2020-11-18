import { PetModel } from '../pet/pet.model'

export interface HeroModel {
    heroId: string;
    heroName: string;
    color: string;
    hp: number;
    maxHP: number;
    team?: string;
    skills?: Array<{
        name?: string;
        damage?: string
    }>
    pet?: PetModel;
}
