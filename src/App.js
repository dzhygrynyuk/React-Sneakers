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
      try {
        const [cartResponse, favoritesResponse, itemResponse] = await Promise.all([
          await axios.get('http://localhost:3001/cart'),
          await axios.get('http://localhost:3001/favorites'),
          await axios.get('http://localhost:3001/items'),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavoriteItems(favoritesResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert('Error requesting data!');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (cartItemObj) => {
    try {
      if(cartItems.find( cartItem => cartItem.id === cartItemObj.id )){
        setCartItems(prev => prev.filter(item => item.id !== cartItemObj.id));
        await axios.delete('http://localhost:3001/cart/'+cartItemObj.id);
      }else{
        setCartItems(prev => [...prev, cartItemObj]);
        await axios.post('http://localhost:3001/cart', cartItemObj);
      }
    } catch (error) {
      alert('Error adding to cart!');
      console.error(error);
    }
  }

  const onChangeSearchValue = (e) => {
    setInputSearchValue(e.target.value);
  }

  const onRemoveCartItem = (id) => {
    try {
      axios.delete('http://localhost:3001/cart/'+id);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      alert('Error deleting from cart!');
      console.error(error);
    }
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
      alert('Error adding to favorites!');
    }
  }

  const hasItemAddedToCart = (id) => {
    return cartItems.some(cartItem => cartItem.id === id);
  }

  return (
    <AppContext.Provider value={{items, cartItems, favoriteItems, hasItemAddedToCart, onAddToFavorite, setCardOpened, setCartItems}}>
      <div className="wrapper clear">
        <Drawer 
          items={cartItems}
          onRemove={onRemoveCartItem}
          onClose={() => setCardOpened(false)} 
          opened={cardOpened}
        />

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
