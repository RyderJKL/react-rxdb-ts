import React, { useEffect, useState, useCallback } from 'react';
import DatabaseService, { Database } from './db'
import HeroList from "./features/hero/HeroList";

import './App.css';

function App() {
  const [database, setDatabase] = useState<Database>()

  const createDB = useCallback(async () => {
    const db = await DatabaseService.get();
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
