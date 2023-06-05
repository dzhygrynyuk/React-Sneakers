import {useContext} from 'react';
import AppContext from '../context';

function Info({title, description, image}){
    const {setCardOpened} = useContext(AppContext);

    return(
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Status" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCardOpened(false)} className="greenButton">
            <img src="/img/arrow.svg" alt="Arrow" />Back</button>
        </div>
    );
}

export default Info;