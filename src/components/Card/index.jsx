import React, {useState} from 'react';

import styles from './Card.module.scss';

function Card ({item, onPlus}){
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        onPlus(item);
        setIsAdded(!isAdded);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={item.imgUrl} alt="Sneakers" />
            <h5>{item.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>${item.price}</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
            </div>
        </div>
    );
}

export default Card;