import React, { useState, useEffect, useCallback  } from 'react';
import { useObservable } from 'rxjs-hooks'
import { RxHeroDocument, RxHeroesDatabase } from '../../db/type'
import DatabaseService from '../../services/Database.service'

export interface HeroListProps {

}

const HeroList = () => {
    const [heroes, setHeroes] =useState<RxHeroDocument[]>([]);
    const [heroName, setHeroName] = useState('');

    const handleEditor = useCallback((hero: RxHeroDocument) => {
        hero.atomicSet('hp', Math.floor((Math.random() * 100))).then(() => console.log('atomicSet success'));
    }, [])

    const handleRemove = useCallback((hero: RxHeroDocument) => {
        console.log('remove hero')
        hero.remove().catch(console.error);
    }, [])

    const saveHero =async () => {
       const db: RxHeroesDatabase = await DatabaseService.get();
       const obj = {
           name: heroName,
           color: `#${Math.floor((Math.random() * 100000))}`,
           hp: 100,
           maxHP: 1000
       }
       await db.heroes.insert(obj);
       console.log('inset new hero', heroName)
       setHeroName('')
    }

    useEffect( () => {
       const generateDb = async () => {
          const db =  await DatabaseService.get();
          db.heroes.find({
               selector: {},
               sort: [{name: 'asc'}]
           }).$.subscribe((heroes: RxHeroDocument[] ) => {
               setHeroes(heroes)
           })
       }

       generateDb().catch(error => console.error(error));
    }, []);

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
