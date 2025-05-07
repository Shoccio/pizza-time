import React, { useState, useEffect } from "react";
import { db, ref, get } from "../firebase";  // updated imports
import "./order-history.css";

const OrderHistory = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = ref(db, "pizza_sales");  // reference to "pizza_sales" node
                const snapshot = await get(ordersRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const ordersArray = Object.entries(data).map(([id, order]) => ({
                        id,
                        ...order,
                    }));
                    setOrders(ordersArray);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        fetchOrders();
    }, []);

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
                                order.pizza_type &&
                                order.pizza_type.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.status || "Pending"}</td>
                                    <td>
                                        {order.timestamp
                                            ? new Date(order.timestamp).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td>{order.paymentMethod || "Cash"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
