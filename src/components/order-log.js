import React, { useState } from 'react';
import { db, ref, push, serverTimestamp } from '../firebase';  // ✅ updated imports'
import "./order-log.css"

const OrderLog = () => {
  const [pizzaMenu, setPizzaAmt] = useState(
    {
    "Bacon":[50, 0],
    "Mang Kiko Special":[55, 0],
    "All Meat":[60, 0],
    "Ham & Cheese":[65, 0],
    "Pepperoni":[70, 0],
    "Cheesy Max":[75, 0],
    "Hawaiian":[80, 0],
    "Beef and Mushroom":[85, 0],
    "Pizza Burger":[90, 0]

    }
  );
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [deliverOption, setDeliveryOption] = useState("");
  const [payMentOption, setPaymentOption] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [finalOrder, setFinalOrder] = useState({});
  const [total, setTotal] = useState(0);
  const [submit, setSubmitted] = useState(false);
  //const [pizzaType, setPizzaType] = useState('');
  //const [quantity, setQuantity] = useState('');
  //const [price, setPrice] = useState('');

  const handleSubmit = (event) =>
  {
    event.preventDefault();
    addPizzaSale();
  };


  // Function to add a pizza sale to Realtime Database
  const addPizzaSale = async () => {
    try {
      
      const pizzaSalesRef = ref(db, 'pizza_orders');  // reference to 'pizza_sales' node
      await push(pizzaSalesRef, {
        name: name,
        phoneNo: phoneNo,
        address: address,
        deliveryOption: deliverOption,
        payMentOption: payMentOption,
        discountCoupon: discountCoupon,
        order: finalOrder,
        //quantity: parseInt(quantity),
        //price: parseFloat(price),
        timestamp: Date.now(), // ✅ using Date.now() for simplicity (or keep serverTimestamp if configured)
      });
      //setQuantity('');
      //setPrice('');
      alert("Your order has been received");
      window.location.reload();
    } catch (error) {
      console.error('Error adding sale: ', error);
    }
  };

  const increasePizza = pizza => {
    setPizzaAmt((previousState) => {
      const updatePizza = [...previousState[pizza]]
      updatePizza[1] += 1;
      setTotal(total + updatePizza[0]);
      setFinalOrder((previousState) =>{
        return {...previousState, [pizza]: updatePizza[1]};
      });
      return {...previousState, [pizza]: updatePizza};
    });
  };

  const decreasePizza = pizza => {
    setPizzaAmt((previousState) => {
      const updatePizza = [...previousState[pizza]]
      if(updatePizza[1] > 0){
        updatePizza[1] -= 1;
        setTotal(total - updatePizza[0]);
        setFinalOrder((previousState) =>{
          if(updatePizza[1] <= 0){
            const newOrder = {...previousState};
            delete newOrder[pizza];
            return newOrder;
          }

          return {...previousState, [pizza]: updatePizza[1]};
        });
      }
      return {...previousState, [pizza]: updatePizza};
    });
  };

  const printMenu = () =>{
    const pizzaMenuEntries = Object.entries(pizzaMenu);

    const rows = [];
    for(let i = 0; i < pizzaMenuEntries.length; i += 3){
      rows.push(pizzaMenuEntries.slice(i, i + 3));
    }

    return(
      <tbody>
        {rows.map((row, rowIndex) =>(
          <tr key={rowIndex}>
            {row.map(([key, value]) => (
              <td key={key}>
                <img src="/kiko.png" alt="Pizza Icon" className="pizza-item" /> 
                <br />
                {key}
                <br />
                <button type="button" onClick={() => decreasePizza(key)}>-</button> 
                {value[1]}
                <button type="button" onClick={() => increasePizza(key)}>+</button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const printSummary = () => {
    const pizzMenEntr = Object.entries(pizzaMenu);

    const orders = {};
    for(let i = 0; i < pizzMenEntr.length; i++){
      if(pizzMenEntr[i][1][1] > 0)
        orders[pizzMenEntr[i][0]] = pizzMenEntr[i][1][1];
    }
    return(
      <tbody>
        <tr><td style={{textAlign:"left"}}>Payment Method</td></tr>
        <tr> <td>
          <div style= {{display:"flex", margin:"10px", marginLeft:"0px", marginBottom:"20px", justifyContent:"space-between"}}>
            <label><input type="radio" name="payment" value="cash" onChange={(e) => setPaymentOption(e.target.value)}></input>Cash</label>
            <label><input type="radio" name="payment" value="card" onChange={(e) => setPaymentOption(e.target.value)}></input>Card</label>
            <label><input type="radio" name="payment" value="onlinePayment" onChange={(e) => setPaymentOption(e.target.value)}></input>Online Payment</label>        
          </div>
        </td> </tr>
        <tr></tr>
        <tr><td style={{textAlign:"left"}}>Discount Coupon</td></tr>
        <tr>
          <td style={{height:"30px", paddingBottom:"20px"}}>
            <input className="inputBox" type="text" name="discount" value={discountCoupon} onChange={(e) => setDiscountCoupon(e.target.value)} placeholder='Enter voucher code'></input>
          </td>
        </tr>
        <tr><td style={{textAlign:"left", height:"30px"}}>Order Summary</td></tr>
        {Object.entries(orders).map(([key, value], index) => (
          <tr id={index}>
            <td style={{display:"flex", justifyContent:"space-between"}}>
              <span>{key} x{value}</span> <span>P {value * pizzaMenu[key][0]}</span>
            </td>
          </tr>
        ))}
        
      </tbody>
    );
  };
  

  return (
    <form className = "content" onSubmit={handleSubmit}>
      <div className = "customerDetail">
        <h2>Customer Detail</h2>
        <div style={{justifyContent: "space-between", display: "flex"}}>
          <div className = "personalInfo">
            <input className="inputBox" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
            <input className="inputBox" type="text" id="phone" name="phone" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Phone No."></input>
            <input className="inputBox" type="text" id="address" name="address" value={address} onChange={(e) =>setAddress(e.target.value)} placeholder="Address"></input>
          </div>

          <div className = "delivery">
            <label><input type="radio" name="deliver" value="delivery" onChange={(e) => setDeliveryOption(e.target.value)}></input>Delivery</label>
            <label><input type="radio" name="deliver" value="pickUp" onChange={(e) => setDeliveryOption(e.target.value)}></input>Pick-Up</label>
          </div>
          
        </div>
      </div>

      <div className = "orderDetail">
        <h2>Order Detail</h2>
        <div>
          <table>
            {printMenu()}
          </table>
        </div>
      </div>

      <div className = "paymentAndOrderSummary">
        <table>
          <thead>
            <tr>
              <td><h3>Payment and Order Summary</h3></td>
            </tr>
          </thead>
          {printSummary()}
        </table>
        
        <div className="summary">
          <div style={{display:"flex", justifyContent:"space-between", marginTop:"10px", marginBottom:"10px"}}>
            <div><b>Total</b></div> <div>P {total}</div>
          </div>

          <button className="nav-btns">Add Order</button>

        </div>
      </div>
    </form>
  );
};

export default OrderLog;
