import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import './admindetails.css'


Chart.register(CategoryScale, LinearScale, BarElement);

const AdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [chargeCustomers, setChargeCustomers] = useState(true);
    const [customAmount, setCustomAmount] = useState(0);
    const [regularAmounts, setRegularAmounts] = useState([0, 0, 0, 0]);
  
    useEffect(() => {
      fetch('https://stg.dhunjam.in/account/admin/4')
        .then(response => response.json())
        .then(data => {
          setAdminDetails(data.data);
          // Set initial values based on the fetched data
          setChargeCustomers(data.data.charge_customers === 'true');
          setCustomAmount(data.data.amount.category_6);
          setRegularAmounts([
            data.data.amount.category_7,
            data.data.amount.category_8,
            data.data.amount.category_9,
            data.data.amount.category_10,
          ]);
        })
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleChargeCustomersChange = event => {
      setChargeCustomers(event.target.value === 'true');
    };
  
    const handleCustomAmountChange = event => {
      setCustomAmount(event.target.value);
    };
  
    const handleRegularAmountChange = (index, event) => {
      const newRegularAmounts = [...regularAmounts];
      newRegularAmounts[index] = event.target.value;
      setRegularAmounts(newRegularAmounts);
    };
  
    const handlePriceUpdate = () => {
   
      fetch('https://stg.dhunjam.in/account/admin/4', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          charge_customers: chargeCustomers ? 'true' : 'false',
          amount: {
            category_6: customAmount,
            category_7: regularAmounts[0],
            category_8: regularAmounts[1],
            category_9: regularAmounts[2],
            category_10: regularAmounts[3],
          },
        }),
      })
        .then(response => response.json())
        .then(data => setAdminDetails(data.data))
        .catch(error => console.error('Error:', error));
    };
  
    const data = {
      labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
      datasets: [
        {
          label: 'Song Request Amount',
          data: chargeCustomers
            ? [customAmount, ...regularAmounts]
            : [0, 0, 0, 0, 0], 
          backgroundColor: '#F0C3F1',
        },
      ],
    };
  
    return (
      <div className="admin-container">
        <h1>
          {adminDetails?.name}, {adminDetails?.location} on Dhun Jam
        </h1>
        <label style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  marginBottom: '1rem'
}}>

          Do you want to charge your customers for requesting songs?
          <span style={{
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems:'center',
         gap:'5%'
         
      }}>
            <input
              type="radio"
              name="chargeCustomers"
              value="true"
              onChange={handleChargeCustomersChange}
              checked={chargeCustomers}
            />{' '}
            Yes
            <input
              type="radio"
              name="chargeCustomers"
              value="false"
              onChange={handleChargeCustomersChange}
              checked={!chargeCustomers}
            />{' '}
            No
          </span>
        </label>
        {chargeCustomers && (
          <>
            <label className="chargecustometers">
              Custom song request amount
              <input
                type="number"
                min="99"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </label>
            <div className="cat">
              <p>Regular song request amounts, from high to low-</p>
              <span>
                {['category_7', 'category_8', 'category_9', 'category_10'].map(
                  (category, index) => (
                    <label className="category" key={category}>
                      <input
                      style={{
                        padding: '5px'
                      }}
                        type="number"
                        min={79 - index * 20}
                        value={regularAmounts[index]}
                        onChange={event => handleRegularAmountChange(index, event)}
                      />
                    </label>
                  )
                )}
              </span>
            </div>
          </>
        )}
        {adminDetails && chargeCustomers && <Bar data={data} />} {/* Show graph if charging customers */}
        {chargeCustomers && (
      <>
        {/* ... (existing code for input fields) */}
        <button onClick={handlePriceUpdate}>Update Price</button>
      </>
    )}
    {!chargeCustomers && (
      <button onClick={handlePriceUpdate} disabled>
        Update Price
      </button>
    )}
      </div>
    );
  };
  
  export default AdminDetails;
  

