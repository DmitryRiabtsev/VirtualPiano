const SOUNDS = ["assets/audio/c.mp3",
                "assets/audio/d.mp3",
                "assets/audio/e.mp3",
                "assets/audio/f.mp3",
                "assets/audio/g.mp3",
                "assets/audio/a.mp3",
                "assets/audio/b.mp3",
                "assets/audio/c♯.mp3",
                "assets/audio/d♯.mp3",
                "assets/audio/f♯.mp3",
                "assets/audio/g♯.mp3",
 				"assets/audio/a♯.mp3",
 				];
const PIANO = document.querySelector('.piano');
const PIANO_KEYS = document.querySelectorAll(".piano-key");
const LETTERS = document.querySelector('#btn-letters');
const NOTES = document.querySelector('#btn-notes');
const BUTTONS = document.querySelector(".btn-container");
const FULL_SCREEN = document.querySelector('#full-screen');


const fullScreen = function(){
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}

FULL_SCREEN.addEventListener('click', fullScreen );

const buttonEvent = function(elem){
    if(elem.target.id == 'btn-letters'){
        elem.target.classList.add('btn-active');
        NOTES.classList.remove('btn-active');
        PIANO_KEYS.forEach((item)=>{
            item.classList.add('piano-key-letter');
        })
    }else{
        elem.target.classList.add('btn-active');
        LETTERS.classList.remove('btn-active');
        PIANO_KEYS.forEach((item)=>{
            item.classList.remove('piano-key-letter');
        })
    }
}

BUTTONS.addEventListener('click', buttonEvent);

document.addEventListener("DOMContentLoaded", ()=>{
    idAdd();
});

const idAdd = function(){
    PIANO_KEYS.forEach((item, index) => {
        item.id = index; 
    });
}

const startSound = (elem) =>{
    elem.target.style = 'background-color: aqua';
    let idNum = elem.target.id;
        SOUNDS.map((item,index)=>{
        if(idNum == index){  
          let audio = new Audio(item);
          audio.play();  
        }   
    }) 
}

const stopSound = (elem) =>{
    elem.target.style = 'background-color: none';
    let idNum = elem.target.id;
        SOUNDS.map((item,index)=>{
        if(idNum == index){     
          let audio = new Audio(item);
          audio.pause();  
        }   
    }) 
}
const start = (event) =>{
    event.target.style = 'background-color: aqua';
    let audio = new Audio(SOUNDS[event.target.id]);
    audio.play();
    PIANO_KEYS.forEach((elem)=>{
        elem.addEventListener('mouseover', startSound);
        elem.addEventListener('mouseout', stopSound)
    })
}
const stop = ()=>{
    PIANO_KEYS.forEach((elem)=>{
        elem.style = 'background-color: none';
        elem.removeEventListener('mouseover', startSound);
        elem.removeEventListener('mouseout', stopSound);
    })
}


document.addEventListener('keydown', (event)=>{
    if(event.repeat == false){
        PIANO_KEYS.forEach((item)=>{ 
        if(item.dataset.letter == event.key.toUpperCase()){
            item.style = 'background-color: aqua';
            let audio = new Audio(SOUNDS[item.id]);
            audio.play();
        } 
     })
    } 
})

document.addEventListener('keyup',(event)=>{
    PIANO_KEYS.forEach((item)=>{
        if(item.dataset.letter == event.key.toUpperCase()){
            item.style = 'background-color: none';
        } 
     })
})

PIANO.addEventListener('mousedown', start);
PIANO.addEventListener('mouseup', stop);





