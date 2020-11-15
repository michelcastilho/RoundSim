str = document.getElementById('player1').value,
player1 = str,
//document.getElementById("player1").innerHTML = player1;

str = document.getElementById('life1').value,
life1 = Number(str),

str = document.getElementById('def1').value,
def1 = Number(str),

str = document.getElementById('initbonus1').value,
initBonus1 = Number(str),

str = document.getElementById('bonus1').value,
bonus1 = Number(str),

str = document.getElementById('dmg1').value,
dmgDice1 = Number(str),

str = document.getElementById('dmgbonus1').value,
dmgBonus1 = Number(str),

rollInit1 = function () {
    var randomNumber = Math.floor(Math.random() * 20) + 1 + initBonus1;
    log.innerHTML += '<p>'+player1+' rola iniciativa: '+randomNumber+'';
    return randomNumber;
}

rollAtk1 = function () {
    var randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomNumber;
}

rollDmg1 = function () {
    var randomNumber = Math.floor(Math.random() * this.dmgDice1) + 1;
    return randomNumber;
}

p1atk = function () {
    rollAtk1 = rollAtk1();
    atk1 = rollAtk1 + bonus1;
    log.innerHTML += '<p>'+player1+' ataca '+atk1+' ('+rollAtk1+' + '+bonus1+')<br>Defesa '+player2+': '+def2+'</p>';
    if (atk1 > def2) {
        rollDmg1 = rollDmg1();
        dmg1 = rollDmg1 + dmgBonus1,
        life2 -= dmg1,
        log.innerHTML += '<p>'+player1+' acertou '+player2+' causando '+dmg1+' ('+rollDmg1+' + '+dmgBonus1+') de dano';
    } else {
        log.innerHTML += '<p>'+player1+' errou '+player2+'<p>'
    }
}

///////////////////

str = document.getElementById('player2').value,
player2 = str,

str = document.getElementById('life2').value,
life2 = Number(str),

str = document.getElementById('def2').value,
def2 = Number(str),

str = document.getElementById('initbonus2').value,
initBonus2 = Number(str),

str = document.getElementById('bonus2').value,
bonus2 = Number(str),

str = document.getElementById('dmg2').value,
dmgDice2 = Number(str),

str = document.getElementById('dmgbonus2').value,
dmgBonus2 = Number(str),

rollInit2 = function () {
    var randomNumber = Math.floor(Math.random() * 20) + 1 + initBonus2;
    log.innerHTML += '<p>'+player2+' rola iniciativa: '+randomNumber+'';
    return randomNumber;
}

rollAtk2 = function () {
    var randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomNumber;
}

rollDmg2 = function () {
    var randomNumber = Math.floor(Math.random() * this.dmgDice2) + 1;
    return randomNumber;
}

p2atk = function () {
    log.innerHTML += '<div id="p2">';
    rollAtk2 = rollAtk2();
    atk2 = rollAtk2 + bonus2;
    log.innerHTML += '<p>'+player2+' ataca '+atk2+' ('+rollAtk2+' + '+bonus2+')<br>Defesa '+player1+': '+def1+'</p>';
    if (atk2 > def1) {
        rollDmg2 = rollDmg2();
        dmg2 = rollDmg2 + dmgBonus2,
        life1 -= dmg2,
        log.innerHTML += '<p>'+player2+' acertou '+player1+' causando '+dmg2+' ('+rollDmg2+' + '+dmgBonus2+') de dano';
    } else {
        log.innerHTML += '<p>'+player2+' errou '+player1+'<p>';
    }
}

rollInit = function () {
    init1 = rollInit1();
    init2 = rollInit2();
    if (init1 > init2) {
        return 1
    }
    if (init1 < init2) {
        return 2
    }
    if (init1 == init2) {
        if (initBonus1 > initBonus2) {
            return 1
        } else if (initBonus1 < initBonus2) {
            return 2
        }
        else if (initBonus1 == initBonus2) {
            return Math.floor(Math.random() * 2) + 1
        }
    }
}

logpv = function() {
    log.innerHTML += '<p>P1: '+life1+'pv<br>P2: '+life2+'pv</p>';
}

round = function() {

    log.innerHTML += '<p>Batalha começa</p>';

    logpv();

    init = rollInit();

    log.innerHTML += ''+init+'';

    if (init == 1) {
        log.innerHTML += '<p>'+player1+' começa</p>';
        do {
            log.innerHTML += '<p>Round começa</p>';
            log = document.getElementById('log');

            log.innerHTML += '<div id="p1">';
            p1atk();
            if (life2 <= 0) {
                log.innerHTML += '<p>'+player2+' foi derrotado</p>';
                return;
            }
            log.innerHTML += '</div>';
            log.innerHTML += '<div id="life">';
            logpv();
            log.innerHTML += '</div>';

            
            p2atk();
            if (life1 <= 0) {
                log.innerHTML += '<p>'+player1+' foi derrotado</p>';
                return;
            }
            log.innerHTML += '</div>';
            log.innerHTML += '<div id="life">';
            logpv();
            log.innerHTML += '</div>';
            
        }
        while (life1 > 0 && life2 > 0);
    } else if (init > 1) {
        log.innerHTML += '<p>'+player2+' começa</p>';
        do {
            log = document.getElementById('log');

            log.innerHTML += '<div id="p2">';
            p2atk();
            if (life1 <= 0) {
                log.innerHTML += '<p>'+player1+' foi derrotado</p>';
                return;
            }
            log.innerHTML += '</div>';
            log.innerHTML += '<div id="life">';
            logpv();
            log.innerHTML += '</div>';

            log.innerHTML += '<div id="p1">';
            p1atk();
            if (life2 <= 0) {
                log.innerHTML += '<p>'+player2+' foi derrotado</p>';
                return;
            }
            log.innerHTML += '</div>';
            log.innerHTML += '<div id="life">';
            logpv();
            log.innerHTML += '</div>';
            

        }
        while (life1 > 0 && life2 > 0);
    }
}

button.onclick = function() {
  
  round()
}
