function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.querySelector('#to').innerHTML = getParameterByName('to');

const audio = (() => {
    let instance;

    let getInstance = function () {
        if (!instance) {
            let url = document.getElementById('tombol-musik').getAttribute('data-url').toString();
            instance = new Audio(url);
        }

        return instance;
    };

    return {
        play: function () {
            getInstance().play();
        },
        pause: function () {
            getInstance().pause();
        }
    };
})();

const salin = (btn) => {
    navigator.clipboard.writeText(btn.getAttribute('data-nomer').toString());
    btn.innerHTML = 'Copied';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = 'Copy';
        btn.disabled = false;
    }, 1500);
};

const timer = () => {
    let tanggal = document.getElementById('tampilan-waktu').getAttribute('data-waktu').toString();
    let countDownDate = new Date(tanggal).getTime();
    let time = null;

    time = setInterval(() => {
        let distance = countDownDate - (new Date().getTime());

        if (distance < 0) {
            clearInterval(time);
            return false;
        }

        document.getElementById('hari').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('jam').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('menit').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('detik').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
};

// var modal = document.querySelector(".protokol-kesehatan");
// var trigger = document.querySelector(".trigger");
// var closeButton = document.querySelector(".prokes-close-button");

// function toggleModal() {
//     setTimeout(() => {
//         modal.classList.toggle("prokes-show-modal");
//     }, 100);
// }

// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleModal();
//     }
// }

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);


const buka = () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('tombol-musik').style.display = 'block';
    AOS.init();
    // login();
    audio.play();
    create_unfinished_task();
};

const play = (btn) => {
    let isPlay = btn.getAttribute('data-status').toString() == 'true';

    if (!isPlay) {
        btn.setAttribute('data-status', 'true');
        audio.play();
        btn.innerHTML = '<i class="fa-solid fa-circle-pause" style="color:#b29884"></i>';
    } else {
        btn.setAttribute('data-status', 'false');
        audio.pause();
        btn.innerHTML = '<i class="fa-solid fa-circle-play" style="color:#b29884"></i>';
    }
};

// const renderCard = (data) => {
//     const DIV = document.createElement('div');
//     DIV.classList.add('mb-3');
//     DIV.innerHTML = `
//     <div class="card-body bg-light shadow p-2 m-0 rounded-3">
//         <div class="d-flex flex-wrap justify-content-between align-items-center">
//             <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;">
//                 <strong class="me-1">${data.nama}</strong>${data.hadir ? '<i class="fa-solid fa-circle-check text-success"></i>' : '<i class="fa-solid fa-circle-xmark text-danger"></i>'}
//             </p>
//             <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${data.created_at}</small>
//         </div>
//         <hr class="text-dark mt-1 mb-2">
//         <p class="text-dark mt-1 mb-0 mx-0 p-0" style="white-space: pre-line">${data.komentar}</p>
//     </div>`;
//     return DIV;
// };

// const ucapan = async () => {
//     const UCAPAN = document.getElementById('daftarucapan');
//     UCAPAN.innerHTML = `<div class="text-center"><span class="spinner-border spinner-border-sm me-1"></span>Loading...</div>`;
//     let token = localStorage.getItem('token') ?? '';

//     if (token.length == 0) {
//         alert('Terdapat kesalahan, token kosong !');
//         window.location.reload();
//         return;
//     }

//     const REQ = {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         }
//     };

//     await fetch('https://undangan-api-gules.vercel.app/api/comment', REQ)
//         .then((res) => res.json())
//         .then((res) => {
//             if (res.code == 200) {
//                 UCAPAN.innerHTML = null;
//                 res.data.forEach((data) => UCAPAN.appendChild(renderCard(data)));

//                 if (res.data.length == 0) {
//                     UCAPAN.innerHTML = `<div class="h6 text-center">Tidak ada data</div>`;
//                 }
//             }

//             if (res.error.length != 0) {
//                 if (res.error[0] == 'Expired token') {
//                     alert('Terdapat kesalahan, token expired !');
//                     window.location.reload();
//                     return;
//                 }

//                 alert(res.error[0]);
//             }
//         })
//         .catch((err) => alert(err));
// };

// const login = async () => {
//     const UCAPAN = document.getElementById('daftarucapan');
//     UCAPAN.innerHTML = `<div class="text-center"><span class="spinner-border spinner-border-sm me-1"></span>Loading...</div>`;
//     let body = document.querySelector('body');

//     const REQ = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: body.getAttribute('data-email').toString(),
//             password: body.getAttribute('data-password').toString()
//         })
//     };

//     await fetch('https://fiya-kharis-api.vercel.app//api/login', REQ)
//         .then((res) => res.json())
//         .then((res) => {
//             if (res.code == 200) {
//                 localStorage.removeItem('token');
//                 localStorage.setItem('token', res.data.token);
//                 ucapan();
//             }

//             if (res.error.length != 0) {
//                 alert('Terdapat kesalahan, ' + res.error[0]);
//                 window.location.reload();
//                 return;
//             }
//         })
//         .catch(() => {
//             alert('Terdapat kesalahan, otomatis reload halaman');
//             window.location.reload();
//             return;
//         });
// };

// const kirim = async () => {
//     let nama = document.getElementById('formnama').value;
//     let hadir = document.getElementById('hadiran').value;
//     let komentar = document.getElementById('formpesan').value;
//     let token = localStorage.getItem('token') ?? '';

//     if (token.length == 0) {
//         alert('Terdapat kesalahan, token kosong !');
//         window.location.reload();
//         return;
//     }

//     if (nama.length == 0) {
//         alert('nama tidak boleh kosong');
//         return;
//     }

