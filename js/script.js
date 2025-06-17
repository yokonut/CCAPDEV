document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".box");
  const labRadios = document.querySelectorAll("input[name='lab']");

  const labSeatStatus = {
    1: {
      reserved: [2, 7, 15, 19, 23, 27, 29, 33],
      inUse: [8, 12, 32],
    },
    2: {
      reserved: [1, 5, 10],
      inUse: [11, 12],
    },
    3: {
      reserved: [6, 18, 25],
      inUse: [3, 7, 24],
    },
    4: {
      reserved: [4, 8, 9, 14],
      inUse: [16, 22],
    },
    5: {
      reserved: [20, 21, 30],
      inUse: [13, 31],
    },
  };

  let currentLab = "1";

  function updateSeatStatus(labNumber) {
    currentLab = labNumber;
    const seats = box.children;
    const reserved = labSeatStatus[labNumber]?.reserved || [];
    const inUse = labSeatStatus[labNumber]?.inUse || [];

    for (let i = 0; i < seats.length; i++) {
      const seat = seats[i];
      seat.id = "";
      seat.classList.remove("selectable", "selected");

      seat.onclick = null; // Remove old click listeners

      const seatNumber = i + 1;
      let temp = seat.children;
      if (reserved.includes(seatNumber)) {
        seat.id = "reserved";
        
        temp[1].innerHTML = "<a href='profile.html'>@anon</a>";
      } else if (inUse.includes(seatNumber)) {
        seat.id = "in-use";
        temp[1].innerHTML = "Occupied";
      } else {
        // Seat is available
        temp[1].innerHTML = "";
        seat.classList.add("selectable");
        seat.onclick = () => {
          seat.classList.toggle("selected");
          // You can handle selection submission here
          console.log(`Seat ${seatNumber} selected in Lab ${labNumber}`);
        };
      }
    }
  }

  labRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      updateSeatStatus(e.target.value);
    });
  });

  updateSeatStatus("1");
});


document.addEventListener("DOMContentLoaded", () => {
  const users = [
    { username: "yohan_ko@dlsu.edu.ph", password: "pass123" },
    { username: "marinas_carl@dlsu.edu.ph", password: "abc456" },
    { username: "aglugub_jerome@dlsu.edu.ph", password: "hello789" },
    { username: "mansukhani_asanro@dlsu.edu.ph", password: "markzuckerburg" },
    { username: "barbaso_dean@dlsu.edu.ph", password: "noyourenot" }
  ];

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const foundUser = users.find(
        (user) => user.username === email && user.password === password
      );

      if (foundUser) {
        alert("Login successful!");
        sessionStorage.setItem("currentUser", foundUser.username);
        window.location.href = "index.html"; 
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});
