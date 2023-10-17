const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);
document
  .getElementById("transactions-button")
  .addEventListener("click", function () {
    window.location.href = "transactions.html";
  });

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  const currentBalance = getCurrentBalance();

  if (type === "2" && value > currentBalance) {
    const confirmResult = confirm(
      "Atenção: Ao adicionar esta despesa, seu saldo ficará negativo. Deseja continuar?"
    );

    if (!confirmResult) {
      return; // O usuário cancelou, não faz nada
    }
  }

  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  getCashIn();
  getcashOut();
  getTotal();

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
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getCashIn();
  getcashOut();
  getTotal();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getCashIn() {
  const transactions = data.transactions;

  const cashIn = transactions.filter((item) => item.type === "1");

  if (cashIn.length) {
    let cashInHtml = "";
    let limit = cashIn.length > 5 ? 5 : cashIn.length;

    for (let index = 0; index < limit; index++) {
      cashInHtml += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
            <div class="container p-0">
              <div class="row">
                <div class="col-12 col-md-8">
                  <p>${cashIn[index].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                  ${cashIn[index].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

function getcashOut() {
  const transactions = data.transactions;

  const cashOut = transactions.filter((item) => item.type === "2");

  if (cashOut.length) {
    let cashOutHtml = "";
    let limit = cashOut.length > 5 ? 5 : cashOut.length;

    for (let index = 0; index < limit; index++) {
      if (cashOut[index] && cashOut[index].value) {
        cashOutHtml += `
          <div class="row mb-4">
            <div class="col-12">
              <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
              <div class="container p-0">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <p>${cashOut[index].description}</p>
                  </div>
                  <div class="col-12 col-md-3 d-flex justify-content-end">
                    ${cashOut[index].date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }

    const cashOutListElement = document.getElementById("cash-out-list");
    if (cashOutListElement) {
      cashOutListElement.innerHTML = cashOutHtml;
    }
  }
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

function getTotal() {
  const currentBalance = getCurrentBalance();
  document.getElementById("total").innerHTML = `R$ ${currentBalance.toFixed(2)}`;
}

function saveData(data) {
  localStorage.setItem(logged, JSON.stringify(data));
}

var appElement = document.getElementById("app");

// Alterar a cor de fundo dos elementos
appElement.style.background = "linear-gradient(120deg, #FFA500 44.9%, #ffff 45%) no-repeat fixed";
