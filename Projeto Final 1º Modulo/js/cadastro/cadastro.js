const form = document.getElementById("form-cadastro");


const salvarLogin = async (login) => {
  await fetch("https://meu-json-server.vercel.app/login", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login.login,
      email: login.email,
      telefone: login.telefone,
      senha: login.senha,
      senha_Confirmada: login.confirm,
    }),
  });
};

const addLogin = async (login) => {
  await salvarLogin(login);
  document.getElementById("msgError").innerHTML = "Cadastrado com Sucesso!";
  voltarPage();
};

function voltarPage() {
  setTimeout(() => {
    location.href = "../login.html";
  }, 3000);
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const login = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const senha = form.elements["senha"].value.trim();
    const confirm = form.elements["confirm-senha"].value.trim();

    addLogin({ login, email, senha, confirm });
  });
}
