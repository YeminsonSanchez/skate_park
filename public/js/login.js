const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let [email, password] = document.querySelectorAll("input");
  email = email.value;
  password = password.value;
  try {
    const { data } = await axios.post("api/v1/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    window.location.href = `/edit?token=${data.token}`;
  } catch (error) {
    Swal.fire({
      title: "Oppss!",
      text: error.response.data.error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});
