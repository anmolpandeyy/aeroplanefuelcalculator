import React, { useState } from 'react';

const FuelCalculator = () => {
  const [upliftLitres, setUpliftLitres] = useState(0);
  const [specificFuelDensity, setSpecificFuelDensity] = useState(0.8);
  const [departureFuel, setDepartureFuel] = useState(0);
  const [results, setResults] = useState(null);

  const calculateFuel = () => {
    const upliftKg = upliftLitres * specificFuelDensity;
    const arrivalFuel = departureFuel + upliftKg;

    let leftTank = 0, centerTank = 0, rightTank = 0;

    if (arrivalFuel <= 12000) {
      leftTank = arrivalFuel / 2;
      rightTank = arrivalFuel / 2;
    } else {
      leftTank = Math.min(6000, arrivalFuel / 2);
      rightTank = Math.min(6000, arrivalFuel / 2);
      centerTank = arrivalFuel - leftTank - rightTank;
    }

    setResults({
      arrivalFuel,
      upliftedFuel: upliftKg,
      departureFuel,
      leftTank,
      centerTank,
      rightTank,
      totalArrival: leftTank + centerTank + rightTank
    });
  };

  return (
    <div>
      <h1>Fuel Calculator</h1>
      <input
        type="number"
        placeholder="Uplift Litres"
        value={upliftLitres}
        onChange={(e) => setUpliftLitres(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Departure Fuel (kg)"
        value={departureFuel}
        onChange={(e) => setDepartureFuel(Number(e.target.value))}
      />
      <button onClick={calculateFuel}>Calculate</button>

      {results && (
        <div>
          <h2>Results</h2>
          <p>Arrival Fuel: {results.arrivalFuel} kg</p>
          <p>Uplifted Fuel: {results.upliftedFuel} kg</p>
          <p>Left Tank: {results.leftTank} kg</p>
          <p>Center Tank: {results.centerTank} kg</p>
          <p>Right Tank: {results.rightTank} kg</p>
          <p>Total Arrival Fuel: {results.totalArrival} kg</p>
        </div>
      )}
    </div>
  );
};

export default FuelCalculator;