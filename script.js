// variables
let ayahValue;
let temp = "";
let titleTemp = "";

//DOM ELEMENTS
const quran = document.querySelector('.quran');
let surahTitle = document.createElement('h1');
let opening = document.createElement('h2');
const help = document.querySelector('.help');
// const api = axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani')
// .then(r => getSurahNames(r))
// .catch(err => console.log(err));

function getSurahNames(surahs) {
    surahs.data.data.surahs.forEach(surah => {
        let button = document.createElement('button');
        button.textContent += surah.number + ". " + surah.englishName;
        button.classList.add("surah");
        quran.appendChild(button);
    })
}
// displays highlighted phrase that the user hovers over
function highlightPhrase() {
    var selection = window.getSelection();
    var div = document.activeElement;
    if (selection.toString().length > 0) {
      console.log('Highlighted text:', selection.toString());
      console.log(selection);
      console.log(div);
      const selRange = selection.getRangeAt(0);
      
      // Perform further actions with the highlighted text
    }
}
function extractNumbersFromString(str) {
    const regex = /\d+/g; // Matches one or more digits
    return str.match(regex);
  }

//displays the set of verses the user selects
function display(button) {
    help.classList.add('hidden');
    let apiString = "http://api.alquran.cloud/v1/"
    //split button text and assign to API link
    console.log("Button clicked: " + button.target.innerHTML);
    let value = button.target.innerHTML.split(" ");
    if (value[0] == "Juz") {
        apiString += "juz/" + value[1] + "/quran-uthmani";
    }
    else {
        apiString += "surah/" + extractNumbersFromString(value[0]);
    }
    //clear quran
    clearVerses();
    
    // call api and display verses
    const api = axios.get(apiString)
    .then(r => displayVerses(r))
    .catch(err => console.log(err));
}

//Displays the verses based on the api link given
function displayVerses(verses) {

    //make the quran background visible
    quran.classList.remove('hidden');
    console.log("Displaying verses...");

    //first grab the surah title depending on the Juz or Surah called
    console.log(verses);
    try {
        surahTitle.textContent = verses.data.data.ayahs[0].surah.englishName;
    } catch (error) {
        surahTitle.textContent = verses.data.data.englishName;
    }

    opening.textContent = (verses.data.data.ayahs[0].text).slice(0, 38);
    ayahValue = document.createElement('p');
    ayahValue.classList.add("right");
    ayahValue.textContent = (verses.data.data.ayahs[0].text).substr(39) + " " + "۝۱";

    console.log("Original Surah Title: " + surahTitle.textContent);
    quran.appendChild(surahTitle);
    if (surahTitle.textContent == "Al-Faatiha") {
        ayahValue.textContent = opening.textContent + " " + "۝۱";
    }
    else {
        quran.appendChild(opening);
    }
    quran.appendChild(ayahValue);

    //loop through every ayah
    verses.data.data.ayahs.forEach((ayah,index) => {
        if (index === 0) return;
        //check if the surah title matches the surah title of the new ayat
        //if it doesn't...
        try {
            titleTemp = ayah.surah.englishName;
        } catch (error) {
            titleTemp = verses.data.data.englishName;
        }
        if (surahTitle.textContent != titleTemp) {
            //reassign surah title
            console.log("Surah Title doesn't match, printing new surah title...");
            surahTitle = document.createElement('h1');
            surahTitle.textContent = titleTemp;
            console.log("New Surah Title: " + surahTitle.textContent);

            //add bismillah opening by splitting it from the first ayah
            opening = document.createElement('h2');
            opening.classList.add("right");
            opening.textContent = (ayah.text).slice(0, 38);

            //add the first ayah
            ayahValue = document.createElement('p');
            ayahValue.classList.add("right");
            ayahValue.textContent = (ayah.text).substr(39) + " " + "۝۱";

            //push it to the screen
            quran.appendChild(surahTitle);
            quran.appendChild(opening);
            quran.appendChild(ayahValue);
            
        }
        //if the surah matches
        else {
            //add and convert the ayah number
            temp = ""+ayah.numberInSurah;
            ayahNumber = temp.replace(/0/g, '۰').replace(/1/g, '۱').replace(/2/g, '۲').replace(/3/g, '۳').replace(/4/g, '٤').replace(/5/g, '٥').replace(/6/g, '٦').replace(/7/g, '۷').replace(/8/g, '۸').replace(/9/g, '۹').replace(/۴/g, '٤').replace(/۵/g, '٥').replace(/۶/g, '٦');
            
            //add the verse and push it to the right
            ayahValue = document.createElement('p');
            ayahValue.classList.add("right");
            ayahValue.textContent += ayah.text + " " + "۝" + ayahNumber;

            //push it to the screen
            quran.appendChild(ayahValue);
        }
            
        


    })
    console.log("All verses displayed!");
}

// clears Quran contents if they exist
function clearVerses() {
    const quran = document.querySelector('.quran');
    console.log("Clearing verses...");
    while (quran.firstChild) {
        quran.removeChild(quran.lastChild);
      }
}