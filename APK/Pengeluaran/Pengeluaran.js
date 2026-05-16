/* =========================
   USER LOGIN
========================= */

const namaAdmin =
document.getElementById(
  "namaAdmin"
);

const usernameLogin =
localStorage.getItem(
  "username"
);

if(usernameLogin && namaAdmin){

  namaAdmin.innerHTML =

  usernameLogin.charAt(0)
  .toUpperCase()

  +

  usernameLogin.slice(1);

}

/* =========================
   SIDEBAR
========================= */

const sidebar =
document.querySelector(
  ".sidebar"
);

const menuBtn =
document.getElementById(
  "menuBtn"
);

let sidebarOpen = false;

if(menuBtn){

  menuBtn.addEventListener(
    "click",
    ()=>{

      sidebar.classList.toggle(
        "active"
      );

      sidebarOpen =
      !sidebarOpen;

    }
  );

}

/* =========================
   MENU
========================= */

const menuDashboard =
document.getElementById(
  "menuDashboard"
);

const menuRemajaMasjid =
document.getElementById(
  "menuRemajaMasjid"
);

const menuHarian =
document.getElementById(
  "menuHarian"
);

const menuJumat =
document.getElementById(
  "menuJumat"
);

const menuPengeluaran =
document.getElementById(
  "menuPengeluaran"
);

/* DASHBOARD */

if(menuDashboard){

  menuDashboard.onclick =
  ()=>{

    window.location.href =
    "../Dashboard/dashboard.html";

  };

}

/* REMAJA MASJID */

if(menuRemajaMasjid){

  menuRemajaMasjid.onclick =
  ()=>{

    window.location.href =
    "../Remaja Masjid/Remaja Masjid.html";

  };

}

/* INFAQ HARIAN */

if(menuHarian){

  menuHarian.onclick =
  ()=>{

    window.location.href =
    "../Infaq Harian/Infaq Harian.html";

  };

}

/* INFAQ JUMAT */

if(menuJumat){

  menuJumat.onclick =
  ()=>{

    window.location.href =
    "../Infaq Jumat/Infaq Jumat.html";

  };

}

/* PENGELUARAN */

if(menuPengeluaran){

  menuPengeluaran.onclick =
  ()=>{

    window.location.href =
    "../Pengeluaran/Pengeluaran.html";

  };

}
/* logout */

if(menuLogout){

  menuLogout.onclick =
  ()=>{

    window.location.href =
    "../Login/login.html";

  };

}

/* =========================
   DATA KEUANGAN
========================= */

let dataKeuangan = [];

/* =========================
   ELEMENT
========================= */

const saldo =
document.getElementById(
  "saldo"
);

const pemasukan =
document.getElementById(
  "pemasukan"
);

const pengeluaran =
document.getElementById(
  "pengeluaran"
);

const tbody =
document.getElementById(
  "tbody"
);

const totalHarian =
document.getElementById(
  "totalHarian"
);

const totalTransaksi =
document.getElementById(
  "totalTransaksi"
);

const rataRata =
document.getElementById(
  "rataRata"
);

const statusText =
document.getElementById(
  "status"
);

/* =========================
   URL API
========================= */

const URL_API =
"https://script.google.com/macros/s/AKfycbzJFs3MGOcH-785ynYBCr_nugYClLpb8YxFWELZEHU1R3Mo-KZUCb2hJ44yZouKgoRn/exec";

/* =========================
   NAMA SHEET
========================= */

const NAMA_SHEET =
"Pengeluaran";

/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(
  angka
){

  return "Rp " +

  Number(angka)
  .toLocaleString(
    "id-ID"
  );

}

/* =========================
   TAMPILKAN DATA
========================= */

function tampilkanData(){

  let totalMasuk = 0;
  let totalKeluar = 0;
  let totalSemua = 0;

  if(tbody){

    tbody.innerHTML = "";

  }

  dataKeuangan.forEach((data)=>{

    const jumlah =
    Number(data.jumlah) || 0;

    totalSemua += jumlah;

    if(

      data.jenis
      .toLowerCase()
      .includes(
        "pengeluaran"
      )

    ){

      totalKeluar += jumlah;

    }else{

      totalMasuk += jumlah;

    }

    if(tbody){

      const tr =
      document.createElement(
        "tr"
      );

      tr.innerHTML = `

        <td>${data.jenis}</td>

        <td>${data.tanggal || "-"}</td>

        <td>${data.waktu || "-"}</td>

        <td>${data.keterangan}</td>

        <td>
          ${formatRupiah(jumlah)}
        </td>

      `;

      tbody.appendChild(tr);

    }

  });

  const totalSaldo =
  totalMasuk - totalKeluar;

  if(totalHarian){

    totalHarian.innerHTML =
    formatRupiah(
      totalKeluar
    );

  }

  if(totalTransaksi){

    totalTransaksi.innerHTML =
    dataKeuangan.length;

  }

  if(rataRata){

    const rata =

    dataKeuangan.length > 0

    ?

    totalSemua /
    dataKeuangan.length

    :

    0;

    rataRata.innerHTML =
    formatRupiah(
      Math.round(rata)
    );

  }

  if(saldo){

    saldo.innerHTML =
    formatRupiah(
      totalSaldo
    );

  }

  if(pemasukan){

    pemasukan.innerHTML =
    formatRupiah(
      totalMasuk
    );

  }

  if(pengeluaran){

    pengeluaran.innerHTML =
    formatRupiah(
      totalKeluar
    );

  }

  if(chartKeuangan){

    updateChart(
      totalMasuk,
      totalKeluar
    );

  }

}

