import React, { useState, useEffect } from "react";
import { db, ref, get } from "../firebase";  // updated imports
import "./order-history.css";

const OrderHistory = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);
    const [orderss, setOrderss] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = ref(db, "pizza_orders");  // reference to "pizza_sales" node
                const snapshot = await get(ordersRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dat = Object.entries(data);
                    setOrders(dat);

                    var page = [];
                    const table = [];
                    var pageCnt = 0;
                    dat.forEach((order, index) =>{
                        page.push(order)
                        if((index + 1) % 9 == 0){
                            table.push(page);
                            page = new Array();
                            pageCnt += 1;
                        }
                        
                    });

                    if(page.length > 0){
                        table.push(page);
                        pageCnt += 1;
                    }

                    setOrderss(table);
                    setTotalPages(pageCnt);
                } else {
                    console.log("No data available");
                }

                
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }

        };

        fetchOrders();
    }, []);

    const nextPage = () => {
        if(pageIndex + 1 < totalPages)
            setPageIndex(pageIndex + 1);
    }

    const prevPage = () => {
        if(pageIndex > 0)
            setPageIndex(pageIndex - 1);
    }

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
                    {orderss[pageIndex]?.map(([key, value], index) => (                            
                        <tr key={key}>    
                        <td>{key}</td>
                        <td>Pending</td>
                        <td>
                            {new Date(value.timestamp).toLocaleString()}
                        </td>
                        <td>{value.payMentOption || "Cash"}</td>
                        </tr>
                            
                    ))}
                    </tbody>
                </table>
                <div className="navigation">
                    <button type="button" class="arrows" onClick={() => prevPage()}>&lt;</button>
                    {pageIndex + 1}
                    <button type="button" class="arrows" onClick={() => nextPage()}>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
