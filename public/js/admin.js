const userStatusChange = async (id, element) => {
  const { data: authStatus } = await axios.put("/api/v1/users/status", {
    //se cambia el nombre de data por authStatus
    id,
    auth: element.checked,
  });
  Swal.fire({
    text: authStatus ? "Usuario habilitado" : "Usuario deshabilitado",
    icon: authStatus ? "success" : "error",
    confirmButtonText: "Ok",
  });
};
