import Card from "../components/Card";

function Home({items, cartItems, onAddToCart, onAddToFavorite, inputSearchValue, setInputSearchValue, onChangeSearchValue}) {
    return(
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
                            cartItems={cartItems}
                            onPlus={onAddToCart}
                            onFavorite={onAddToFavorite}
                            added={cartItems.some(cartItem => cartItem.id === item.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;