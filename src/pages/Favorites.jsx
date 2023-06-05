import {useContext} from 'react';
import Card from "../components/Card";
import AppContext from "../context";

function Favorites({onAddToFavorite}){
    const {favoriteItems} = useContext(AppContext);

    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My favorites</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favoriteItems
                    .map((item, index) => (
                        <Card 
                            key={index}
                            item={item}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Favorites;