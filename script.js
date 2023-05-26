const quran = document.querySelector('.quran');
let surahTitle = document.createElement('h1');
let ayahValue;
const api = axios.get('http://api.alquran.cloud/v1/ruku/7/quran-uthmani')
.then(r => displayVerses(r))
.catch(err => console.log(err));


function displayVerses(value) {
    // console.log(value);
    // surahTitle.textContent = value.data.data.ayahs[0].surah.englishName;
    // console.log(value.data.data.ayahs[0].surah.englishName);
    // quran.appendChild(surahTitle);
    value.data.data.ayahs.forEach(ayah => {
        if (surahTitle.textContent != ayah.surah.englishName) {
            console.log("executed");
            surahTitle = document.createElement('h1');
            surahTitle.textContent = ayah.surah.englishName;
            quran.appendChild(surahTitle);
        }
        ayahValue = document.createElement('p');
        ayahValue.textContent = ayah.text + ayah.number;
        quran.appendChild(ayahValue);

    })
}