// Function to calculate uplift in kilograms
function calculateUpliftInKg(upliftLitres, specificFuelDensity) {
  return upliftLitres * specificFuelDensity;
}

// Function to calculate total fuel onboard after uplift
function calculateTotalFuelOnboard(departureFuel, upliftKg) {
  return departureFuel + upliftKg;
}

// Function to distribute fuel between tanks
function distributeFuel(arrivalFuel) {
  let leftTank = 0;
  let centerTank = 0;
  let rightTank = 0;

  if (arrivalFuel <= 12000) {
    // Distribute equally to left and right tanks
    leftTank = arrivalFuel / 2;
    rightTank = arrivalFuel / 2;
  } else {
    // Distribute up to 6000 kg to left and right tanks
    leftTank = Math.min(6000, arrivalFuel / 2);
    rightTank = Math.min(6000, arrivalFuel / 2);

    // Remaining fuel goes to center tank
    centerTank = arrivalFuel - leftTank - rightTank;
  }

  return { leftTank, centerTank, rightTank };
}

// Function to display the results
function displayResults(arrivalFuel, upliftedFuel, departureFuel, leftTank, centerTank, rightTank) {
  console.log(`Arrival Fuel: ${arrivalFuel} kg`);
  console.log(`Uplifted Fuel: ${upliftedFuel} kg`);
  console.log(`Departure Fuel: ${departureFuel} kg`);

  // Display tank distribution
  console.log(`Left Tank: ${leftTank} kg`);
  console.log(`Center Tank: ${centerTank} kg`);
  console.log(`Right Tank: ${rightTank} kg`);

  // Calculate and display totals
  const totalArrival = leftTank + centerTank + rightTank;
  console.log(`Total Arrival Fuel: ${totalArrival} kg`);
  console.log(`Total Uplifted Fuel: ${upliftedFuel} kg`);
  console.log(`Total Departure Fuel: ${departureFuel} kg`);
}

// Function to display the current date and time
function displayDateTime() {
  const currentDate = new Date();
  const localDateTimeString = currentDate.toLocaleString();
  const utcDateTimeString = currentDate.toISOString();

  console.log(`Local Date & Time: ${localDateTimeString}`);
  console.log(`UTC Time: ${utcDateTimeString}`);
}

// Main function to calculate fuel and update display
function calculateFuelAndUpdateDisplay(upliftLitres, specificFuelDensity, departureFuel) {
  const upliftKg = calculateUpliftInKg(upliftLitres, specificFuelDensity);
  const arrivalFuel = calculateTotalFuelOnboard(departureFuel, upliftKg);
  const { leftTank, centerTank, rightTank } = distributeFuel(arrivalFuel);

  // Display the results with the required output format
  displayResults(arrivalFuel, upliftKg, departureFuel, leftTank, centerTank, rightTank);
  
  // Display current date and time
  displayDateTime();
}

// Example usage
const upliftLitres = 8000;
const specificFuelDensity = 0.8;
const departureFuel = 15000;

calculateFuelAndUpdateDisplay(upliftLitres, specificFuelDensity, departureFuel);