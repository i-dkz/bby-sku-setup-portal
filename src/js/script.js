const vendors = ["Asus", "Apple", "HP", "LG", "Samsung"];
const categories = ["TV", "Desktop Computer", "Laptop", "Console"]

// Function to populate options in the select element
function populateVendors() {
  const vendorSelect = document.getElementById("vendor");

  // Clear existing Vendors
  vendorSelect.innerHTML = '<option value="">Select Vendor</option>';

  // Add Vendors based on the dynamic list
  vendors.forEach((vendor) => {
    const option = document.createElement("option");
    option.value = vendor;
    option.text = vendor;
    vendorSelect.appendChild(option);
  });
}
// Storing data in localStorage
localStorage.setItem('key', 'value');

function populateCategories() {
  const categorySelect = document.getElementById("productCategory");

  // Clear existing Vendors
  categorySelect.innerHTML = '<option value="">Select Category</option>';

  // Add Vendors based on the dynamic list
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categorySelect.appendChild(option);
  });
}

// let vendor = "";
// let category = "";
// let numOfSKUs = 0;

document.getElementById('mainForm').addEventListener('submit', function(e) {
  // e.preventDefault(); // Prevent the default form submission
  const formData = new FormData(this); // Capture the form data
})

document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  document.getElementById('toggle').addEventListener('click', function(e) {
    body.classList.toggle('dark');
  });
});


// Call the function to populate Vendors on page load
populateVendors();
populateCategories();

