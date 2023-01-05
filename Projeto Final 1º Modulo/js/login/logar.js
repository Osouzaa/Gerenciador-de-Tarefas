const logar = async () => {
  const login = document.getElementById("usuario").value;
  const password = document.getElementById("senha").value;


  const apiResponse = await fetch("http://localhost:3000/login");
  const users = await apiResponse.json();

  let persons = users.find((perso) => {
    return perso.login == login;
  });

  let senha = users.find((perso) => {
    return perso.senha == password;
  });

  if (persons !== undefined) {
    if (senha !== undefined) {
      location.href = "pages/index.html";
    } else {
      console.log(" Não Cadastrado");
      addTitle()
    }
  }


  console.log(senha)
  console.log(persons)

  limparCampo();
};

const limparCampo = () => {
  document.getElementById("usuario").value = "";
  document.getElementById("senha").value = "";
  
};

const listaApi = logar();


const addTitle = () => {
  document.getElementById('msgError').innerHTML = "Usuario ou senha incorreta"
}