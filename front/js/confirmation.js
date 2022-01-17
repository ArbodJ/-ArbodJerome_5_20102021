const idLocation = document.querySelector("#orderId");
const catchUrl = window.location.search;
const catchOrderId = new URLSearchParams(catchUrl);
const putOrderIdInUrl = catchOrderId.get('name');
idLocation.textContent = putOrderIdInUrl;