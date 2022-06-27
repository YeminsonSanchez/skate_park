const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form); //siempre que se envian archivos en formulario
  try {
    const { data } = await axios.post("api/v1/registro", formData);

    Swal.fire({
      title: "Bienvenido!",
      text: "Te has registrado con éxito, solo falta que el administrador te active",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setTimeout(() => {
      window.location = `/`;
    }, 2500);
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Oppss!",
      text: "Correo ya registrado en la competencia",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});
