const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// ADICIONAR LACAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    const currentBalance = getCurrentBalance();

    if (type === "2" && value > currentBalance) {
        const confirmResult = confirm("Atenção: Ao adicionar esta despesa, seu saldo ficará negativo. Deseja continuar?");

        if (!confirmResult) {
            return; // O usuário cancelou, não faz nada
        }
    }

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso!");
});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser)  {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }

            // Adicione uma verificação para item.value antes de chamar toFixed
            const formattedValue = item.value ? item.value.toFixed(2) : "";

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${formattedValue}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `;
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getCurrentBalance() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    return total;
}

var appElement = document.getElementById("app");

// Alterar a cor de fundo dos elementos
appElement.style.background = "linear-gradient(120deg, #FFA500 44.9%, #ffff 45%) no-repeat fixed";
