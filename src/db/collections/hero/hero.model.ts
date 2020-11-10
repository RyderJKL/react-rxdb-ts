export interface HeroModel {
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