import './App.css';
import WhellSelector from './components/WhellSelector/WhellSelector';
import ItemShowcase from './views/ItemShowcase/ItemShowcase';
import TabNavigation from './components/TabNavigation/TabNavigation';

function App() {
  return (
    <div className="App">
      {false && <WhellSelector />}
      {false && <ItemShowcase />}
      {true && <TabNavigation />}
    </div>
  );
}

export default App;
