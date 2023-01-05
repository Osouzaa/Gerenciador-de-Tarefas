const modal = document.getElementById("modal");
const modalAviso = document.getElementById("modal__two");
const formulario = document.getElementById("subscribe");
const deletarTask = document.getElementById("btt-delete");

let toBeDeleted = 0;

let editManager = null;

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  document.getElementById("Number").value = "";
  document.getElementById("descrition").value = "";
  document.getElementById("date").value = "";
  document.getElementById("select").value = "Option";
  document.getElementById("btt-save").disabled = true;
};

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const openModalDelete = (id) => {
  modalAviso.style.display = "block";
  toBeDeleted = id;

};

const closeModalAviso = () => {
  modalAviso.style.display = "none";
};

window.addEventListener("click", (event) => {
  if (event.target === modalAviso) {
    closeModalAviso();
  }
});

const getTasks = async () => {
  const apiResponse = await fetch("http://localhost:3000/tasks");
  const tasks = await apiResponse.json();
  const taskTable = document.getElementById("t-body");
  taskTable.innerHTML = "";

  tasks.forEach((tasks) => {
    const date = new Date(tasks.data);
    let dataFormatada =
      date.getDate() + 1 + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    taskTable.innerHTML =
      taskTable.innerHTML +
      `
              <th scope="row" id = "number" class = "corpo__tabela">${tasks.number}</th>
              <td id="descricaoo" class = "corpo__tabela">${tasks.descricao}</td>
              <td id="localDate" class = "corpo__tabela">${dataFormatada}</td>
              <td class = "${tasks.selecao.replace(" ", "-")}">${
        tasks.selecao
      }</td>
              <td id = "btt" class = "icon-btt">
                <img
                  src="../img/index/Pencil.svg"
                  alt="icone de editar"
                  class="icon"
                  onclick = "editTasks(${tasks.id})"
                />
                <img src="../img/index//Vector (3).svg"  alt="icone de deletar" onclick ="openModalDelete(${
                  tasks.id
                })" />
              </td>
            </tr>
          `;
  });
};

const getTask = async (id) => {
  const apiResponse = await fetch(`http://localhost:3000/tasks/${id}`);
  const taskManager = await apiResponse.json();
  return taskManager;
};

const deleteTasks = async () => {
  await fetch(`http://localhost:3000/tasks/${toBeDeleted}`, {
    method: "DELETE",
  });
  getTasks();
  closeModalAviso()
  toBeDeleted = 0;


 
};

const saveTasks = async (tasks) => {
  if (editManager === null) {
    await addTasks(tasks);
  } else {
    await uptadeTasks(editManager.id, tasks);
    editManager = null;
  }
  closeModal();
  getTasks();
};

const editTasks = async (id) => {
  editManager = await getTask(id);

  document.getElementById("Number").value = editManager.number;
  document.getElementById("descrition").value = editManager.descricao;
  document.getElementById("date").value = editManager.data;
  document.getElementById("select").value = editManager.selecao;
  document.getElementById("btt-save").disabled = false;

  openModal();
};

const addTasks = async (task) => {
  await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: task.numero,
      descricao: task.descricao,
      data: task.data,
      selecao: task.selecao,
    }),
  });
};

const uptadeTasks = async (id, tasks) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: tasks.numero,
      descricao: tasks.descricao,
      data: tasks.data,
      selecao: tasks.selecao,
    }),
  });
};

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = formulario.elements["Number"].value;
  const descricao = formulario.elements["descrition"].value;
  const data = formulario.elements["date"].value;
  const selecao = formulario.elements["select"].value;

  saveTasks({ numero, descricao, data, selecao });

  closeModal();
});
