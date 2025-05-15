import React, { useState, useEffect } from "react";
import { db, ref, get } from "../firebase";  // updated imports
import "./order-history.css";

const OrderHistory = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = ref(db, "pizza_orders");  // reference to "pizza_sales" node
                const snapshot = await get(ordersRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setOrders(data);
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
                        {Object.entries(orders)
                            .map(([key, value], index) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value.status || "Pending"}</td>
                                    <td>
                                        {key
                                            ? new Date(value.timestamp).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td>{value.payMentOption || "Cash"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
