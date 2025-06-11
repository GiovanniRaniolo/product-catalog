// script.js
const btn = document.getElementById("run");
const out = document.getElementById("output");

// Utility per mostrare il risultato di ogni esempio
function log(title, content) {
  out.textContent += `-- ${title} --\n`;
  out.textContent += (typeof content === "string" ? content : JSON.stringify(content, null, 2)) + "\n\n";
}

btn.addEventListener("click", () => {
  out.textContent = "";
  // Qui inizieremo a incastrare gli esempi
  // 1. Ternario
  const numero = Math.floor(Math.random() * 100);
  const esito = numero % 2 === 0 ? "pari" : "dispari";
  log("Operatore ternario", `Il numero ${numero} è ${esito}`);

  // 2. Rest operator (i tre puntini ...)
  log("REST OPERATOR SPIEGAZIONE", "I tre puntini (...) raccolgono tutti i parametri in un array");

  // === ECCO COME FUNZIONA STEP BY STEP ===

  // Quando scrivi una funzione normale:
  function somma(a, b, c) {
    return a + b + c;
  }
  // Puoi chiamarla solo con esattamente 3 numeri: somma(1, 2, 3)

  // Ma con il REST OPERATOR:
  function sommaRest(...numeri) {
    log("MAGIA DEL REST OPERATOR", "I numeri che hai passato sono diventati un array!");
    log("Cosa ricevo", `Array di numeri: [${numeri}]`);
    log("Da dove vengono?", "Dalla chiamata della funzione!");

    let totale = 0;
    for (let num of numeri) {
      totale += num;
    }
    return totale;
  }

  // === ECCO DOVE "NASCONO" I NUMERI ===
  log("CHIAMATA 1", "sommaRest(10, 20) - passo 2 numeri");
  const risultato1 = sommaRest(10, 20); // QUI passi 10, 20
  log("Risultato", risultato1);

  log("CHIAMATA 2", "sommaRest(1, 2, 3, 4, 5) - passo 5 numeri");
  const risultato2 = sommaRest(1, 2, 3, 4, 5); // QUI passi 1, 2, 3, 4, 5
  log("Risultato", risultato2);

  log("CHIAMATA 3", "sommaRest(100) - passo 1 numero solo");
  const risultato3 = sommaRest(100); // QUI passi solo 100
  log("Risultato", risultato3);

  // Esempio con stringhe
  function creaFrase(...parole) {
    log("Parole ricevute", `Array: ${parole}`);

    let frase = "";
    for (let i = 0; i < parole.length; i++) {
      frase += parole[i];
      if (i < parole.length - 1) {
        frase += " ";
      }
    }
    return frase;
  }

  const frase = creaFrase("Ciao", "mondo", "JavaScript");
  log("Frase creata", frase);
  // === SPREAD OPERATOR - IL CONTRARIO DEL REST ===
  log("SPREAD OPERATOR", "I tre puntini (...) ESPANDONO un array in argomenti separati");

  // Abbiamo un array di numeri
  const arrayNumeri = [10, 20, 30, 40];
  log("Array originale", arrayNumeri);

  // SENZA spread: passiamo tutto l'array come UN singolo parametro
  log("SENZA SPREAD", "Se passo l'array direttamente:");
  const risultatoSbagliato = sommaRest(arrayNumeri);
  log("Risultato sbagliato", risultatoSbagliato); // NaN perché cerca di sommare un array

  // CON spread: l'array viene ESPANSO in argomenti separati
  log("CON SPREAD", "Se uso ...array, viene espanso:");
  const risultatoCorretto = sommaRest(...arrayNumeri); // ...arrayNumeri diventa 10, 20, 30, 40
  log("Risultato corretto", risultatoCorretto);

  // Altro esempio con array di stringhe
  const paroleArray = ["JavaScript", "è", "fantastico"];
  log("Array di parole", paroleArray);

  const fraseSpread = creaFrase(...paroleArray); // SPREAD - espande l'array
  log("Frase con spread", fraseSpread);

  // === DESTRUCTURING - ESTRARRE VALORI DA ARRAY E OGGETTI ===
  log("DESTRUCTURING", "Estrarre valori da array e oggetti in modo semplice");

  // DESTRUCTURING DI ARRAY
  const colori = ["rosso", "verde", "blu", "giallo", "viola"];
  log("Array originale", colori);

  // Metodo tradizionale (NOIOSO!)
  const primo = colori[0];
  const secondo = colori[1];
  const terzo = colori[2];
  log("Metodo tradizionale", `primo: ${primo}, secondo: ${secondo}, terzo: ${terzo}`);

  // DESTRUCTURING (FIGATA!)
  const [primoColore, secondoColore, terzoColore] = colori;
  log("Con destructuring", `primo: ${primoColore}, secondo: ${secondoColore}, terzo: ${terzoColore}`);

  // DESTRUCTURING con REST
  const [principale, secondario, ...altriColori] = colori;
  log("Destructuring + REST", {
    "Colore principale": principale,
    "Colore secondario": secondario,
    "Altri colori": altriColori,
  });

  // DESTRUCTURING DI OGGETTI
  const persona = {
    nome: "Mario",
    cognome: "Rossi",
    età: 30,
    città: "Roma",
    lavoro: "Programmatore",
  };
  log("Oggetto originale", persona);

  // Metodo tradizionale (NOIOSO!)
  const nomePersona = persona.nome;
  const etàPersona = persona.età;
  const cittàPersona = persona.città;
  log("Metodo tradizionale", `${nomePersona}, ${etàPersona} anni, vive a ${cittàPersona}`);

  // DESTRUCTURING (MODERNO!)
  const { nome, età, città } = persona;
  log("Con destructuring", `${nome}, ${età} anni, vive a ${città}`);

  // DESTRUCTURING con nomi diversi
  const { nome: nomeCompleto, lavoro: professione } = persona;
  log("Destructuring con rinomina", `${nomeCompleto} fa il ${professione}`);

  // DESTRUCTURING con REST per oggetti
  const { cognome, ...infoPersonali } = persona;
  log("Destructuring oggetti + REST", {
    "Cognome estratto": cognome,
    "Resto delle info": infoPersonali,
  });

  // ESEMPIO PRATICO: Funzione che riceve oggetto e usa destructuring
  function presentaPersona({ nome, età, città }) {
    return `Ciao, sono ${nome}, ho ${età} anni e vivo a ${città}!`;
  }
  const presentazione = presentaPersona(persona);
  log("Funzione con destructuring", presentazione);

  // === METODO MAP() - TRASFORMARE ARRAY ===
  log("METODO MAP()", "Trasforma ogni elemento di un array e crea un nuovo array");

  // ESEMPIO 1: Numeri - Raddoppiare ogni numero
  const numeri = [1, 2, 3, 4, 5];
  log("Array originale numeri", numeri);

  // Metodo tradizionale (LUNGO!)
  const raddoppiatiTradizionale = [];
  for (let i = 0; i < numeri.length; i++) {
    raddoppiatiTradizionale.push(numeri[i] * 2);
  }
  log("Metodo tradizionale", raddoppiatiTradizionale);

  // CON MAP (MODERNO!)
  const raddoppiati = numeri.map((numero) => numero * 2);
  log("Con map()", raddoppiati);

  // ESEMPIO 2: Stringhe - Trasformare nomi in maiuscolo
  const nomi = ["mario", "luigi", "peach", "bowser"];
  log("Nomi originali", nomi);

  const nomiMaiuscoli = nomi.map((nome) => nome.toUpperCase());
  log("Nomi in maiuscolo", nomiMaiuscoli);

  // ESEMPIO 3: Oggetti - Trasformare array di oggetti
  const prodotti = [
    { nome: "Laptop", prezzo: 800 },
    { nome: "Mouse", prezzo: 25 },
    { nome: "Tastiera", prezzo: 60 },
  ];
  log("Prodotti originali", prodotti);

  // Aggiungere IVA del 22%
  const prodottiConIva = prodotti.map((prodotto) => ({
    nome: prodotto.nome,
    prezzoBase: prodotto.prezzo,
    prezzoConIva: prodotto.prezzo * 1.22,
  }));
  log("Prodotti con IVA", prodottiConIva);

  // ESEMPIO 4: Map con indice
  const lettere = ["a", "b", "c"];
  const lettereConIndice = lettere.map((lettera, indice) => `${indice}: ${lettera}`);
  log("Lettere con indice", lettereConIndice);

  // ESEMPIO 5: Map + Destructuring
  const persone = [
    { nome: "Anna", età: 25 },
    { nome: "Marco", età: 30 },
    { nome: "Sofia", età: 22 },
  ];

  const saluti = persone.map(({ nome, età }) => `Ciao ${nome}, hai ${età} anni!`);
  log("Saluti personalizzati", saluti);
  // ESEMPIO PRATICO: Creare lista HTML
  const frutta = ["mela", "banana", "arancia"];
  const listaHTML = frutta.map((frutto) => `<li>${frutto}</li>`);
  log("Lista HTML", listaHTML);

  // === METODO FILTER() - FILTRARE ARRAY ===
  log("METODO FILTER()", "Filtra elementi di un array basandosi su una condizione");

  // ESEMPIO 1: Numeri - Filtrare numeri pari
  const numeriMisti = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  log("Array originale", numeriMisti);

  // Metodo tradizionale (LUNGO!)
  const pariTradizionale = [];
  for (let i = 0; i < numeriMisti.length; i++) {
    if (numeriMisti[i] % 2 === 0) {
      pariTradizionale.push(numeriMisti[i]);
    }
  }
  log("Metodo tradizionale", pariTradizionale);

  // CON FILTER (MODERNO!)
  const pari = numeriMisti.filter((numero) => numero % 2 === 0);
  log("Con filter()", pari);

  // ESEMPIO 2: Stringhe - Filtrare nomi lunghi
  const nomiVarii = ["Ana", "Alessandro", "Bo", "Francesca", "Giuseppe"];
  log("Nomi originali", nomiVarii);

  const nomiLunghi = nomiVarii.filter((nome) => nome.length > 4);
  log("Nomi con più di 4 lettere", nomiLunghi);

  // ESEMPIO 3: Oggetti - Filtrare prodotti per prezzo
  const tuttiProdotti = [
    { nome: "Laptop", prezzo: 800, categoria: "tech" },
    { nome: "Mouse", prezzo: 25, categoria: "tech" },
    { nome: "Libro", prezzo: 15, categoria: "cultura" },
    { nome: "Tastiera", prezzo: 60, categoria: "tech" },
    { nome: "Penna", prezzo: 3, categoria: "ufficio" },
  ];
  log("Tutti i prodotti", tuttiProdotti);

  // Prodotti sotto i 50 euro
  const prodottiEconomici = tuttiProdotti.filter((prodotto) => prodotto.prezzo < 50);
  log("Prodotti sotto 50€", prodottiEconomici);

  // Prodotti tech
  const prodottiTech = tuttiProdotti.filter((prodotto) => prodotto.categoria === "tech");
  log("Prodotti tech", prodottiTech);

  // ESEMPIO 4: Filter con condizioni multiple
  const studenti = [
    { nome: "Mario", voto: 8, presente: true },
    { nome: "Luigi", voto: 6, presente: false },
    { nome: "Peach", voto: 9, presente: true },
    { nome: "Bowser", voto: 4, presente: true },
  ];

  const studentiPromossi = studenti.filter((studente) => studente.voto >= 6 && studente.presente === true);
  log("Studenti promossi (voto≥6 E presenti)", studentiPromossi);

  // ESEMPIO 5: Filter + Map combinati
  const prezziScontati = tuttiProdotti
    .filter((prodotto) => prodotto.prezzo > 20) // Solo prodotti sopra 20€
    .map((prodotto) => ({
      ...prodotto,
      prezzoScontato: prodotto.prezzo * 0.8, // Sconto del 20%
    }));
  log("Prodotti sopra 20€ con sconto", prezziScontati);

  // ESEMPIO PRATICO: Ricerca/Search
  const ricerca = "a";
  const fruttiTrovati = ["mela", "banana", "arancia", "pera", "uva"].filter((frutto) => frutto.toLowerCase().includes(ricerca.toLowerCase()));
  log(`Frutti che contengono "${ricerca}"`, fruttiTrovati);
});
