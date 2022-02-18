import './App.css';
import WhellSelector from './components/WhellSelector/WhellSelector';
import ItemShowcase from './views/ItemShowcase/ItemShowcase';

function App() {
  return (
    <div className="App">
      {false && <WhellSelector />}
      {true && <ItemShowcase />}
    </div>
  );
}

export default App;
