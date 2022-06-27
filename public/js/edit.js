const deleteBtn = document.getElementById("deleteBtn");

const data = localStorage.getItem("user");
const user = JSON.parse(data);
const id = user.id;

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const { data: token } = await axios.delete(`api/v1/user/delete/${user.id}`);
    Swal.fire({
      text: "Usuario eliminado",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    setTimeout(() => {
      window.location = `/`;
    }, 2500);
  } catch (error) {
    Swal.fire({
      title: "Oppss!",
      text: error.response.data.error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let [email, nombre, password, repassword, anios_experiencia, especialidad] =
    document.querySelectorAll("input");
  nombre = nombre.value;
  password = password.value;
  repassword = repassword.value;
  anios_experiencia = anios_experiencia.value;
  especialidad = especialidad.value;

  const skater = {
    id,
    nombre,
    password,
    anios_experiencia,
    especialidad,
  };

  try {
    if (password !== repassword) {
      Swal.fire({
        title: "Error!",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const { data: token } = await axios.put("api/v1/user/update", skater);
      Swal.fire("Actualizado!", "Se ha actualizado correctamente", "success");
      setTimeout(() => {
        window.location = "/";
      }, 2500);
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response.data.error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});
