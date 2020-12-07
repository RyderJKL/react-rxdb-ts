import React, {useState, useEffect, useCallback} from 'react';
import {Database} from '../../db'
import {HeroDocument} from '../../db/collections/hero'
import {PetDocument, PetModel} from '../../db/collections/pet'
import {v4 as UUID} from 'uuid';

import {Table, Button} from 'antd'
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

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
        database.hero.updateHero$({...hero._data, heroName: newName}).subscribe()
    })

    const updatePetNameFromHero = (hero: HeroDocument, newPetName: string) => {
        const data = hero._data;
        const pet = data.pet;
        const newHero = {...data, pet: {...pet, name: newPetName}};
        console.log(newHero, 'newHero')
        const subscription = database.hero.updateHero$(newHero).pipe(catchError(e => {
            console.error(e);
            return of('出错了')
        })).subscribe(() => subscription.unsubscribe())
    };

    const updatePetNameFromPet = async (hero: HeroDocument) => {
        const petDoc = await hero.populate('pet.petId') as PetDocument;
        console.log(petDoc._data, 'pet')
        petDoc && await petDoc.atomicPatch({ name: getNewMame() })
    }

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

    const saveHero = () => {
        const obj = {
            heroId: UUID(),
            heroName: heroName,
            color: `#${Math.floor((Math.random() * 100000))}`,
            hp: 100,
            maxHP: 1000,
        }

        if (!heroName) return;
        database.hero.createHero$(obj).pipe(tap((value) => {
            console.log('at view createHero$')
            setHeroName('')
        })).subscribe();
    }

    const randomAddPet = (hero: HeroDocument) => {
        const data = hero._data;
        const pet = generatePet(hero._data.heroId);
        const newHero = {...data, pet: pet};
        console.log('add pet')
        // await database.hero.atomicUpsert(newHero)
        database.hero.updateHero$(newHero).subscribe()
    }

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
            <div>
                <input
                    type="text" value={heroName}
                    onKeyDown={e => {
                        e.keyCode === 13 && saveHero();
                    }}
                    onChange={e => setHeroName(e.target.value)}
                />
            </div>
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
                                <button onClick={() => updatePetNameFromPet(item)}>update pet at pet</button>
                            </p>
                            <p>colo: {item.color}</p>
                            <button onClick={() => handleHeroNameEditor(item)}>update hero Name</button>
                            <button onClick={() => handleRemove(item)}>remove hero</button>
                            <button onClick={() => randomAddPet(item)}>add pet to hero</button>
                            <button onClick={() => updatePetNameFromHero(item, getNewMame())}>updatePetNameFromHero</button>
                        </li>)
                    })
                }
            </ul>
        </section>
    </div>)
}

export default HeroList
