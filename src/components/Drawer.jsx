import {useState, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context';

import Info from "./Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({items, onClose, onRemove}){
    const { cartItems, setCartItems } = useContext(AppContext);
    const [orderId, setOrderId] = useState(null);
    const [isOrderComlete, setIsOrderComlete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            const {data} = await axios.post('http://localhost:3001/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComlete(true);
            setCartItems([]);

            for(let i=0; i < cartItems.length; i++){
                const item = cartItems[i];
                await axios.delete('http://localhost:3001/cart/' + item.id);
                await delay(500);
            }
        }catch{
            alert('Error creating order!');
        }
        setIsLoading(false);
    }

    return(
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
                </h2>

                { items.length > 0 ? (
                    <div className="drawer-wrapper">
                        <div className="items">
                            {items.map( (item, index) => (
                                <div key={index} className="cartItem d-flex align-center mb-20">
                                    <div
                                    style={{ backgroundImage: `url(${item.imgUrl})` }}
                                    className="cartItemImg"></div>

                                    <div className="mr-20 flex">
                                    <p className="mb-5">{item.title}</p>
                                    <b>${item.price}</b>
                                    </div>
                                    <img onClick={() => onRemove(item.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                <span>Total:</span>
                                <div></div>
                                <b>$1498</b>
                                </li>
                                <li>
                                <span>Tax 5%:</span>
                                <div></div>
                                <b>$174</b>
                                </li>
                            </ul>
                            <button 
                                disabled={isLoading} 
                                onClick={onClickOrder} 
                                className="greenButton"
                            >
                                {isLoading ? 'Processing...' : 'Proceed to checkout'} <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info 
                        title={isOrderComlete ? 'Order is processed!' : 'Cart is empt'}
                        description={
                            isOrderComlete 
                                ? `Your #${orderId} order will be delivered to courier soon.` 
                                : 'Add at least one pair of sneakers to place an order.'
                        }
                        image={isOrderComlete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;