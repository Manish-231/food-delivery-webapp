import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            console.log("User Email:", localStorage.getItem('userEmail'));
            const res = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const response = await res.json();
            console.log("My Order Response:", response);
            setOrderData(response.orderData); // sirf orderData set karna hai
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                  {console.log("Final orderData in state:", orderData)}
                <div className='row'>
                    {orderData && orderData.order_data ? (
                        orderData.order_data.slice(0).reverse().map((order, index) => (
                            <div key={index} className='w-100'>
                                {/* Order Date Header */}
                                {order[0]?.Order_date && (
                                    <div className='m-auto mt-5'>
                                        <h5>{order[0].Order_date}</h5>
                                        <hr />
                                    </div>
                                )}

                                {/* Order Items */}
                                <div className="d-flex flex-wrap">
                                    {order.slice(1).map((item, i) => (
                                        <div key={i} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                {/* <img
                                                    src={item.img ? item.img : "https://via.placeholder.com/150"}
                                                    className="card-img-top"
                                                    alt={item.name}
                                                    style={{ height: "120px", objectFit: "cover" }}
                                                /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4 className='text-center mt-5'>No Orders Found</h4>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
