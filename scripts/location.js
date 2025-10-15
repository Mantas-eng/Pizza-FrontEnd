const data = {
  vilnius: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Vilnius, Upės g. 9 (PC CUP)",
        reg: "Maisto tvarkymo nr. 130009509",
        phone: "+370 600 11111",
        hours: [
          "I–IV 10:30 – 22:00",
          "V–VI 10:30 – 23:00",
          "VII 10:30 – 22:00",
        ],
      },
      {
        title: "Vilnius, Ozo g. 18 (PPC OZAS)",
        reg: "Maisto tvarkymo nr. 130009799",
        phone: "+370 600 22222",
        hours: ["I–IV 10:00 – 22:00", "V–VI 10:00 – 22:30"],
      },
    ],
  },
  kaunas: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Kaunas, Laisvės al. 10",
        reg: "Maisto tvarkymo nr. 130008888",
        phone: "+370 600 33333",
        hours: [
          "I–IV 10:00 – 22:00",
          "V–VI 10:00 – 23:00",
          "VII 10:00 – 22:00",
        ],
      },
      {
        title: "Kaunas, Akropolio g. 1",
        reg: "Maisto tvarkymo nr. 130007777",
        phone: "+370 600 44444",
        hours: ["I–IV 10:00 – 22:00", "V–VI 10:00 – 22:30"],
      },
    ],
  },
  klaipeda: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Klaipėda, Taikos pr. 100",
        reg: "Maisto tvarkymo nr. 130006666",
        phone: "+370 600 55555",
        hours: [
          "I–IV 10:00 – 21:00",
          "V–VI 10:00 – 22:00",
          "VII 10:00 – 21:00",
        ],
      },
      {
        title: "Klaipėda, Herkaus Manto g. 30",
        reg: "Maisto tvarkymo nr. 130005555",
        phone: "+370 600 66666",
        hours: ["I–IV 10:00 – 22:00", "V–VI 10:00 – 23:00"],
      },
    ],
  },
  siauliai: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Šiauliai, Tilžės g. 109",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
      {
        title: "Šiauliai, Akropolio al. 5",
        reg: "Maisto tvarkymo nr. 130003333",
        phone: "+370 600 88888",
        hours: ["I–IV 10:00 – 22:00", "V–VI 10:00 – 23:00"],
      },
    ],
  },
  panevezys: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Ramygalos g. 66A",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  alytus: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Vilties g. 4",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  marijampole: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "gedimino g. 38",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  utena: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "J. Bartašiaus g 1",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  telsiai: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Kęstučio g. 5",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  mazeikiai: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Ventos g. 49",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
  jonava: {
    map: "https://www.google.com/maps/embed?pb=!1m18...",
    restaurants: [
      {
        title: "Žeimių g. 26 a",
        reg: "Maisto tvarkymo nr. 130004444",
        phone: "+370 600 77777",
        hours: ["I–IV 10:00 – 21:00", "V–VI 10:00 – 22:00"],
      },
    ],
  },
};

function loadCity(city) {
  const container = document.getElementById("restaurants-container");
  const mapFrame = document.getElementById("map-frame");
  container.innerHTML = "";

  const cityData = data[city];
  if (!cityData) return;

  mapFrame.src = cityData.map;

  cityData.restaurants.forEach((r) => {
    const card = document.createElement("div");
    card.className = "contact-card";
    card.innerHTML = `
      <h3>${r.title}</h3>
      <p>${r.reg}</p>
      <p>📞 ${r.phone}</p>
      <ul class="working-hours">
        ${r.hours.map((h) => `<li>${h}</li>`).join("")}
      </ul>
    `;
    container.appendChild(card);
  });
}

document.querySelectorAll(".sidebar li").forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".sidebar li")
      .forEach((l) => l.classList.remove("active"));
    li.classList.add("active");
    loadCity(li.dataset.city);
  });
});

loadCity("vilnius");