/* =========================
   AMBIL DATA REALTIME
========================= */

async function ambilDataSpreadsheet(){

  try{

    const response =
    await fetch(

      URL_API +

      "?sheet=" +

      encodeURIComponent(
        NAMA_SHEET
      ) +

      "&t=" +

      Date.now()

    );

    const result =
    await response.json();

    dataKeuangan = [];

    result.forEach((item)=>{

      dataKeuangan.push({

        jenis:
        item.jenis || "",

        tanggal:
        item.tanggal || "",

        waktu:
        item.waktu || "",

        keterangan:
        item.keterangan || "",

        jumlah:
        Number(
          item.jumlah
        ) || 0

      });

    });

    tampilkanData();

  }catch(error){

    console.log(
      "ERROR AMBIL DATA:",
      error
    );

  }

}

/* =========================
   CHART
========================= */

const ctx =
document.getElementById(
  "chartKeuangan"
);

let chartKeuangan = null;

if(ctx){

  chartKeuangan =
  new Chart(ctx,{

    type:"line",

    data:{

      labels:[

        "Pemasukan",

        "Pengeluaran"

      ],

      datasets:[{

        label:"Keuangan",

        data:[0,0],

        tension:0.4,

        fill:true,

        borderWidth:3

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  });

}

/* =========================
   UPDATE CHART
========================= */

function updateChart(
  masuk,
  keluar
){

  if(!chartKeuangan) return;

  chartKeuangan
  .data
  .datasets[0]
  .data = [

    masuk,
    keluar

  ];

  chartKeuangan.update();

}

/* =========================
   LOAD DATA
========================= */

ambilDataSpreadsheet();

/* =========================
   REALTIME REFRESH
========================= */

setInterval(()=>{

  ambilDataSpreadsheet();

},3000);

/* =========================
   FORM
========================= */

const form =
document.getElementById(
  "formKeuangan"
);

/* =========================
   SUBMIT FORM
========================= */

if(form){

  form.addEventListener(

    "submit",

    async (e)=>{

      e.preventDefault();

      const tanggal =
      document.getElementById(
        "tanggal"
      ).value.trim();

      const waktu =
      document.getElementById(
        "waktu"
      ).value.trim();

      const keterangan =
      document.getElementById(
        "keterangan"
      ).value.trim();

      const jumlah =
      document.getElementById(
        "jumlah"
      ).value.trim();

      if(

        !tanggal ||
        !waktu ||
        !keterangan ||
        !jumlah

      ){

        statusText.innerHTML =

        "❌ Semua data wajib diisi";

        statusText.style.color =
        "red";

        return;

      }

      if(

        isNaN(jumlah) ||
        Number(jumlah) <= 0

      ){

        statusText.innerHTML =

        "❌ Jumlah harus angka";

        statusText.style.color =
        "red";

        return;

      }

      const data = {

        sheet:"Pengeluaran",

        jenis:"Pengeluaran",

        tanggal:tanggal,

        waktu:waktu,

        keterangan:keterangan,

        jumlah:Number(jumlah)

      };

      statusText.innerHTML =

      "⏳ Menyimpan data...";

      statusText.style.color =
      "#2563eb";

      try{

        const response =
        await fetch(URL_API,{

          method:"POST",

          body:JSON.stringify(data)

        });

        const result =
        await response.json();

        console.log(result);

        if(result.status === "success"){

          statusText.innerHTML =

          "✅ Data berhasil disimpan";

          statusText.style.color =
          "#16a34a";

          form.reset();

          setTimeout(()=>{

            ambilDataSpreadsheet();

          },1000);

        }else{

          statusText.innerHTML =

          "❌ Gagal menyimpan data";

          statusText.style.color =
          "red";

        }

      }catch(error){

        console.log(error);

        statusText.innerHTML =

        "❌ Error koneksi";

        statusText.style.color =
        "red";

      }

    }

  );

}

/* =========================
   TUTUP SAAT KLIK MENU
========================= */

const menuLinks =
document.querySelectorAll(".menu a");

menuLinks.forEach((link)=>{

  link.addEventListener("click",()=>{

    if(window.innerWidth <= 900){

      sidebar.classList.remove("active");

      sidebarOpen = false;

    }

  });

});

/* =========================
   TUTUP SAAT KLIK LUAR
========================= */

document.addEventListener("click",(e)=>{

  const klikSidebar =
  sidebar.contains(e.target);

  const klikMenu =
  menuBtn.contains(e.target);

  if(

    sidebarOpen &&
    !klikSidebar &&
    !klikMenu &&
    window.innerWidth <= 900

  ){

    sidebar.classList.remove("active");

    sidebarOpen = false;

  }

});