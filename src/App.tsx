import { useState } from 'react';
import './App.css';
import WhellSelector from './components/WhellSelector/WhellSelector';
import ItemShowcase from './views/ItemShowcase/ItemShowcase';
import TabNavigation from './components/TabNavigation/TabNavigation';
import CardList from './components/CardList/CardList';
import Carousel from './components/Carousel/Carousel';
import FloatingActionButton from './components/FloatingActionButton/FloatingActionButton';
import DynamicGrid from './components/DynamicGrid/DynamicGrid';

const components = [
  <WhellSelector />,
  <ItemShowcase />,
  <TabNavigation />,
  <CardList />,
  <Carousel />, // fix for desktop and large devices later 
  <FloatingActionButton />,
  <DynamicGrid />
]

function App() {
  const [selected, setSelected] = useState(components.length - 1);

  const handleClick = (index: number) => {
    setSelected(index);
  }

  return (
    <div className="App">
      <div>
        {components.map((_, index) => {
          return (
            <button key={index} onClick={() => handleClick(index)}>{index}</button>
          )
        })}
      </div>
      {components[selected]}
    </div>
  );
}

export default App;
