const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

const addToLocalStorage = (key, newData) => {
  const existingData = getFromLocalStorage(key);
  const lastId =
    existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
  newData.id = lastId + 1;
  existingData.push(newData);
  localStorage.setItem(key, JSON.stringify(existingData));
  console.log("Auto-incremented ID:", newData.id);
};

const deleteFromLocalStorage = (key, id) => {
  const existingData = getFromLocalStorage(key);
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedData));
};
const updateDataInLocalStorage = (key, id, updatedData) => {
  const existingData = getFromLocalStorage(key);
  const updatedItems = existingData.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedData };
    }
    return item;
  });
  localStorage.setItem(key, JSON.stringify(updatedItems));
};
const addUser = (transaction) => addToLocalStorage("transactions", transaction);

const getUsers = () => getFromLocalStorage("transactions");

const deleteUser = (transactionId) =>
  deleteFromLocalStorage("transactions", userId);

const updateUser = (updatedTransaction) =>
  updateDataInLocalStorage(
    "transactions",
    updatedTransaction.id,
    updatedTransaction
  );
