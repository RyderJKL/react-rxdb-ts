import React, {useState, useEffect, useCallback} from 'react';
import {Database} from '../../db'
import {HeroDocument, HeroModel } from '../../db/collections/hero'
import { PetModel } from '../../db/collections/pet'
import { v4 as UUID } from 'uuid';

export interface HeroListProps {
    database: Database
}

const HeroList = (props: HeroListProps) => {
    const {database} = props;
    const [heroes, setHeroes] = useState<HeroDocument[]>([]);
    const [heroName, setHeroName] = useState('');

    const handleEditor = useCallback((hero: HeroDocument) => {
        hero.atomicSet('hp', Math.floor((Math.random() * 100))).then(() => console.log('atomicSet success'));
    }, [])

    const handleRemove = useCallback((hero: HeroDocument) => {
        console.log('remove hero', hero)
        hero.remove().catch(console.error);
    }, [])

    const generatePet = () => {
        const names = ['abcdefghiklmnopqrstuvwxyz'];
        const pet: PetModel = {
            petId: UUID(),
            name: ['abcdefghiklmnopqrstuvwxyz'].slice(0,  names.length % Math.floor(Math.random() * 10)).join(''),
            avatar: 'http//www.baidu.com'
        }
        return pet;
    }

    const saveHero = async () => {
        const pet = generatePet();

        const obj = {
            name: heroName,
            color: `#${Math.floor((Math.random() * 100000))}`,
            hp: 100,
            maxHP: 1000,
            pet
        }

        if (!heroName) return;

        await database.hero.atomicUpsert({ ...obj });
        await database.pet.atomicUpsert(pet);
        const hero = await database.hero.findOne().where('name').eq(heroName).exec();
        console.log(hero, 'new hero');
        const petJ = await hero?.populate('pet.petId')
        console.log(petJ)

        setHeroName('')
    }

    const randomAddPet = async (hero: HeroDocument) => {
        const data = hero._data;
        console.log(data)
        console.log('random Add Pet to Hero', hero);
        const pet = generatePet();
        await hero.atomicUpdate({ ...data, pet: [...data.pet, pet] })
        await database.pet.atomicUpsert(pet);
        const herosPet = hero.pet;
        console.log(herosPet, 'herosPet');
    }

    useEffect(() => {
        const generatedatabase = async () => {
            database.hero.find({
                selector: {},
                sort: [{name: 'asc'}]
            }).$.subscribe((heroes: HeroDocument[]) => {
                setHeroes(heroes)
            })
        }

        generatedatabase().catch(error => console.error(error));
    }, [database.hero]);

    return (<div className="heroes-list">
        <section>
            <h2>hero insert</h2>
            <div><input type="text" value={heroName} onKeyDown={e => {
                e.keyCode === 13 && saveHero();
            }} onChange={e => setHeroName(e.target.value)}/></div>
            <button onClick={saveHero}>submit</button>
        </section>
        <section>
            <h2>hero-list</h2>
            <ul>
                {
                    heroes && heroes.map((item, index) => {
                        return (<li className="hero-item" key={index}>
                        <span>
                        hero: {item.name}
                        pet: {item.pet.name}
                        </span>
                            <span>colo: {item.color}</span>
                            <span>hp: {item.hpPercent()}</span>
                            <button onClick={() => handleEditor(item)}>edit</button>
                            <button onClick={() => handleRemove(item)}>remove</button>
                            <button onClick={() => randomAddPet(item)}>randomAddPet</button>
                        </li>)
                    })
                }
            </ul>
        </section>
    </div>)
}

export default HeroList
