import React, {useState, useEffect} from "react";
import axios from "axios";

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/items')
      .then( ({data}) => {
        setItems(data);
      });
    axios
      .get('http://localhost:3001/cart')
      .then(({data}) => {
        setCartItems(data);
      });  
  }, []);

  const onAddToCart = (cartItemObj) => {
    axios.post('http://localhost:3001/cart', cartItemObj);
    setCartItems(prev => [...prev, cartItemObj]);
  }

  const onChangeSearchValue = (e) => {
    setInputSearchValue(e.target.value);
  }

  const onRemoveCartItem = (id) => {
    axios.delete('http://localhost:3001/cart/'+id);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (itemObj) => {
    axios.post('http://localhost:3001/favorites', itemObj);
    setFavoriteItems(prev => [...prev, itemObj]);
  }

  return (
    <div className="wrapper clear">
      {cardOpened && 
        <Drawer 
          items={cartItems}
          onRemove={onRemoveCartItem}
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
                onFavorite={onAddToFavorite}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
