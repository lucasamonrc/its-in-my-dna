const output = document.getElementById("recordsOutput");

const api = axios.create({
  baseURL: "https://its-in-my-dna.herokuapp.com/"
});

async function handleForm() {
  event.preventDefault();

  const firstName = event.target[0].value;
  const lastName = event.target[1].value;
  const dna = event.target[2].value.toUpperCase();

  if (dna.length < 10 || dna.length > 10 || dna.match(/[^ACGT]/g)) {
    alert("Invalid DNA sequence. Please, enter a 10 character sequence containing only the following characters: A, C, G, T");
    return;
  }

  const [user] = await postApi(firstName, lastName, dna);
  const records = await getApi();

  appController(user, records);
}

async function postApi(firstName, lastName, dna) {
  try {
    const { data } = await api.post("/records", { firstName, lastName, dna });
    return data;
  } catch (err) {
    console.error(err.message)
  }
}

async function getApi() {
  try {
    const { data } = await api.get("/records");
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

function appController(user, records) {
  const data = addMatch(user, records);

  renderResults(data);
}

function addMatch(user, records) {
  records.pop()

  for (let record of records) {
    record.match = calculateMatch(record.dna, user.dna);
  }

  return records;
}

function calculateMatch(dnaSource, dnaTarget) {
  let matches = 0;

  for (let i = 0; i < dnaSource.length; i++) {
    if (dnaSource[i] === dnaTarget[i]) matches++
  }

  return ((matches / 10) * 100);
}

function renderResults(data) {
  const tableEl = document.querySelector(".records");

  for (let record of data) {
    const row = createRow(record);
    tableEl.appendChild(row);
  }

  output.classList.toggle("hidden");
}

function createRow(record) {
  const newRow = document.createElement("tr");

  const firstNameData = document.createElement("td");
  const firstNameValue = document.createTextNode(record.first_name);
  firstNameData.appendChild(firstNameValue);

  const lastNameData = document.createElement("td");
  const lastNameValue = document.createTextNode(record.last_name);
  lastNameData.appendChild(lastNameValue);

  const dnaData = document.createElement("td");
  const dnaValue = document.createTextNode(record.dna);
  dnaData.appendChild(dnaValue);

  const matchData = document.createElement("td");
  const matchValue = document.createTextNode(record.match + "%");
  matchData.appendChild(matchValue);

  newRow.appendChild(firstNameData);
  newRow.appendChild(lastNameData);
  newRow.appendChild(dnaData);
  newRow.appendChild(matchData);

  return newRow;
}
