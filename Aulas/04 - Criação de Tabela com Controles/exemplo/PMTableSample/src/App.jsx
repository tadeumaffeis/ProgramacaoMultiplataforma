
import './App.css'
//import ExampleParent from './Components/HookTest';
import PMTableWithoutChildrenComponenets from './Components/PMTableWithoutChildrenComponents'
import TableInformation from './data/table.information.json';

function App() {
  console.log('App',TableInformation.information);
  return (
    <PMTableWithoutChildrenComponenets
      caption={TableInformation.information.title.text}
      header={TableInformation.information.colunmHeader.content}
      data={TableInformation.information.reservations.content}
    />


  );
}

export default App

