import React, {useState, useEffect, useCallback} from 'react';
import {Database} from '../../db'
import {HeroDocument} from '../../db/collections/hero'
import {PetModel} from '../../db/collections/pet'
import {v4 as UUID} from 'uuid';

export interface HeroListProps {
    database: Database
}

const HeroList = (props: HeroListProps) => {
    const {database} = props;
    const [heroes, setHeroes] = useState<HeroDocument[]>([]);
    const [heroName, setHeroName] = useState('');

    const getNewMame = () => {
        const names = 'abcdefghiklmnopqrstuvwxyz';
        return names.split('').slice(0, Math.max(2, Math.floor(Math.random() * 10))).join('')
    }

    const handleHeroNameEditor = ((hero: HeroDocument) => {
        const newName = getNewMame();
        hero.atomicSet('heroName', newName).then(() => console.log('atomicSet success'))
    })

    const handleRemove = useCallback((hero: HeroDocument) => {
        hero.remove().catch(console.error);
    }, [])

    const generatePet = (heroId: string) => {
        const pet: PetModel = {
            heroId,
            petId: UUID(),
            name: getNewMame(),
            avatar: 'http//www.baidu.com'
        }
        return pet;
    }

    const saveHero = async () => {
        const obj = {
            heroId: UUID(),
            heroName: heroName,
            color: `#${Math.floor((Math.random() * 100000))}`,
            hp: 100,
            maxHP: 1000,
        }

        if (!heroName) return;
        await database.hero.atomicUpsert(obj);
        database.hero.getName();

        setHeroName('')
    }

    const randomAddPet = async (hero: HeroDocument) => {
        const data = hero._data;
        const pet = generatePet(hero._data.heroId);
        const newHero = {...data, pet: pet};
        await database.hero.atomicUpsert(newHero)
    }

    const updatePetName = async (hero: HeroDocument, newPetName: string) => {
        const data = hero._data;
        const pet = data.pet;
        const newHero = {...data, pet: { ...pet, name: newPetName}};
        await database.hero.atomicUpsert(newHero)
    };

    useEffect(() => {
        const generatedatabase = async () => {
            database.hero.find({
                selector: {},
                sort: [{heroId: 'asc'}]
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
                            <p>

                                hero: {item.heroName}
                            </p>
                            <p>
                                pet: {item?.pet?.name}
                            </p>
                            <p>colo: {item.color}</p>
                            <button onClick={() => handleHeroNameEditor(item)}>update hero Name</button>
                            <button onClick={() => handleRemove(item)}>remove hero</button>
                            <button onClick={() => randomAddPet(item)}>add pet to hero</button>
                            <button onClick={() => updatePetName(item, getNewMame())}>update pet name</button>
                        </li>)
                    })
                }
            </ul>
        </section>
    </div>)
}

export default HeroList
