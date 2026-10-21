// isinya fungsi-fungsi yang dipake bareng di beberapa halaman
// (ambil data, simpan data, notifikasi, sama cek inputan)

const KUNCI_DATA = "dataAnggota";

const dataContoh = [
  { nama: "Andi Pratama", nomorInduk: "5025241001", prodi: "Teknik Informatika", jenis: "Mahasiswa", telepon: "081234567801", email: "andi.pratama@email.com", alamat: "Jl. Mawar No. 10, Surabaya" },
  { nama: "Siti Rahmawati", nomorInduk: "5026241002", prodi: "Sistem Informasi", jenis: "Mahasiswa", telepon: "081234567802", email: "siti.rahma@email.com", alamat: "Jl. Melati No. 5, Surabaya" },
  { nama: "Budi Santoso", nomorInduk: "197805122005011001", prodi: "Teknik Elektro", jenis: "Dosen", telepon: "081234567803", email: "budi.santoso@email.com", alamat: "Jl. Kenanga No. 21, Sidoarjo" }
];

function ambilAnggota() {
  let data = localStorage.getItem(KUNCI_DATA);

  if (data === null) {
    simpanAnggota(dataContoh);
    return dataContoh;
  }

  return JSON.parse(data);
}

// simpan array anggota ke localStorage
function simpanAnggota(daftar) {
  localStorage.setItem(KUNCI_DATA, JSON.stringify(daftar));
}

// nampilin alert bootstrap di elemen tertentu
// tipe: "success" (hijau) atau "danger" (merah)
function tampilkanNotif(idTempat, pesan, tipe) {
  let tempat = document.getElementById(idTempat);
  let ikon = tipe === "success" ? "bi-check-circle" : "bi-exclamation-triangle";

  tempat.innerHTML =
    '<div class="alert alert-' + tipe + ' alert-dismissible fade show" role="alert">' +
    '<i class="bi ' + ikon + ' me-2"></i>' + pesan +
    '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
    '</div>';

  // notif ilang sendiri setelah 4 detik
  setTimeout(function () {
    tempat.innerHTML = "";
  }, 4000);
}

// cek format email (harus ada @ dan titik)
function emailValid(email) {
  let pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pola.test(email);
}

// cek nomor telepon (cuma angka, 10-13 digit)
function teleponValid(telepon) {
  let pola = /^[0-9]{10,13}$/;
  return pola.test(telepon);
}

// biar teks inputan user aman pas dimasukin ke innerHTML
function amankanTeks(teks) {
  return String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
