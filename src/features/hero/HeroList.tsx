import React, { useState, useEffect, useCallback  } from 'react';
import { Database } from '../../db'
import { HeroDocument } from '../../db/collections/hero'
export interface HeroListProps {
    database: Database
}

const HeroList = (props: HeroListProps) => {
    const { database } = props;
    const [heroes, setHeroes] =useState<HeroDocument[]>([]);
    const [heroName, setHeroName] = useState('');

    const handleEditor = useCallback((hero: HeroDocument) => {
        hero.atomicSet('hp', Math.floor((Math.random() * 100))).then(() => console.log('atomicSet success'));
    }, [])

    const handleRemove = useCallback((hero: HeroDocument) => {
        console.log('remove hero')
        hero.remove().catch(console.error);
    }, [])

    const saveHero =async () => {
       const obj = {
           name: heroName,
           color: `#${Math.floor((Math.random() * 100000))}`,
           hp: 100,
           maxHP: 1000
       }
       await database.hero.insert(obj)
       console.log('inset new hero', heroName)
       setHeroName('')
    }

    useEffect( () => {
       const generatedatabase = async () => {
          database.hero.find({
               selector: {},
               sort: [{name: 'asc'}]
           }).$.subscribe((heroes: HeroDocument[] ) => {
               setHeroes(heroes)
           })
       }

       generatedatabase().catch(error => console.error(error));
    }, [database.hero]);

    return (<div className="heroes-list">
        <section>
            <h2>hero insert</h2>
            <div><input type="text" value={heroName} onChange={e => setHeroName(e.target.value)}/></div>
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
                        </span>
                        <span>colo: {item.color}</span>
                        <span>hp: { item.hpPercent() }</span>
                        <button onClick={() => handleEditor(item)}>edit</button>
                        <button onClick={() => handleRemove(item)}>remove</button>
                    </li>)
                })
            }
        </ul>
        </section>
    </div>)
}

export default  HeroList
