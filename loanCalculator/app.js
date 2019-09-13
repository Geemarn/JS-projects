const submitForm = document.querySelector("#loan-form");

submitForm.addEventListener("submit", function(e) {
  e.preventDefault();
  //hide result and show loader
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calcResults, 1000);
});

function calcResults(e) {
  //import UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //values
  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayment = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calcInterest, calcPayment);
  const monthly = (principal * x * calcInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayment).toFixed(2);
    totalInterest.value = (monthly * calcPayment - principal).toFixed(2);

    //show result and hide loader
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("please check the inputed numbers");
  }
}

//show errors func
function showError(err) {
  //hide result and loader
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";

  //create a div
  const errDiv = document.createElement("div");
  //add class using bootstrap
  errDiv.className = "alert alert-danger";
  //add text node
  errDiv.appendChild(document.createTextNode(err));

  //get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //insert error above heading
  card.insertBefore(errDiv, heading);

  //clear error after 3s
  setTimeout(clearErr, 3000);
}

//clear error mssg
function clearErr() {
  document.querySelector(".alert").remove();
}
