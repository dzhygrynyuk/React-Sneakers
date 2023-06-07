import React, {useState, useEffect} from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom';
import AppContext from './context';

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Orders from "./pages/Orders";


import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData(){
      const cartResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites');
      const itemResponse = await axios.get('http://localhost:3001/items');

      setIsLoading(false);

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

  const hasItemAddedToCart = (id) => {
    return cartItems.some(cartItem => cartItem.id === id);
  }

  return (
    <AppContext.Provider value={{items, cartItems, favoriteItems, hasItemAddedToCart, onAddToFavorite, setCardOpened, setCartItems}}>
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
              isLoading={isLoading}
            />
          } />
          <Route exact path="/favorites" element={
            <Favorites />
          } />
          <Route exact path="/orders" element={
            <Orders />
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
