import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import React, { useEffect, useState } from "react";
import * as service from '../service/Service';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { PayPalButton } from "react-paypal-button-v2";
export function ShoppingCart() {
    const [quantity, setQuantity] = useState(1)
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [shoppingCart, setShoppingCart] = useState([])
    const [totalPriceAll, setTotalPriceAll] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const getCart = async () => {
        try {
            const result = await service.getShoppingcart()
            await setShoppingCart(result)
            setTotalQuantity(0)
            setTotalPriceAll(0)
            if (result != null) {
                await result.map(async (val, index) => {
                    await setTotalQuantity(total => total + val.quantity)
                    await setTotalPriceAll(total => total + val.price)
                })
            }
        } catch (error) {

        }



    }
    const paymentt =async () => {
        try {
            const rs =await service.createOrder()
            await getCart()
            toast.success("Order success")
        } catch (error) {
            toast.error(error.response.data)
        }
        
    }

    const payment = () => {
        Swal.fire({
            icon: "success",
            title: `Do you want payment?`,
            showCancelButton: true,
            confirmButtonText: "Oke"
        })
            .then((rs) => {
                if (rs.isConfirmed) {
                    paymentt()
                }
            })
       
    }
    const editQuantity = async (val, id, vQuantity, sessionProduct) => {
        if (vQuantity > 1 || val == 1) {
            await service.setShoppingcart(val, id, sessionProduct);
            getCart();
        }

    }
    const deleteShoppingCart = async (id, idP) => {
        await service.deleteShoppingcart(id, idP)
        Swal.fire({
            icon: "success",
            title: "Delete Cart success",
            timer: "3000"
        })
        getCart()
    }
    const deleteCart = async (id, name, idP) => {
        Swal.fire({
            icon: "warning",
            title: `Do you want to remove a product named <span class='al'> ${name} </span> from the cart?`,
            showCancelButton: true,
            confirmButtonText: "Oke"
        })
            .then((rs) => {
                if (rs.isConfirmed) {
                    deleteShoppingCart(id, idP)
                }
            })
    }
    useEffect(() => {
        document.title = "Shopping Cart";
        window.scrollTo(0, 0)
        getCart()
    }, []);
    return (
        <>
            <div className="container" style={{ marginTop: "7%" }}>
                <div className="section-title" data-aos="fade-up">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-8">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th >Image</th>
                                    <th>Produts</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total price</th>
                                    <th>&ensp;</th>
                                </tr>
                            </thead>
                            <tbody>

                                {shoppingCart ? (shoppingCart.map((value, index) => (
                                    <tr key={index}>
                                        <td>
                                            {
                                                value.products.quantity < 1 ? <img className="pic"
                                                src="https://media.istockphoto.com/id/501962059/vi/vec-to/tem-%C4%91%C3%A3-b%C3%A1n-h%E1%BA%BFt-v%E1%BB%9Bi-v%C4%83n-b%E1%BA%A3n-m%C3%A0u-%C4%91%E1%BB%8F-tr%C3%AAn-m%C3%A0u-tr%E1%BA%AFng.jpg?s=2048x2048&w=is&k=20&c=AvsQlSW4KlL5T8xgUqYCqQRe7J2w1ncPdbojNwOts2k="
                                                alt="" /> :
                                                <img className="pic"
                                                src={value.products.imageThumb}
                                                alt="" />
                                            }
                                            
                                        </td>
                                        <td>{value.products.name}</td>
                                        <td> {value.products.price} $</td>
                                        <td>
                                            <div className="d-flex">
                                                <div className="d-flex">
                                                    <button type="button" className="minus" onClick={() => editQuantity(0, value.id, value.quantity, value.products)}><span>-</span></button>
                                                    <input value={value.quantity}
                                                        className="input" min="0"  style={{padding:"0 0"}}/>
                                                    <button type="button" value="+" className="plus" onClick={() => editQuantity(1, value.id, value.quantity, value.products)}><span>+</span></button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$ {value.price}</td>
                                        <td>
                                            <a title="Delete"><i class="bi bi-x" style={{ fontSize: "200%" }} onClick={() => deleteCart(value.id, value.products.name, value.products.id)}></i></a>
                                        </td>
                                        
                                    </tr>
                                ))) : <>
                                    <tr><p></p></tr>
                                    <tr><p></p></tr>
                                    <tr><p></p></tr>
                                    <tr ><td></td><td></td><td></td><td>Shopping Cart no products</td><td></td></tr>

                                </>
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4">
                        <div class="stack">
                            <div class="card">
                                <div class="image" >

                                    <h2 style={{ textAlign: "center", marginBottom: "10%", marginTop: "5%", color: "#6495ED" }}>Payment order</h2>
                                    <p style={{ marginLeft: "4%" }}>Quantity product:{totalQuantity} </p>
                                    <h5 style={{ marginLeft: "4%" }}>Total price all: $ {totalPriceAll}</h5>
                                    <div  style={{ marginTop: "10%" }}>
                                        {
                                            totalQuantity == 0 ?(<div className="full" style={{  marginLeft: "45%" ,marginBottom:"5%"}} title="Back Home">
                                            <Link to='/'>
                                                <ArrowBackIcon style={{ fontSize: "200%" }} />
                                            </Link>
                                        </div>):(
                                            <div className="full">
                                            {
                                                username ? (
                                        
                                                    <PayPalButton
                                                    amount={totalPriceAll==0?1:totalPriceAll}
                                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                    onSuccess={(details, data) => {
                                                        paymentt()
                                                
                                                        // OPTIONAL: Call your server to save the transaction
                                                        return fetch("/paypal-transaction-complete", {
                                                            method: "post",
                                                            body: JSON.stringify({
                                                                orderID: data.orderID
                                                            })
                                                        });
                                                    }}
                                                    onError={(e) =>{
                                                        toast.error("Payment fail!!")
                                                    }}
                                                />
                                                ) :
                                                    (<Link to='/login' title='Payment' style={{  marginLeft: "45%" ,marginBottom:"5%"}}>
                                                        <CreditScoreIcon style={{ fontSize: "200%" }} />
                                                    </Link>)
                                            }


                                        </div>
                                        )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )
}