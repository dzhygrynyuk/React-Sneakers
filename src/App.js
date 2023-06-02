import React, {useState, useEffect} from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom';

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');

  useEffect(() => {
    async function fetchData(){
      const cartResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites');
      const itemResponse = await axios.get('http://localhost:3001/items');

      setCartItems(cartResponse.data);
      setFavoriteItems(favoritesResponse.data);
      setItems(itemResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (cartItemObj) => {
    if(cartItems.find( cartItem => cartItem.id === cartItemObj.id )){
      axios.delete('http://localhost:3001/cart/'+cartItemObj.id);
      setCartItems(prev => prev.filter(item => item.id !== cartItemObj.id));
    }else{
      axios.post('http://localhost:3001/cart', cartItemObj);
      setCartItems(prev => [...prev, cartItemObj]);
    }
  }

  const onChangeSearchValue = (e) => {
    setInputSearchValue(e.target.value);
  }

  const onRemoveCartItem = (id) => {
    axios.delete('http://localhost:3001/cart/'+id);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (itemObj) => {
    try{
      if(favoriteItems.find(favoriteItem => favoriteItem.id === itemObj.id)){
        axios.delete('http://localhost:3001/favorites/'+itemObj.id);
        setFavoriteItems(prev => prev.filter(item => item.id !== itemObj.id));
      }else{
        const {data} = await axios.post('http://localhost:3001/favorites', itemObj);
        setFavoriteItems(prev => [...prev, data]);
      }
    } catch {
      alert('Failed to add to favorites!');
    }
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

      <Routes>
        <Route exact path="/" element={
          <Home 
            items={items}
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            inputSearchValue={inputSearchValue}
            setInputSearchValue={setInputSearchValue}
            onChangeSearchValue={onChangeSearchValue}

          />
        } />
        <Route exact path="/favorites" element={
          <Favorites 
            items={favoriteItems}
            onAddToFavorite={onAddToFavorite}
          />
        } />
      </Routes>

    </div>
  );
}

export default App;
