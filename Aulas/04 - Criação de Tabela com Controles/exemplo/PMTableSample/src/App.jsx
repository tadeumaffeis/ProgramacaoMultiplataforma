
import './App.css'
import PMTableWithoutChildrenComponenets from './Components/PMTableWithoutChildrenComponents'
import TableInformation from './Data/reservations.array.json';

function App() {
  return (
      <PMTableWithoutChildrenComponenets
        caption={TableInformation.caption}
        header={TableInformation.header}
        data={TableInformation.data}
      />
  );
}

export default App

