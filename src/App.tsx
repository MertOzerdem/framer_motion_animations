import { useState } from 'react';
import './App.css';
import WhellSelector from './components/WhellSelector/WhellSelector';
import ItemShowcase from './views/ItemShowcase/ItemShowcase';
import TabNavigation from './components/TabNavigation/TabNavigation';
import CardList from './components/CardList/CardList';

const animations = [0,1,2,3]

const components = [
  <WhellSelector />,
  <ItemShowcase />,
  <TabNavigation />,
  <CardList />
]

function App() {
  const [selected, setSelected] = useState(3);

  const handleClick = (index: number) => {
    setSelected(index);
  }

  console.log(components)

  return (
    <div className="App">
      <div>
        {animations.map((_, index) => {
          return (
            <button key={index} onClick={() => handleClick(index)}>{index}</button>
          )
        })}
      </div>
      {components[selected]}
      {/* {false && <WhellSelector />}
      {false && <ItemShowcase />}
      {false && <TabNavigation />}
      {true && <CardList />} */}
    </div>
  );
}

export default App;
