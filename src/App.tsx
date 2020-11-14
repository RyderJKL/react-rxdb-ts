import React, { useEffect, useState, useCallback } from 'react';
import DatabaseService, { Database } from './db'
import HeroList from "./features/hero/HeroList";

import './App.css';

DatabaseService.get();

function App() {
  const [database, setDatabase] = useState<Database>()

  console.log('app')
  const createDB = useCallback(async () => {
    console.log('createDB')
    const db = await DatabaseService.get();
    console.log(db)
    // await db.hero.atomicUpsert({name: 'jack', color: 'red', hp: 100, maxHP: 200})
    setDatabase(db)
  }, [])

  useEffect(() => {
    // createDB().catch()
  })

  console.log(database, 'database')

  return (
    <div className="App">
      {/*{ database && <HeroList database={database}/> }*/}
    </div>
  );
}

export default App;
