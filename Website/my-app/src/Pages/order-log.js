import React, { useState } from 'react';
import { db, addDoc, collection, serverTimestamp } from '../firebase'; 

const OrderLog = () => {
  const [pizzaType, setPizzaType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Function to add a pizza sale to Firestore
  const addPizzaSale = async () => {
    try {
      await addDoc(collection(db, 'pizza_sales'), {
        pizza_type: pizzaType,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        timestamp: serverTimestamp(), 
      });
      console.log('Pizza sale added!');
    } catch (error) {
      console.error('Error adding sale: ', error);
    }
  };

  return (
    <div>
      <h2>Order Log</h2>
      <input
        type="text"
        placeholder="Pizza Type"
        value={pizzaType}
        onChange={(e) => setPizzaType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addPizzaSale}>Add Sale</button>
    </div>
  );
};

export default OrderLog;
