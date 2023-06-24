const quran = document.querySelector('.quran');
let surahTitle = document.createElement('h1');
let ayahValue;
let temp = "";
let opening;
const api = axios.get('http://api.alquran.cloud/v1/juz/30/quran-uthmani')
.then(r => displayVerses(r))
.catch(err => console.log(err));


function displayVerses(value) {
    console.log(value);
    // surahTitle.textContent = value.data.data.ayahs[0].surah.englishName;
    // console.log(value.data.data.ayahs[0].surah.englishName);
    // quran.appendChild(surahTitle);
    value.data.data.ayahs.forEach(ayah => {
        if (surahTitle.textContent != ayah.surah.englishName) {
            console.log("executed");
            surahTitle = document.createElement('h1');
            surahTitle.textContent = ayah.surah.englishName;
            quran.appendChild(surahTitle);
            opening = document.createElement('h2');
            opening.classList.add("right");
            opening.textContent = (ayah.text).slice(0, 38)
            ayahValue = document.createElement('p');
            ayahValue.classList.add("right");
            ayahValue.textContent = (ayah.text).substr(39) + " " + "۝۱";
            quran.appendChild(opening);
            quran.appendChild(ayahValue);
            
        }
        else {
            temp = ""+ayah.numberInSurah;
            ayahNumber = temp.replace(/0/g, '۰').replace(/1/g, '۱').replace(/2/g, '۲').replace(/3/g, '۳').replace(/4/g, '٤').replace(/5/g, '٥').replace(/6/g, '٦').replace(/7/g, '۷').replace(/8/g, '۸').replace(/9/g, '۹').replace(/۴/g, '٤').replace(/۵/g, '٥').replace(/۶/g, '٦');
            ayahValue = document.createElement('p');
            ayahValue.classList.add("right");
            ayahValue.textContent = ayah.text + " " + "۝" + ayahNumber;
            quran.appendChild(ayahValue);
        }


    })
}

document.addEventListener('mouseup', function() {
    var selection = window.getSelection();
    if (selection.toString().length > 0) {
      console.log('Highlighted text:', selection.toString());
      console.log(selection);
      // Perform further actions with the highlighted text
    }
  });
  