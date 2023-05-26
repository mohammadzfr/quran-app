// GET
// const surahs = axios.get('https://api.quranapi.org/surahs?lang={code}').then(r => console.log(r.data));

// const display = document.querySelector('.quran');
// const words = document.createElement('p');
// const page = axios.get('http://api.alquran.cloud/v1/page/1/quran-uthmani')
// .then(result => {
//     console.log(result.data.data.ayahs);
//     result.data.data.ayahs.forEach(element =>
//     words.textContent += element.text)
// })
// .catch((err) => console.log(err));



// display.appendChild(words);

const display = document.querySelector('.quran');
let words
const page = axios.get('http://api.alquran.cloud/v1/juz/30/quran-uthmani')
.then(result => {
    
    result.data.data.ayahs.forEach(element => {
        words = document.createElement('p');
        words.classList.add('ayah');
        words.textContent = element.text;
        display.appendChild(words);
    })
    
    
})
.catch((err) => console.log(err));



display.appendChild(words);