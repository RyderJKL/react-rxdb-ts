import React, { useEffect, useState, useCallback } from 'react';
import DatabaseService, { Database } from './db'
import HeroList from "./features/hero/HeroList";

import './App.css';

function App() {
  const [database, setDatabase] = useState<Database>()

  console.log('app')
  const createDB = useCallback(async () => {
    console.log('createDB')
    const db = await DatabaseService.get();
    console.log(db)
    setDatabase(db)
  }, [])

  useEffect(() => {
    createDB().catch()
  })

  console.log(database, 'database')

  return (
    <div className="App">
      { database && <HeroList database={database}/> }
    </div>
  );
}

export default App;
