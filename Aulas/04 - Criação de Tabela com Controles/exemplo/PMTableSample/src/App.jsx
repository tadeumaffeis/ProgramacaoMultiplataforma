// eslint-disable-next-line no-unused-vars
// import { useState } from 'react'
import './App.css'
import PMTable from './Components/PMTable'

function App() {
  //const [count, setCount] = useState(0)


    return (
      <>
        <PMTable caption='My Table Test' header={["Header 1","Header 2","Header 3"]} data={[["01","02","03"],["11","12","13"]]} />
      </>
    );
  
}

export default App

/*
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
*/