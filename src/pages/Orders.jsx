import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from "../components/Card";

function Orders(){
    const [orders, setOrders] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:3001/orders');
            // {items: Array()} + {items: Array()}
            // 1 variant
            //setOrders(data.map(obj => obj.items).flat());

            // 2 variant
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        })();
    }, []);

    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {orders && orders
                    .map((item, index) => (
                        <Card 
                            key={index}
                            item={item}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Orders;