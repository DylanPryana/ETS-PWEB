// halaman petugas: tampil tabel, cari, detail, edit, hapus

let isiTabel = document.getElementById("isiTabel");
let inputCari = document.getElementById("cari");
let modalDetail = new bootstrap.Modal(document.getElementById("modalDetail"));
let modalEdit = new bootstrap.Modal(document.getElementById("modalEdit"));

// nyimpen index anggota yang lagi diedit
let indexDiedit = -1;

// tampilkan tabel
function tampilkanTabel() {
  let semuaAnggota = ambilAnggota();
  let kataCari = inputCari.value.trim().toLowerCase();
  let barisHtml = "";
  let nomor = 0;

  for (let i = 0; i < semuaAnggota.length; i++) {
    let a = semuaAnggota[i];

    // filter pencarian berdasarkan nama atau NIM/NIP
    let cocok = a.nama.toLowerCase().includes(kataCari) || a.nomorInduk.toLowerCase().includes(kataCari);
    if (!cocok) {
      continue;
    }

    nomor++;
    barisHtml +=
      "<tr>" +
      "<td>" + nomor + "</td>" +
      "<td class='fw-semibold'>" + amankanTeks(a.nama) + "</td>" +
      "<td>" + amankanTeks(a.nomorInduk) + "</td>" +
      "<td>" + amankanTeks(a.prodi) + "</td>" +
      "<td><span class='badge text-bg-primary'>" + amankanTeks(a.jenis) + "</span></td>" +
      "<td>" + amankanTeks(a.telepon) + "</td>" +
      "<td>" + amankanTeks(a.email) + "</td>" +
      "<td class='text-center text-nowrap'>" +
      "<button class='btn btn-sm btn-outline-primary me-1' onclick='lihatDetail(" + i + ")' title='Detail'><i class='bi bi-eye'></i></button>" +
      "<button class='btn btn-sm btn-outline-warning me-1' onclick='bukaEdit(" + i + ")' title='Edit'><i class='bi bi-pencil'></i></button>" +
      "<button class='btn btn-sm btn-outline-danger' onclick='hapusAnggota(" + i + ")' title='Hapus'><i class='bi bi-trash'></i></button>" +
      "</td>" +
      "</tr>";
  }

  // kalau ga ada data yang cocok
  if (nomor === 0) {
    barisHtml = "<tr><td colspan='8' class='text-center teks-abu py-4'>Data anggota tidak ditemukan.</td></tr>";
  }

  isiTabel.innerHTML = barisHtml;
  document.getElementById("infoJumlah").textContent = "Menampilkan " + nomor + " dari " + semuaAnggota.length + " anggota";
}

// detail 
function lihatDetail(index) {
  let a = ambilAnggota()[index];

  document.getElementById("isiDetail").innerHTML =
    "<table class='table table-borderless mb-0'>" +
    "<tr><th style='width: 40%'>Nama Lengkap</th><td>" + amankanTeks(a.nama) + "</td></tr>" +
    "<tr><th>NIM / NIP</th><td>" + amankanTeks(a.nomorInduk) + "</td></tr>" +
    "<tr><th>Program Studi</th><td>" + amankanTeks(a.prodi) + "</td></tr>" +
    "<tr><th>Jenis Keanggotaan</th><td>" + amankanTeks(a.jenis) + "</td></tr>" +
    "<tr><th>Nomor Telepon</th><td>" + amankanTeks(a.telepon) + "</td></tr>" +
    "<tr><th>Email</th><td>" + amankanTeks(a.email) + "</td></tr>" +
    "<tr><th>Alamat</th><td>" + amankanTeks(a.alamat) + "</td></tr>" +
    "</table>";

  modalDetail.show();
}

// edit
function bukaEdit(index) {
  let a = ambilAnggota()[index];
  indexDiedit = index;

  // isi form edit pake data lama
  document.getElementById("editNama").value = a.nama;
  document.getElementById("editNomorInduk").value = a.nomorInduk;
  document.getElementById("editProdi").value = a.prodi;
  document.getElementById("editJenis").value = a.jenis;
  document.getElementById("editTelepon").value = a.telepon;
  document.getElementById("editEmail").value = a.email;
  document.getElementById("editAlamat").value = a.alamat;
  document.getElementById("pesanEdit").innerHTML = "";

  modalEdit.show();
}

document.getElementById("formEdit").addEventListener("submit", function (e) {
  e.preventDefault();

  let dataBaru = {
    nama: document.getElementById("editNama").value.trim(),
    nomorInduk: document.getElementById("editNomorInduk").value.trim(),
    prodi: document.getElementById("editProdi").value,
    jenis: document.getElementById("editJenis").value,
    telepon: document.getElementById("editTelepon").value.trim(),
    email: document.getElementById("editEmail").value.trim(),
    alamat: document.getElementById("editAlamat").value.trim()
  };

  // validasinya sama kayak form pendaftaran
  if (dataBaru.nama === "" || dataBaru.nomorInduk === "" || dataBaru.telepon === "" ||
      dataBaru.email === "" || dataBaru.alamat === "") {
    tampilkanNotif("pesanEdit", "Semua kolom wajib diisi.", "danger");
    return;
  }
  if (!emailValid(dataBaru.email)) {
    tampilkanNotif("pesanEdit", "Format email tidak valid.", "danger");
    return;
  }
  if (!teleponValid(dataBaru.telepon)) {
    tampilkanNotif("pesanEdit", "Nomor telepon harus berupa angka 10–13 digit.", "danger");
    return;
  }

  let semuaAnggota = ambilAnggota();

  // NIM/NIP ga boleh sama kayak anggota LAIN (diri sendiri boleh)
  for (let i = 0; i < semuaAnggota.length; i++) {
    if (i !== indexDiedit && semuaAnggota[i].nomorInduk === dataBaru.nomorInduk) {
      tampilkanNotif("pesanEdit", "NIM/NIP sudah dipakai anggota lain.", "danger");
      return;
    }
  }

  semuaAnggota[indexDiedit] = dataBaru;
  simpanAnggota(semuaAnggota);

  modalEdit.hide();
  tampilkanTabel();
  tampilkanNotif("notifikasi", "Data <b>" + amankanTeks(dataBaru.nama) + "</b> berhasil diperbarui.", "success");
});

// hapus
function hapusAnggota(index) {
  let semuaAnggota = ambilAnggota();
  let nama = semuaAnggota[index].nama;

  // dialog konfirmasi dulu sebelum dihapus
  let yakin = confirm("Yakin ingin menghapus anggota \"" + nama + "\"?");
  if (!yakin) {
    return;
  }

  semuaAnggota.splice(index, 1);
  simpanAnggota(semuaAnggota);
  tampilkanTabel();
  tampilkanNotif("notifikasi", "Data <b>" + amankanTeks(nama) + "</b> berhasil dihapus.", "success");
}

// logout
document.getElementById("tombolLogout").addEventListener("click", function () {
  sessionStorage.removeItem("sudahLogin");
  window.location.href = "login.html";
});

// pencarian jalan tiap kali ngetik
inputCari.addEventListener("input", tampilkanTabel);

// tampilin tabel pas halaman pertama kali dibuka
tampilkanTabel();
