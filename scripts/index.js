let transactions = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const filterSelect = document.getElementById("filter-select");
const filterBtn = document.getElementById("filter-btn");
const expensesTableBody = document.getElementById("expnese-table-body");
const totalAmountCell = document.getElementById("total-amount");

const addData = () => {
  const transaction = {
    type: document.getElementById("category-select").value,
    amount: document.getElementById("amount-input").value,
    date: document.getElementById("date-input").value,
  };
  console.log("Transaction:", transaction);
  if (validateTransaction(transaction)) {
    addTransaction(transaction);
    updateTransactionView(transaction);

    resetForm();
  }
};

const deleData = (index) => {
  const transactions = getTransactions();
  if (index >= 0 && index < transactions.length) {
    const transactionId = transactions[index].id;
    deleteTransaction(transactionId);
    updateTransactionView();
  } else {
    console.error("Invalid index:", index);
  }
};

const editTransaction = (index) => {
  document.getElementById("add-btn").style.display = "none";
  document.getElementById("update-btn").style.display = "block";

  const transactions = getTransactions();
  const currentTransaction = transactions[index];

  document.getElementById("category-select").value = currentTransaction.type;
  document.getElementById("amount-input").value = currentTransaction.amount;
  document.getElementById("date-input").value = currentTransaction.date;

  document.getElementById("update-btn").onclick = () => {
    const updatedTransaction = {
      id: currentTransaction.id,
      type: document.getElementById("category-select").value,
      amount: document.getElementById("amount-input").value,
      date: document.getElementById("date-input").value,
    };

    if (validateTransaction(updatedTransaction)) {
      updateTransaction(updatedTransaction);
      resetForm();
      updateTransactionView();
      document.getElementById("add-btn").style.display = "block";
      document.getElementById("update-btn").style.display = "none";
    } else {
      resetForm();
      updateTransactionView();
      document.getElementById("add-btn").style.display = "block";
      document.getElementById("update-btn").style.display = "none";
    }
  };
};
filterBtn.addEventListener("click", filterTransactions);
function filterTransactions() {
  updateTransactionView();
}
const updateTransactionView = () => {
  const transactions = getTransactions();
  const filter = filterSelect.value;
  console.log("Filter:", filter);
  const filteredTransactions = filter === "all" 
  ? transactions 
  : filter === "income" 
      ? transactions.filter(transaction => transaction.type === "income") 
      : transactions.filter(transaction => transaction.type !== "income");


  const tableBody = document.querySelector("#expenses-table-body");
  tableBody.innerHTML = generateTransactionHTML(filteredTransactions);
  totalAmount = 0;
  filteredTransactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalAmount += parseFloat(transaction.amount);
    } else {
      totalAmount -= parseFloat(transaction.amount);
    }
  });

  totalAmountCell.textContent = totalAmount.toFixed(2);
};

const resetForm = () => {
  document.getElementById("category-select").selectedIndex = 0;
  document.getElementById("amount-input").value = "";
  document.getElementById("date-input").value = "";
};

const validateTransaction = (transaction) => {
  return transaction.type === ""
    ? (alert("Transaction type is required"), false)
    : transaction.amount === "" || isNaN(transaction.amount)
    ? (alert("Please enter a valid amount"), false)
    : transaction.date === ""
    ? (alert("Please select a date"), false)
    : true;
};

const generateTransactionHTML = (transactions) => {
  let html = "";
  transactions.forEach((transaction, index) => {
    html += `
              <tr>
                  <td>${transaction.type}</td>
                  <td>${transaction.amount}</td>
                  <td>${transaction.date}</td>
                  <td>
                    <div class="button-container">
                        <button onclick="deleData(${index})" class="delete-button">Delete</button>
                        <button onclick="editTransaction(${index})" class="update-button">Edit</button>
                    </div>
                   </td>
              </tr>
          `;
  });
  return html;
};
document.addEventListener("DOMContentLoaded", () => updateTransactionView());
