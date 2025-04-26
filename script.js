let members = [];
let products = [];

const memberForm = document.getElementById("memberForm");
const productForm = document.getElementById("productForm");
const memberList = document.getElementById("memberList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

let editingMemberIndex = null; // To track the member being edited
let editingProductIndex = null; // To track the product being edited

// Add Member
memberForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("memberName").value;
  const type = document.getElementById("membershipType").value;
  const start = document.getElementById("paymentDate").value;
  const months = parseInt(document.getElementById("monthsPaid").value);

  const end = new Date(start);
  end.setMonth(end.getMonth() + months);

  if (editingMemberIndex !== null) {
    members[editingMemberIndex] = { name, type, start, months, end: end.toLocaleDateString() };
    editingMemberIndex = null;
  } else {
    members.push({ name, type, start, months, end: end.toLocaleDateString() });
  }

  memberForm.reset();
  displayMembers(members);
});

function displayMembers(list) {
  memberList.innerHTML = "";
  list.forEach((m, i) => {
    memberList.innerHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.type}</td>
        <td>${m.start}</td>
        <td>${m.months}</td>
        <td>${m.end}</td>
        <td>
          <button onclick="editMember(${i})">Edit</button>
          <button onclick="deleteMember(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

function editMember(index) {
  const member = members[index];
  document.getElementById("memberName").value = member.name;
  document.getElementById("membershipType").value = member.type;
  document.getElementById("paymentDate").value = member.start;
  document.getElementById("monthsPaid").value = member.months;

  editingMemberIndex = index; // Set the index of the member being edited
}

function deleteMember(index) {
  members.splice(index, 1);
  displayMembers(members);
}

// Search Members
searchInput?.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = members.filter(m => m.name.toLowerCase().includes(query));
  displayMembers(filtered);
});

// Add Product
productForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameofcostomer = document.getElementById("thebuyername").value;
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const stock = parseInt(document.getElementById("productStock").value);

  if (editingProductIndex !== null) {
    products[editingProductIndex] = { nameofcostomer, name, price, stock };
    editingProductIndex = null;
  } else {
    products.push({ nameofcostomer, name, price, stock });
  }

  productForm.reset();
  displayProducts();
});

function displayProducts() {
  productList.innerHTML = "";
  products.forEach((p, i) => {
    productList.innerHTML += `
      <tr>
        <td>${p.nameofcostomer}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="editProduct(${i})">Edit</button>
          <button onclick="deleteProduct(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("thebuyername").value = product.nameofcostomer;
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productStock").value = product.stock;

  editingProductIndex = index; // Set the index of the product being edited
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProducts();
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "login.html";  // Redirect to login page
});

// Membership Type Button Functionality
const membershipButtons = document.querySelectorAll('.membership-btn');
const membershipTypeInput = document.getElementById('membershipType');

membershipButtons.forEach(button => {
  button.addEventListener('click', function () {
    membershipButtons.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
    membershipTypeInput.value = this.dataset.value;
  });
});
