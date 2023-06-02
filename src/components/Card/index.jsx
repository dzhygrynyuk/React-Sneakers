import React, {useState} from 'react';

import styles from './Card.module.scss';

function Card ({item, onPlus, onFavorite, favorited = false, added = false}){
    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus(item);
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite(item);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            <div onClick={onClickFavorite} className={styles.favorite}>
                <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Favorite" />
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