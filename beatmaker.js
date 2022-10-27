class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.divs')
        this.kickAudio = document.querySelector('.kickIt')
        this.hihatAudio = document.querySelector('.hihatAudio')
        this.snareSound = document.querySelector('.snareAudio')
        this.currentKick = './sounds/kick-classic.wav'
        this.currentHihat = './sounds/hihat-acoustic01.wav'
        this.currentSnare = './sounds/snare-acoustic01.wav'
        this.index = 0
        this.bpm = 160
        this.isPlaying = null;
        this.playBtn = document.querySelector('.playBtn')
        this.selects = document.querySelectorAll('select')
        this.muteBtn = document.querySelectorAll('.muteBtn')
        this.tempoIndicator = document.querySelector('.tempoIndicator')
        this.tempo = document.querySelector('.tempo')
        this.tempoIndicator.innerText = 160
    }
    activePads(){
        if(this.parentElement.classList.contains('kick-boxes')){
            this.classList.toggle('clicked-kicks')
        }else if(this.parentElement.classList.contains('snare-boxes')){
            this.classList.toggle('clicked-snares')
        }else{
            this.classList.toggle('clicked-hihats')
        }
            
        
    }
    repeat(){
        let step = this.index%8
        const activeBars = document.querySelectorAll(`.btn${step}`)
        activeBars.forEach((bar)=>{
            bar.style.animation = `playAudio 0.3s alternate ease-in-out 2`
            if(bar.classList.contains('kicks')){
                if(bar.classList.contains('clicked-kicks')){
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play()
                }
            }
            if(bar.classList.contains('snares')){
                if(bar.classList.contains('clicked-snares')){
                    this.snareSound.currentTime = 0
                    this.snareSound.play()
                }
            }
            if(bar.classList.contains('hihats')){
                if(bar.classList.contains('clicked-hihats')){
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play()
                }
            }
        })
        this.index++;
    }
    start(){
        let interval = (60/this.bpm) *1000

        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat()
            this.playBtn.innerText = 'Pause'
        }, interval)
        }else{
            clearInterval(this.isPlaying);
            this.playBtn.innerText = 'Play'
            this.isPlaying = null;
        }
    }
    changeSound(e){
        let audioSrc = e.target.value
        let selectname = e.target.name
        if(selectname === 'selectKick'){
            this.kickAudio.src = audioSrc
        }else if(selectname === 'selectSnare'){
            this.snareSound.src = audioSrc;
        }else{
            this.hihatAudio.src = audioSrc;
        }
        
    }
    mute(e){
        console.log(e.target)
        if(e.target.classList.contains('active')){
            e.target.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
            switch(e.target.classList[1]){
                case 'muteSnare':
                    this.snareSound.volume = 0;
                    break;
                case 'muteKick':
                    this.kickAudio.volume = 0;
                    break;
                case 'muteHihat':
                    this.hihatAudio.volume = 0;
            }
        }else{
            e.target.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
            switch(e.target.classList[1]){
                case 'muteSnare':
                    this.snareSound.volume = 1;
                    break;
                case 'muteKick':
                    this.kickAudio.volume = 1;
                    break;
                case 'muteHihat':
                    this.hihatAudio.volume = 1;
            }
        }
    }
    tempor(){
        let tempoInfo = this.tempo.value
        this.tempoIndicator.innerText = tempoInfo
    }
    updateTempo(){
        this.bpm = this.tempo.value
        clearInterval(this.isPlaying)
        this.isPlaying = null
        if(this.playBtn.innerText === 'Pause'){
            this.start()
        }
        
    }
}

const newK = new DrumKit()

newK.pads.forEach((pad)=>{
    pad.addEventListener('click', newK.activePads)
    pad.addEventListener('animationend', function(){
        this.style.animation = ''
    })
})

newK.playBtn.addEventListener('click', ()=>{
    newK.start()
})

newK.selects.forEach((select)=>{
    select.addEventListener('change', function(e){
        newK.changeSound(e)
    })
})

newK.muteBtn.forEach((btn)=>{
    btn.addEventListener('click', function(e){
        btn.classList.toggle('active')
        newK.mute(e)
    })
})

newK.tempo.addEventListener('change', function(){
    newK.updateTempo()
})

newK.tempo.addEventListener('input', ()=>{
    newK.tempor()
})