import React, { useContext } from 'react'
import { GlobalCartContext } from '../context/CartContext';

const Cart = () => {

    const { cart } = useContext(GlobalCartContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-primary">Shopping Cart</h3>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.length > 0 &&
                                cart.map((prod, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{prod.name}</td>
                                            <td>${prod.price}</td>
                                            <td>{prod.quantity}</td>
                                            <td>${prod.price * prod.quantity}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className="text-end bg-secondary text-white">Total:</td>
                                <td className='fw-bold bg-primary text-white'>${cart.reduce((total, prod) => total + (prod.price * prod.quantity), 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cart