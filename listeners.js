const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const sidebar = document.querySelector('.sidebar');
const Quran = document.querySelector('.quran');

const juz = document.querySelectorAll(".juz");
const surah = document.querySelectorAll(".surah");
const juzGroup = document.querySelector(".juzs");
const surahGroup = document.querySelector(".surahs");
const juzSelect = document.querySelectorAll(".juz-select");
const surahSelect = document.querySelectorAll(".surah-select");
//listener for juz selection
juz.forEach(btn => btn.addEventListener("click", display));
surah.forEach(btn => btn.addEventListener("click", display));

//listener for highligting
document.addEventListener('mouseup', highlightPhrase);

const tabs = document.querySelectorAll('.tab');
const buttons = document.querySelectorAll('.buttons');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');

        var line = document.querySelector(".line");
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        juzGroup.classList.add('hidden');
        surahGroup.classList.add('hidden');
        console.log(index);
        if (index == 0) {
            juzGroup.classList.remove('hidden');
        }
        else {
            surahGroup.classList.remove('hidden');
        }
    })


})




toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '1s';
        tabs.forEach(t => t.style.color = 'black');
        quran.style.background = '#fffcc9';
        sidebar.style.background = '#fffcc9';
        quran.style.transition = '1s';
        sidebar.style.transition = '1s';

    }else{


        body.style.background = '#1F2125';
        body.style.color = 'white';
        body.style.transition = '1s';
        tabs.forEach(t => t.style.color = 'white');
        quran.style.background = '#131518';
        sidebar.style.background = '#131518';
        quran.style.transition = '1s';
        sidebar.style.transition = '1s';
    }
});