import React, { useState, useEffect, useCallback  } from 'react';
import { useObservable } from 'rxjs-hooks'
import { RxHeroDocument, RxHeroesDatabase } from '../../db/type'
import DatabaseService from '../../services/Database.service'

export interface HeroListProps {

}
const HeroList = () => {
    const [loading, setLoading] = useState(false);
    const [heroes, setHeroes] =useState<RxHeroDocument[]>([]);
    const subs: [] = [];

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
}


export default  HeroList
