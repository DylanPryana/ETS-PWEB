// ===== login.js =====
// login petugas cuma simulasi, username & password ditulis langsung di sini

const USERNAME_PETUGAS = "admin";
const PASSWORD_PETUGAS = "admin123";

// kalau udah login sebelumnya, langsung ke halaman data anggota
if (sessionStorage.getItem("sudahLogin") === "ya") {
  window.location.href = "anggota.html";
}

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;
  let pesan = document.getElementById("pesanLogin");

  if (username === USERNAME_PETUGAS && password === PASSWORD_PETUGAS) {
    // tandain udah login (ilang kalau tab ditutup)
    sessionStorage.setItem("sudahLogin", "ya");
    window.location.href = "anggota.html";
  } else {
    pesan.innerHTML = '<div class="alert alert-danger py-2"><i class="bi bi-exclamation-triangle me-2"></i>Username atau password salah.</div>';
  }
});
