const modalConfirm = document.getElementById("modal-confirm");
const X = document.getElementById("time");

const openModal = () => {
  modalConfirm.style.display = "block";

  
};

const closeModal = () => {
  modalConfirm.style.display = "none";
};

window.addEventListener("click", (event) => {
  if (event.target === modalConfirm) {
    closeModal();
  }
});

setTimeout (() =>{
  closeModal ()
}, 5000)

