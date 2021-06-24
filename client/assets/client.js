// Defining the query
const get_all_messages_query = `
query Query {
  getAllUsers {
    id_benutzer
    benutzername
    recht_admin
    email
    passwort_hash
  }
}`;



const fetchQuery = async () => {
  // Hier wird eine POST Request an den Endpunkt gesendet.
  // Der Body ist ein JSON String, welcher die Query enthällt
  let res = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: get_all_messages_query })
  });
  // Die Response wird in ein JSON Objekt umgewandelt.
  let json = await res.json();

  // Das JSON Objekt wird in der console ausgegeben
  console.log(json);

  // Hier holen wir uns die Variable getAllUsers aus dem JSON Objekt.
  let { data: { getAllUsers } } = json; // Das gleiche, wie "let getAllUsers = json.data.getAllUsers"

  for (user of getAllUsers) { // Für jeden User, der zurückgegeben 

    // Wir erstellen ein tr Element
    const tr = document.createElement("tr");

    for (key in user) { // Für jeden key in unserem User. z.B. "id_benutzer"

      // Wenn der TableHead noch nicht gefüllt worden ist
      if (document.getElementById("tableHead").children.length < Object.keys(user).length) {

        // Wir erstellen ein th Element
        const th = document.createElement("th");
        // Wir erstellen den Text, der in das th Element eingefügt werden soll
        const content = document.createTextNode(key);

        // Die beiden erstellten Elemente werden dem tableHead untergeordnet
        th.appendChild(content);
        document.getElementById("tableHead").appendChild(th);
      }

      // Wir erstellen ein td Element
      const td = document.createElement("td");
      // Wir erstellen den Text, der in das td Element eingefügt werden soll
      const content = document.createTextNode(user[key]);

      // Die beiden erstellen Elemente werden dem tr Element untergeordnet
      td.appendChild(content);
      tr.appendChild(td);
    }
    // Das tr Element wird in den TableBody eingefügt
    document.getElementById("tableBody").appendChild(tr);
  }
}

fetchQuery();