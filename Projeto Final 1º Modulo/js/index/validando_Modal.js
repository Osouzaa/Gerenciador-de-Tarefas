function validandoTarefas() {
  const numero = document.getElementById("Number").value;
  const descrition = document.getElementById("descrition").value;
  const date = document.getElementById("date").value;
  const select = document.getElementById("select").value;

  if (numero !== '' && descrition !== ''  && date !== ''  && select !== 'Option') {
    document.getElementById("btt-save").disabled = false;
    return;
  }
  document.getElementById("btt-save").disabled = true;
}


