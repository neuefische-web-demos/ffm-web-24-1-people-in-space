const people = document.querySelector("[data-js='people']");
const peopleList = document.querySelector("[data-js='list']");
const allButton = document.querySelector("[data-js='all']");
const issButton = document.querySelector("[data-js='iss']");
const tiangongButton = document.querySelector("[data-js='tiangong']");

allButton.addEventListener("click", () => renderPeople(allPeople));
issButton.addEventListener("click", () => renderPeople(peopleOnISS));
tiangongButton.addEventListener("click", () => renderPeople(peopleOnTiangong));

let allPeople;
let peopleOnISS;
let peopleOnTiangong;

async function fetchData() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();
  console.log("data: ", data);
  people.textContent = data.number;
  allPeople = data.people;
  peopleOnISS = data.people.filter((person) => person.craft === "ISS");
  peopleOnTiangong = data.people.filter(
    (person) => person.craft === "Tiangong"
  );
}

fetchData();

function renderPeople(people) {
  peopleList.textContent = "";
  people.forEach((person) => {
    const li = document.createElement("li");
    li.textContent = `${person.name} (${person.craft})`;
    peopleList.append(li);
  });
}
