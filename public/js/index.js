const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
        }

        saveSession(email,checksession);

        window.location.href = "home.html";

    }


});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const passwordConfirm = document.getElementById("password-confirm-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido");
        return;
    }

    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    if (password !== passwordConfirm) {
        alert("As senhas digitadas não coincidem. Por favor, confirme sua senha.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions:[]
    })

    myModal.hide();

    alert("conta criada com sucesso!");
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));

}

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}


function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return"";
}

// Selecionar os elementos pelos IDs
var loginElement = document.getElementById("login");


// Alterar a cor de fundo dos elementos
loginElement.style.background = "linear-gradient(120deg, #FFA500 44.9%, #ffff 45%) no-repeat fixed";




