// variables
let ayahValue;
let temp = "";
let opening;

//DOM ELEMENTS
const quran = document.querySelector('.quran');
let surahTitle = document.createElement('h1');

// const api = axios.get('http://api.alquran.cloud/v1/juz/01/quran-uthmani')
// .then(r => displayVerses(r))
// .catch(err => console.log(err));


// displays highlighted phrase that the user hovers over
function highlightPhrase() {
    var selection = window.getSelection();
    if (selection.toString().length > 0) {
      console.log('Highlighted text:', selection.toString());
      console.log(selection);
      const selRange = selection.getRangeAt(0);
      
      // Perform further actions with the highlighted text
    }
}

//displays the set of verses the user selects
function display(button) {

    //split button text and assign to API link
    console.log("Button clicked: " + button.target.innerHTML);
    let juzValue = button.target.innerHTML.split(" ");
    let juzApi = "http://api.alquran.cloud/v1/juz/" + juzValue[1] + "/quran-uthmani";

    //clear quran
    clearVerses();
    
    //call api and display verses
    const api = axios.get(juzApi)
    .then(r => displayVerses(r))
    .catch(err => console.log(err));
}

//Displays the verses based on the api link given
function displayVerses(verses) {
    console.log("Displaying verses...");
    //first grab the surah title
    console.log(verses);
    surahTitle.textContent = verses.data.data.ayahs[0].surah.englishName;
    console.log("New Surah Title: " + verses.data.data.ayahs[0].surah.englishName);
    quran.appendChild(surahTitle);

    //loop through every ayah
    verses.data.data.ayahs.forEach(ayah => {
        //check if the surah title matches the surah title of the new ayat
        //if it doesn't...
        if (surahTitle.textContent != ayah.surah.englishName) {
            //reassign surah title
            console.log("Surah Title doesn't match, printing new surah title...");
            surahTitle = document.createElement('h1');
            surahTitle.textContent = ayah.surah.englishName;
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
            ayahValue.textContent = ayah.text + " " + "۝" + ayahNumber;

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