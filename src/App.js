import React, {useState, useEffect} from "react";

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');

  useEffect(() => {
    fetch('https://62a23a12cc8c0118ef5f3e0c.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (cartItem) => {
    setCartItems(prev => [...prev, cartItem]);
  }

  const onChangeSearchValue = (e) => {
    setInputSearchValue(e.target.value);
  }

  return (
    <div className="wrapper clear">
      {cardOpened && 
        <Drawer 
          items={cartItems}
          onClose={() => setCardOpened(false)} 
        />
      }
      <Header onOpenCart={() => setCardOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{inputSearchValue ? `Search by: ${inputSearchValue}` :'All sneakers'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {inputSearchValue && <img
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
              onClick={() => setInputSearchValue('')}
            />}
            <input 
              value={inputSearchValue}
              onChange={onChangeSearchValue} 
              placeholder="Search..." 
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toLowerCase().includes(inputSearchValue.toLowerCase()))
            .map((item, index) => (
              <Card 
                key={index}
                item={item}
                onPlus={onAddToCart}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
