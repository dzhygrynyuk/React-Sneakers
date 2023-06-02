function Drawer({items, onClose, onRemove}){
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
                            <button className="greenButton">
                                Proceed to checkout <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div class="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img class="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty" />
                        <h2>Cart is empty</h2>
                        <p class="opacity-6">Add at least one pair of sneakers to place an order.</p>
                        <button onClick={onClose} class="greenButton">
                        <img src="/img/arrow.svg" alt="Arrow" />Back</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;