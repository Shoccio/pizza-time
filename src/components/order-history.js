import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase"; 
import "./order-history.css";

const OrderHistory = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);  


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pizza_sales"));
                const ordersData = [];
                querySnapshot.forEach((doc) => {
                    ordersData.push({ id: doc.id, ...doc.data() });  // Add doc ID and data to ordersData array
                });
                setOrders(ordersData);  
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };
        
        fetchOrders(); 
    }, []);  // Empty dependency array ensures it runs only once when component mounts

    return (
        <div className="order-history">
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar"
                />
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="order-hist-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .filter(order => 
                                order.pizza_type.toLowerCase().includes(search.toLowerCase())
                            )  
                            .map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.status || "Pending"}</td> {/* Add status if available */}
                                <td>{order.timestamp ? order.timestamp.toDate().toLocaleString() : "N/A"}</td> {/* Format timestamp */}
                                <td>{order.paymentMethod || "Cash"}</td> {/* Add payment method if available */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
