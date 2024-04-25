import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Table from './components/PMTable';
import TableContext from './components/TableContext';

function App() {

  const tableData = {
    caption: "Table de Exemplo",
    header: ['Coluna 1', 'Coluna 2', 'Coluna 3'],
    data: [
      ['data 1', 'data 2', 'data 3'],
      ['data 4', 'data 5', 'data 6'],
      ['data 7', 'data 8', 'data 9']],
  };



  return (
    <TableContext.Provider value={{tableData}}>
      <Table />
    </TableContext.Provider>
  )
}

export default App

/*
 <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
*/