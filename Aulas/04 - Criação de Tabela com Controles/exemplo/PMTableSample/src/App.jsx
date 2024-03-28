
import './App.css'
import PMTableWithoutChildrenComponenets from './Components/PMTableWithoutChildrenComponents'

function App() {
  return (
      <PMTableWithoutChildrenComponenets
        caption='My Table Test'
        header={["Header 1", "Header 2", "Header 3"]}
        data={[["01", "02", "03"], ["11", "12", "13"],["21", "22", "23"],["31", "32", "33"]]}
      />
  );
}

export default App

