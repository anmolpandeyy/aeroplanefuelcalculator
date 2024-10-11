import React, { useState } from 'react';
import './FuelCalculator.css';

// InputRow component for rendering individual input fields
const InputRow = ({ label, placeholder, value, onChange }) => {
  return (
    <div className='inputContainer'>
      <p>{label}</p>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange} // Handle input change
      />
    </div>
  );
};

// Main FuelCalculator component
const FuelCalculator = () => {
  // State variables for inputs and results
  const [upliftLitres, setUpliftLitres] = useState('');
  const [specificGravity, setSpecificGravity] = useState('');
  const [departureFuel, setDepartureFuel] = useState('');
  const [results, setResults] = useState(null);

  // Handle change for input fields
  const handleChange = (callback) => (event) => {
    const newValue = event.target.value;
    callback(newValue); // Update the corresponding state
  };

  // Calculate uplift in kg from uplift litres and specific gravity
  const calculateUpliftInKg = (upliftLitres, specificFuelDensity) => {
    return upliftLitres * specificFuelDensity; // Uplift in kg
  };

  // Calculate total fuel onboard
  const calculateTotalFuelOnboard = (departureFuel, upliftKg) => {
    return departureFuel + upliftKg; // Total fuel onboard
  };

  // Distribute fuel between tanks based on arrival fuel
  const distributeFuel = (arrivalFuel) => {
    let leftTank = 0;
    let centerTank = 0;
    let rightTank = 0;

    // Fuel distribution logic
    if (arrivalFuel <= 12000) {
      leftTank = arrivalFuel / 2;
      rightTank = arrivalFuel / 2;
    } else {
      leftTank = Math.min(6000, arrivalFuel / 2);
      rightTank = Math.min(6000, arrivalFuel / 2);
      centerTank = arrivalFuel - leftTank - rightTank;
    }

    return { leftTank, centerTank, rightTank }; // Return tank fuel amounts
  };

  // Format the current date to UTC string
  const formatDateToUTC = () => {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = currentDate.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
    const day = currentDate.getUTCDate();
    let hours = currentDate.getUTCHours();
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  // Calculate fuel values based on inputs
  const handleCalculate = () => {
    // Convert input values to numbers, defaulting to 0 if invalid
    const upliftLitresNum = Number(upliftLitres) || 0;
    const specificGravityNum = Number(specificGravity) || 0;
    const departureFuelNum = Number(departureFuel) || 0;

    // Ensure necessary inputs are provided to prevent crashing
    if (!upliftLitresNum || !specificGravityNum || !departureFuelNum) {
      alert("Please fill in all fields with valid numbers."); // Alert the user if any input is invalid
      return; // Exit if inputs are invalid
    }

    // Perform calculations
    const upliftKg = calculateUpliftInKg(upliftLitresNum, specificGravityNum);
    const arrivalFuel = calculateTotalFuelOnboard(departureFuelNum, upliftKg);
    const { leftTank, centerTank, rightTank } = distributeFuel(arrivalFuel);

    // Set results state
    setResults({
      upliftedFuel: upliftKg,
      arrivalFuel,
      departureFuel: departureFuelNum,
      leftTank,
      centerTank,
      rightTank,
      utcTime: formatDateToUTC() // Add UTC time to results
    });
  };

  // Reset all input fields and results
  const handleReset = () => {
    setUpliftLitres('');
    setSpecificGravity('');
    setDepartureFuel('');
    setResults(null);
  };

  return (
    <div className='container'>
      <h1>Fuel Calculator</h1>
      {/* Input Form */}
      {!results ? (
        <div className='inputForm'>
          <InputRow
            label="Uplift (Ltrs)"
            placeholder="Uplift (Ltrs)"
            value={upliftLitres}
            onChange={handleChange(setUpliftLitres)} // Handle uplift litres input
          />
          <InputRow
            label="Specific Gravity"
            placeholder="Specific Gravity"
            value={specificGravity}
            onChange={handleChange(setSpecificGravity)} // Handle specific gravity input
          />
          <InputRow
            label="Departure Fuel (kg)"
            placeholder="Departure Fuel (kg)"
            value={departureFuel}
            onChange={handleChange(setDepartureFuel)} // Handle departure fuel input
          />
          <div>
            <button onClick={handleCalculate}>Calculate</button> {/* Calculate button */}
          </div>
        </div>
      ) : (
        <div className='resultsTable'>
          {/* Input Parameters Table */}
          <table>
            <tbody>
              <tr>
                <td>Uplift (Ltrs)</td>
                <td>{upliftLitres}</td>
              </tr>
              <tr>
                <td>Specific Gravity</td>
                <td>{specificGravity}</td>
              </tr>
              <tr>
                <td>Departure Fuel (kg)</td>
                <td>{departureFuel}</td>
              </tr>
            </tbody>
          </table>

          <h2>Results</h2>
          <table>
            <thead>
              <tr>
                <th>Tank</th>
                <th>Arrival Fuel (kg)</th>
                <th>Uplifted Fuel (kg)</th>
                <th>Total Fuel (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Left</td>
                <td>{results.leftTank}</td>
                <td>{results.upliftedFuel}</td>
                <td>{(results.leftTank + results.upliftedFuel + results.departureFuel)}</td>
              </tr>
              <tr>
                <td>Center</td>
                <td>{results.centerTank}</td>
                <td>0</td>
                <td>{(results.centerTank + results.departureFuel)}</td>
              </tr>
              <tr>
                <td>Right</td>
                <td>{results.rightTank}</td>
                <td>{results.upliftedFuel}</td>
                <td>{(results.rightTank + results.upliftedFuel + results.departureFuel)}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{(results.leftTank + results.centerTank + results.rightTank)}</td>
                <td>{results.upliftedFuel}</td>
                <td>{(results.departureFuel + results.upliftedFuel + results.leftTank + results.centerTank + results.rightTank)}</td>
              </tr>
              <tr>
                <td colSpan="3">Coordinated Universal Time</td>
                <td>{results.utcTime}</td>
              </tr>
            </tbody>
          </table>
          <div className='currentTime'>
            <p>Current Time: {new Date().toLocaleString()}</p>
          </div>
          <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button> {/* Reset button */}
        </div>
      )}
    </div>
  );
};

export default FuelCalculator;