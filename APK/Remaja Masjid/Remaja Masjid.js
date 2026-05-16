/* =========================
   USER LOGIN
========================= */

const namaAdmin =
document.getElementById("namaAdmin");

const usernameLogin =
localStorage.getItem("username");

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
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

let sidebarOpen = false;

/* TOGGLE SIDEBAR */

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
   MENU HYPERLINK
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

  menuDashboard.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();

      window.location.href =
      "../Dashboard/dashboard.html";

    }
  );

}

/* REMAJA MASJID */

if(menuRemajaMasjid){

  menuRemajaMasjid.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();

      window.location.href =
      "../Remaja Masjid/Remaja Masjid.html";

    }
  );

}

/* HARIAN */

if(menuHarian){

  menuHarian.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();

      window.location.href =
      "../Infaq Harian/Infaq Harian.html";

    }
  );

}

/* JUMAT */

if(menuJumat){

  menuJumat.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();

      window.location.href =
      "../Infaq Jumat/Infaq Jumat.html";

    }
  );

}

/* PENGELUARAN */

if(menuPengeluaran){

  menuPengeluaran.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();

      window.location.href =
      "../Pengeluaran/Pengeluaran.html";

    }
  );
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
   AUTO CLOSE MOBILE
========================= */

const menuLinks =
document.querySelectorAll(
  ".menu a"
);

menuLinks.forEach((link)=>{

  link.addEventListener(
    "click",
    ()=>{

      if(window.innerWidth <= 900){

        sidebar.classList.remove(
          "active"
        );

        sidebarOpen = false;

      }

    }
  );

});

/* =========================
   KLIK LUAR SIDEBAR
========================= */

document.addEventListener(
  "click",
  (e)=>{

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

      sidebar.classList.remove(
        "active"
      );

      sidebarOpen = false;

    }

  }
);