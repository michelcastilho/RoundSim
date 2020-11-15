var sfxHit = new Audio('hit.wav');

stats = function() {

    str = document.getElementById('player1').value,
    player1 = str,

    str = document.getElementById('life1').value,
    initlife1 = Number(str),

    str = document.getElementById('def1').value,
    def1 = 10 + Number(str),

    str = document.getElementById('initbonus1').value,
    initBonus1 = Number(str),

    str = document.getElementById('bonus1').value,
    bonus1 = Number(str),

    str = document.getElementById('dmg1').value,
    dmgDice1 = Number(str),

    str = document.getElementById('dmgbonus1').value,
    dmgBonus1 = Number(str),

    /////

    str = document.getElementById('player2').value,
    player2 = str,

    str = document.getElementById('life2').value,
    initlife2 = Number(str),

    str = document.getElementById('def2').value,
    def2 = 10 + Number(str),

    str = document.getElementById('initbonus2').value,
    initBonus2 = Number(str),

    str = document.getElementById('bonus2').value,
    bonus2 = Number(str),

    str = document.getElementById('dmg2').value,
    dmgDice2 = Number(str),

    str = document.getElementById('dmgbonus2').value,
    dmgBonus2 = Number(str)

}



rollInit1 = function () {
    randomNumber = (Math.floor(Math.random() * 20) + 1) + initBonus1;
    return randomNumber;
}

rollAtk1 = function () {
    randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomNumber;
}

rollDmg1 = function () {
    randomNumber = Math.floor(Math.random() * this.dmgDice1) + 1;
    return randomNumber;
}

p1atk = function () {
    rollatk1 = rollAtk1();
    atk1 = rollatk1 + bonus1;
    addlog += '<p>'+player1+' attacks '+atk1+' ('+rollatk1+' + '+bonus1+')<br>'+player2+' Defense: '+def2+'</p>';
    if (atk1 > def2) {
        rolldmg1 = rollDmg1();
        dmg1 = rolldmg1 + dmgBonus1;
        life2 -= dmg1;
        addlog += '<p id="hit">'+player1+' hits '+player2+' dealing '+dmg1+' ('+rolldmg1+' + '+dmgBonus1+') damage</p>';
        sfxHit.play();
    } else {
        addlog += '<p id="miss">'+player1+' misses '+player2+'</p>';
    }
}

///////////////////

rollInit2 = function () {
    randomNumber = (Math.floor(Math.random() * 20) + 1) + initBonus2;
    return randomNumber;
}

rollAtk2 = function () {
    randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomNumber;
}

rollDmg2 = function () {
    randomNumber = Math.floor(Math.random() * this.dmgDice2) + 1;
    return randomNumber;
}

p2atk = function () {
    rollatk2 = rollAtk2();
    atk2 = rollatk2 + bonus2;
    addlog += '<p>'+player2+' attacks '+atk2+' ('+rollatk2+' + '+bonus2+')<br>'+player1+' Defense: '+def1+'</p>';
    if (atk2 > def1) {
        rolldmg2 = rollDmg2();
        dmg2 = rolldmg2 + dmgBonus2,
        life1 -= dmg2,
        addlog += '<p id="hit">'+player2+' hits '+player1+' dealing '+dmg2+' ('+rolldmg2+' + '+dmgBonus2+') damage</p>';
        sfxHit.play();
    } else {
        addlog += '<p id="miss">'+player2+' misses '+player1+'</p>';
    }
}

rollInit = function () {

    init1 = rollInit1();
    log.innerHTML += '<p>'+player1+' rolls for initiative: '+randomNumber+'</p>';
    init2 = rollInit2();
    log.innerHTML += '<p>'+player2+' rolls for initiative: '+randomNumber+'</p>';

    if (init1 > init2) {
        log.innerHTML += '<p>'+player1+' is first</p>';
        return 1
    }

    if (init1 < init2) {
        log.innerHTML += '<p>'+player2+' is first</p>';
        return 2
    }

    if (init1 == init2) {

        if (initBonus1 > initBonus2) {
            log.innerHTML += '<p>'+player1+' is first</p>';
            return 1
        }
        
        else if (initBonus1 < initBonus2) {
            log.innerHTML += '<p>'+player2+' is first</p>';
            return 2
        }

        else if (initBonus1 == initBonus2) {
            return Math.floor(Math.random() * 2) + 1
        }
    }        
        
}

death = false;

logpv = function() {
    life1perc = Math.floor((life1 / initlife1) * 100);
    life2perc = Math.floor((life2 / initlife2) * 100);
    document.getElementById("sopa1").style.width = life1perc+'%';
    document.getElementById("sopa2").style.width = life2perc+'%';
    document.getElementById("perc1").innerHTML = life1perc+'%';
    document.getElementById("perc2").innerHTML = life2perc+'%';
    addlog += '<p>'+player1+' '+life1+'hp<br>'+player2+' '+life2+'hp</p>';
    if (life1 <= 0) {
        addlog += '<p>'+player1+' has been defeated</p>';
        document.getElementById("sopa1").style.width = '0%';
        document.getElementById("perc1").innerHTML = '0%';
        death = true;
        return true
    }
    if (life2 <= 0) {
        addlog += '<p>'+player2+' has been defeated</p>';
        document.getElementById("sopa2").style.width = '0%';
        document.getElementById("perc2").innerHTML = '0%';
        death = true;
        return true
    }
    return false
}

roundcount = 1;

round = function() {  

    addlog += '<p class="title">Round starts</p>';

    if (init == 1) {

        p1atk();

        if (logpv()) {
            return
        };
        
        p2atk();

        if (logpv()) {
            return
        };

    } else if (init > 1) {
        

        p2atk();   

        if (logpv()) {
            
        };

        p1atk();

        if (logpv()) {
            
        };           

    }

}

button.onclick = function() {

    stats();

    addlog = '<div id="round">';

    if (death == true) {    
        document.getElementById("log").innerHTML = '';
        death = false;
        life1 = initlife1;
        life2 = initlife2;
        var buttonText = "Battle!";      
        document.getElementById("button").innerHTML = buttonText;
        life1perc = 100;
        life2perc = 100;
        document.getElementById("sopa1").style.width = life1perc+'%';
        document.getElementById("sopa2").style.width = life2perc+'%';
        document.getElementById("perc1").innerHTML = life1perc+'%';
        document.getElementById("perc2").innerHTML = life2perc+'%';
        document.getElementById("life1").disabled = false;
        document.getElementById("life2").disabled = false;
        roundcount = 1;
        return
    }

    log = document.getElementById('log');


    if (roundcount == 1) {
        log.innerHTML += '<p class="title">Battle starts</p>';

        init = rollInit();
        life1 = initlife1;
        life2 = initlife2;
        document.getElementById("life1").disabled = true;
        document.getElementById("life2").disabled = true;

        //log.innerHTML += '<p>'+init+'</p>';
    }

    roundcount++; 

    round();

    addlog += '</div>';

    log.innerHTML += addlog;

    if (death == true) {
        var buttonText = "New Battle!";      
        document.getElementById("button").innerHTML = buttonText;
    }

    log.scrollTop = log.scrollHeight;

}

