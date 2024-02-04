const expenseForm = document.getElementById('expenseForm');
const expenseSummary = document.getElementById('expenseSummary');
const expensesTable = document.getElementById('expensesTable');
const totalExpense = document.createElement('p');

let dayExpenses = {};

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (dayExpenses[date]) {
        dayExpenses[date] += amount;
    } else {
        dayExpenses[date] = amount;
    }

    const newRow = document.createElement('tr');

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;

    const amountCell = document.createElement('td');
    amountCell.textContent = amount.toFixed(2);

    const dateCell = document.createElement('td');
    dateCell.textContent = date;

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        dayExpenses[date] -= amount;
        if (dayExpenses[date] <= 0) {
            delete dayExpenses[date];
            newRow.remove();
        } else {
            amountCell.textContent = dayExpenses[date].toFixed(2);
        }
        updateExpenseSummary();
    });
    deleteCell.appendChild(deleteButton);

    newRow.appendChild(descriptionCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(deleteCell);
    expensesTable.querySelector('tbody').appendChild(newRow);

    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';

    updateExpenseSummary();
});

function updateExpenseSummary() {
    let total = 0;
    for (const date in dayExpenses) {
        total += dayExpenses[date];
    }
    totalExpense.textContent = `Total expenses today: $${total.toFixed(2)}`;
    expenseSummary.appendChild(totalExpense);
}