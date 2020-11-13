import React, { useEffect, useState, useCallback } from 'react';
import DatabaseService, { Database } from './db'
import HeroList from "./features/hero/HeroList";

import './App.css';

function App() {
  const [database, setDatabase] = useState<Database>()

  const createDB = useCallback(async () => {
    const db = await DatabaseService.get();
    console.log(db)
    await db.hero.atomicUpsert({name: 'jack', color: 'red', hp: 100, maxHP: 200})
    setDatabase(db)
  }, [])

  useEffect(() => {
    createDB().catch()
  })

  return (
    <div className="App">
      { database && <HeroList database={database}/> }
    </div>
  );
}

export default App;
