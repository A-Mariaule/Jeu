//variables
var translate_barre=0;
var translate_balleY=0
var translate_balleX=getRandom(-2400,2500)
var direction="gauche"


//deplacement barre
window.addEventListener("keydown",deplacement)
function deplacement(e){
    let barre=document.getElementsByClassName("main__barre")[0]
    if(e.key=="ArrowRight"){
        if(translate_barre!=450){
            translate_barre=translate_barre+10
            barre.style.transform="translate(" +translate_barre+ "%)"
        }
        
    }
    else if (e.key=="ArrowLeft"){
        if(translate_barre!=-450){           
            translate_barre=translate_barre-10
            barre.style.transform="translate(" +translate_barre+ "%)"
        }
    }
}


//deplacement balle 
function balle_deplacement_bas(){
    let balle=document.getElementsByClassName("main__balle")[0]
    translate_balleY=translate_balleY+10
    balle_deplacement(direction)
    balle.style.transform="translate("+translate_balleX+"%,"+translate_balleY+"%)"
    //gestion bord gauche droite
    if(translate_balleX<=-2400){
        direction="droite"
    }
    else if (translate_balleX>=2500){
        direction="gauche"
    }
    //gestion game over
    if(translate_balleY==1400){
        clearInterval(balle_bas)
        let gameover=document.getElementsByClassName("main__gameover")[0]
        gameover.style.display="block"
        let barre=document.getElementsByClassName("main__barre")[0]
        barre.style.display="none"
        setTimeout(() => {
            let menu_start=document.getElementsByClassName("main__start")[0]
            gameover.style.display="none"
            barre.style.display="block"
            menu_start.style.display="block"
            window.addEventListener("keydown",start)
        }, 3000);
    }
    //gestion rebond barre
    else if(translate_balleY==1050 && translate_barre<=((translate_balleX/5)+40) &&(translate_barre>=((translate_balleX/5)-60))){
        clearInterval(balle_bas)
        balle_haut=setInterval(balle_deplacement_haut,10)
    }
       
}

function balle_deplacement_haut(){
    window.removeEventListener("keydown", start);
    let balle=document.getElementsByClassName("main__balle")[0]
    translate_balleY=translate_balleY-10
    balle_deplacement(direction)
    balle.style.transform="translate("+translate_balleX+"%,"+translate_balleY+"%)"
    //gestion bord gauche droite
    if(translate_balleX<=-2400){
        direction="droite"
    }
    else if (translate_balleX>=2500){
        direction="gauche"
    }
    //gestion rebond haut
    if(translate_balleY==-1150){
        clearInterval(balle_haut)
        balle_bas=setInterval(balle_deplacement_bas,10)
    }
}

//deplacement gauche droite
function balle_deplacement_gauche(){
    translate_balleX=translate_balleX-10
}

function balle_deplacement_droite(){
    translate_balleX=translate_balleX+10
}

function balle_deplacement(direction){
    if(direction=="droite"){
        balle_deplacement_droite()
    }
    else{
        balle_deplacement_gauche()
    }
}

//départ balle

//random point de départ
function getRandom(min, max) {
    return Math.random() * (max - min + 1)  + min;
  }
window.addEventListener("keydown",start)
function start(e){
    let balle=document.getElementsByClassName("main__balle")[0]
    let start=document.getElementsByClassName("main__start")[0]
    if(e.key==" "){
        balle.style.display="block"
        start.style.display="none"
        balle_haut=setInterval(balle_deplacement_haut,10)
    } 
}

