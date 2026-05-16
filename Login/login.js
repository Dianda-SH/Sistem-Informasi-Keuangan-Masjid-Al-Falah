// login.js

document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENT */

  const loginForm =
  document.getElementById("loginForm");

  /* LOGIN */

  if(loginForm){

    loginForm.addEventListener("submit", function(e){

      e.preventDefault();

      /* INPUT */

      const username =
      document.getElementById("username")
      .value
      .trim();

      const password =
      document.getElementById("password")
      .value;

      /* PASSWORD YANG BENAR */

      const passwordBenar =
      "12345";

      /* VALIDASI */

      if(username !== "" && password === passwordBenar){

        /* SIMPAN STATUS LOGIN */

        localStorage.setItem(
          "isLogin",
          "true"
        );

        /* SIMPAN USERNAME */

        localStorage.setItem(
          "username",
          username
        );

        /* PINDAH HALAMAN */

        window.location.href =
        "../Dashboard/dashboard.html";

      }else{

        alert(
          "Password salah atau username kosong"
        );

      }

    });

  }

});