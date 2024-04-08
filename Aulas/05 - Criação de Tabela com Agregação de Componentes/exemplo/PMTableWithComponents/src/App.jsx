
import './App.css'
import PMTable from './Components/PMTable';
//import PMTableWithoutChildrenComponenets from './Components/PMTableWithoutChildrenComponents'
import TableInformation from './Data/reservations.array.json';

function App() {
  return (
      <PMTable
        caption={TableInformation.caption}
        header={TableInformation.header}
        data={TableInformation.data}
      />
  );
}

export default App

