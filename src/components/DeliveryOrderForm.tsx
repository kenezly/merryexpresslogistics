import React, { useState } from 'react';

const DeliveryOrderForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [orderDetails, setOrderDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { name, phone, pickupLocation, dropoffLocation, orderDetails };
    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful submission
      console.log('Order submitted successfully');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Pickup Location:</label>
        <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />
      </div>
      <div>
        <label>Dropoff Location:</label>
        <input type="text" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required />
      </div>
      <div>
        <label>Order Details:</label>
        <textarea value={orderDetails} onChange={(e) => setOrderDetails(e.target.value)} required></textarea>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default DeliveryOrderForm;