//     if (nama.length >= 35) {
//         alert('panjangan nama maksimal 35');
//         return;
//     }

//     if (hadir == 0) {
//         alert('silahkan pilih kehadiran');
//         return;
//     }

//     if (komentar.length == 0) {
//         alert('pesan tidak boleh kosong');
//         return;
//     }

//     document.getElementById('kirim').disabled = true;
//     document.getElementById('kirim').innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`;

//     const REQ = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             nama: nama,
//             hadir: hadir == 1,
//             komentar: komentar
//         })
//     };

//     await fetch('https://undangan-api-gules.vercel.app/api/comment', REQ)
//         .then((res) => res.json())
//         .then((res) => {
//             if (res.code == 201) {
//                 document.getElementById('formnama').value = null;
//                 document.getElementById('hadiran').value = 0;
//                 document.getElementById('formpesan').value = null;
//                 ucapan();
//             }

//             if (res.error.length != 0) {
//                 if (res.error[0] == 'Expired token') {
//                     alert('Terdapat kesalahan, token expired !');
//                     window.location.reload();
//                     return;
//                 }

//                 alert(res.error[0]);
//             }
//         })
//         .catch((err) => alert(err));

//     document.getElementById('kirim').disabled = false;
//     document.getElementById('kirim').innerHTML = `Kirim<i class="fa-solid fa-paper-plane ms-1"></i>`;
// };

document.addEventListener('DOMContentLoaded', () => {
    getParameterByName('to');
    let modal = new bootstrap.Modal('#exampleModal');
    modal.show();
    timer();

});

var firebaseConfig = {
    apiKey: "AIzaSyBbKtu4XbMvEFZDb-FGgMxW40RyNbllHfE",
    authDomain: "qonita-9d7ca.firebaseapp.com",
    databaseURL: "https://qonita-9d7ca-default-rtdb.firebaseio.com",
    projectId: "qonita-9d7ca",
    storageBucket: "qonita-9d7ca.appspot.com",
    messagingSenderId: "295376988706",
    appId: "1:295376988706:web:f6f7bde6ae3ddc6b88f87b",
    measurementId: "G-4H0HZGXW5P"
  };
  
  // var firebaseConfig = {
  //     apiKey: "AIzaSyAcRO57X8UNRAZ0rLhGjYk2ttXX95VtI84",
  //     authDomain: "comments-7198f.firebaseapp.com",
  //     databaseURL: "https://comments-7198f-default-rtdb.firebaseio.com",
  //     projectId: "comments-7198f",
  //     storageBucket: "comments-7198f.appspot.com",
  //     messagingSenderId: "376364050831",
  //     appId: "1:376364050831:web:14e14651ae6a51eade83fa",
  //     measurementId: "G-3W394RQG3Y"
  //   };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    function add_task(){
      input_box = document.getElementById("message");
      input_date = document.getElementById("name");
      input_hadir = document.getElementById("presention");
    
      if(input_box.value.length != 0 && input_date.value.length != 0 && input_hadir.value.length != 0){
        // our boxes have data and we take database
        var key = firebase.database().ref().child("yerry").push().key;
        var task = {
          title: input_box.value,
          date: input_date.value,
          hadir: input_hadir.value,
          key: key
        };
    
        var updates = {};
        updates["/yerry/" + key] = task;
        firebase.database().ref().update(updates);
        create_unfinished_task();
        swal("Pesan telah terkirim", "Silakan cek pesan anda di kolom yang sudah ada", "success");
        document.getElementById("name").value=''; 
        document.getElementById("message").value='';
      }
    }
  //date disini tuh nama orangnya ya
  
let presentHadir = 0;
let presentTidakHadir = 0;
let presentRagu = 0;
function create_unfinished_task(){
    unfinished_task_container = document.getElementsByClassName("container1")[0];
    unfinished_task_container.innerHTML = "";
    
    task_array = [];
    firebase.database().ref("yerry").once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        task_array.push(Object.values(childData));
        });
        for(var i, i = 0; i < task_array.length; i++){
            task_date = task_array[i][0];
            task_hadir = task_array[i][1];
            task_key = task_array[i][2];
            task_title = task_array[i][3];  

            task_container = document.createElement("div");
            task_container.setAttribute("class", "task_container");
            task_container.setAttribute("data-key", task_key);
        
            if(task_hadir==="Present"){
                presentHadir += 1;
            }else if(task_hadir==="Not Present"){
                presentTidakHadir += 1;
            }else{
                presentRagu += 1;
            }

            // TASK DATA  
            task_data = document.createElement('div');
            task_data.setAttribute('id', 'task_data');

            task_data1 = document.createElement('div');
            task_data1.setAttribute('id', 'task_data1');
        
            title = document.createElement('p');
            title.setAttribute('id', 'task_title');
            title.innerHTML = task_title;

            hadir = document.createElement('p');
            hadir.setAttribute('id', 'task_hadir');
            hadir.innerHTML = task_hadir + "-";

            date = document.createElement('p');
            date.setAttribute('id', 'task_date');
            date.innerHTML = "-" + task_date + "&nbsp; | &nbsp;";

            unfinished_task_container.append(task_container);
            task_container.append(task_data);
            task_data.append(title);
            task_data.append(task_data1)
            task_data1.append(date);
            task_data1.append(hadir);
        }
        jmlHadir = document.getElementById("jumlah-hadir");
        jmlTidakHadir = document.getElementById("jumlah-tidak-hadir");
        jmlRagu = document.getElementById("jumlah-ragu");
        jmlHadir.innerHTML = presentHadir;
        jmlTidakHadir.innerHTML = presentTidakHadir;
        jmlRagu.innerHTML = presentRagu;
    });


    


}

    
