// ngurusin form pendaftaran anggota

let formDaftar = document.getElementById("formDaftar");

formDaftar.addEventListener("submit", function (e) {
  e.preventDefault(); 

  // ambil semua isi inputan
  let anggotaBaru = {
    nama: document.getElementById("nama").value.trim(),
    nomorInduk: document.getElementById("nomorInduk").value.trim(),
    prodi: document.getElementById("prodi").value,
    jenis: document.getElementById("jenis").value,
    telepon: document.getElementById("telepon").value.trim(),
    email: document.getElementById("email").value.trim(),
    alamat: document.getElementById("alamat").value.trim()
  };

  // 1. cek semua kolom wajib udah diisi
  if (anggotaBaru.nama === "" || anggotaBaru.nomorInduk === "" || anggotaBaru.prodi === "" ||
      anggotaBaru.jenis === "" || anggotaBaru.telepon === "" || anggotaBaru.email === "" ||
      anggotaBaru.alamat === "") {
    tampilkanNotif("notifikasi", "Semua kolom wajib diisi.", "danger");
    return;
  }

  // 2. cek format email
  if (!emailValid(anggotaBaru.email)) {
    tampilkanNotif("notifikasi", "Format email tidak valid. Contoh: nama@email.com", "danger");
    return;
  }

  // 3. cek nomor telepon
  if (!teleponValid(anggotaBaru.telepon)) {
    tampilkanNotif("notifikasi", "Nomor telepon harus berupa angka 10–13 digit.", "danger");
    return;
  }

  // 4. cek NIM/NIP belum pernah dipake
  let semuaAnggota = ambilAnggota();
  let sudahAda = false;
  for (let i = 0; i < semuaAnggota.length; i++) {
    if (semuaAnggota[i].nomorInduk === anggotaBaru.nomorInduk) {
      sudahAda = true;
      break;
    }
  }

  if (sudahAda) {
    tampilkanNotif("notifikasi", "NIM/NIP <b>" + amankanTeks(anggotaBaru.nomorInduk) + "</b> sudah terdaftar.", "danger");
    return;
  }

  // kalau lolos semua, simpan
  semuaAnggota.push(anggotaBaru);
  simpanAnggota(semuaAnggota);

  tampilkanNotif("notifikasi", "Pendaftaran berhasil! <b>" + amankanTeks(anggotaBaru.nama) + "</b> sudah terdaftar sebagai anggota.", "success");
  formDaftar.reset();
  window.scrollTo(0, 0);
});
