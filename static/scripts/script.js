

// Variable pour stocker l'ID de l'intervalle de déplacement
var movementInterval = null;

function moveButtonRandomlyAfterClic() {
    var btnNon = document.getElementById('non');
    // Calcul des limites pour le placement aléatoire du bouton NON
    var maxX = window.innerWidth - btnNon.offsetWidth;
    var maxY = window.innerHeight - btnNon.offsetHeight;
    // Génération de positions aléatoires dans ces limites
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);
    // Application des positions aléatoires au bouton NON
    btnNon.style.position = 'fixed'; // Assurez-vous que le bouton peut se déplacer librement dans la fenêtre
    btnNon.style.left = randomX + 'px';
    btnNon.style.top = randomY + 'px';
}

function moveButtonRandomly(speed) {
    var btnNon = document.getElementById('non');
    btnNon.style.position = 'fixed';

    // Fonction pour déplacer le bouton
    function move() {
        var maxX = window.innerWidth - btnNon.offsetWidth;
        var maxY = window.innerHeight - btnNon.offsetHeight;
        var randomX = Math.floor(Math.random() * maxX);
        var randomY = Math.floor(Math.random() * maxY);

        btnNon.style.left = randomX + 'px';
        btnNon.style.top = randomY + 'px';
    }

    // Arrête l'intervalle précédent si existant
    if (movementInterval !== null) {
        clearInterval(movementInterval);
    }

    // Démarre un nouvel intervalle de déplacement
    movementInterval = setInterval(move, 1400*speed); // Ajustez le délai selon les besoins
}


function shakeElement(elementId) {
  var element = document.getElementById(elementId);
  element.classList.add('shake');

  // Supprime la classe après 2 secondes pour arrêter l'effet de tremblement
  setTimeout(function() {
    element.classList.remove('shake');
  }, 200); // Durée de l'effet de tremblement
}



let scaleOui = 1;
let scaleNon = 1;
let speed = 1;
let nombreDeClicNon = 0;
let messagesNon = [
    "Es-tu sûre ?",
    "Es-tu absolument certaine ?",
    "Tu me confirmes vouloir cliquer sur NON ?",
    "As-tu bien considéré ta réponse ?",
    "Je serai très triste si tu cliques sur ce bouton.",
    "Tu n'as donc pas de coeur.",
    "Arrête tes bêtises, et clique sur oui.",
    "Un astéroïde destructeur s'approche. Changerais-tu d'avis pour sauver le monde ?",
    "Une invasion de zombies est en cours. Un oui pourrait être notre seule échappatoire.",
    "Macron impose l'abstinence globale. Un oui briserait le sort.",
    "Les aliens menacent d'envahir si tu refuses. Es-tu prête à prendre ce risque ?",
    "Une éruption solaire cataclysmique est prévue. Un oui pourrait nous protéger.",
    "Les robots ont pris le contrôle. Un oui pourrait déclencher la résistance.",
    "Une faille temporelle s'ouvrira si tu dis non. Veux-tu vraiment risquer le chaos temporel ?",
    "Le réchauffement climatique s'accélère. Un oui ferait nommer Serge Zaka Premier ministre.",
    "Une pénurie mondiale de chocolat a été annoncée. Seul un oui pourrait inverser cette tendance tragique.",
    "Je ne suis pas sûr d'avoir bien compris ta réponse. Veux-tu répondre non ?"
];
let messageIndex = 0;


document.getElementById('non').addEventListener('click', function() {
  shakeElement('non'); // Remplacez 'monBouton' par l'ID de votre bouton
});


document.getElementById('oui').addEventListener('click', function() {
    document.getElementById('reponse').innerHTML = "<div class='end'><h3 class='superbe'>YOUPIIII !</h3><img src='https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif' alt='Image' style='width: 200px;'></div>";
    document.getElementById('score').innerHTML = "<p>SCORE = " + nombreDeClicNon + "</p>";

    document.querySelector('.container').style.display = "none"; // Masque tous les éléments sauf la réponse
});

document.getElementById('non').addEventListener('click', function() {
    var btnOui = document.getElementById('oui');
    var btnNon = document.getElementById('non');
    var question = document.getElementById('question');
    nombreDeClicNon += 1;
    // Met à jour le texte pour le bouton NON et ajuste l'index pour les messages
    btnNon.textContent = messagesNon[messageIndex++];
    messageIndex = messageIndex >= messagesNon.length ? 0 : messageIndex;
    


        // Augmente la font-size de OUI au lieu de modifier scaleOui
    var currentFontSizeOui = parseInt(window.getComputedStyle(btnOui).fontSize, 10);
    btnOui.style.fontSize = `${currentFontSizeOui + 7 + nombreDeClicNon*1.1}px`;

    // Si scaleOui dépasse 5, déplace le bouton NON aléatoirement
    if (nombreDeClicNon > 9) {
        moveButtonRandomly(speed);
        moveButtonRandomlyAfterClic();
        speed *= 0.95;
        scaleNon *= 0.999;


    }

    // Mise à jour conditionnelle des transformations pour éviter le chevauchement excessif
    if (nombreDeClicNon < 4) { // Limite de croissance pour OUI
        scaleNon *= 0.99;
    }

    // Applique les transformations
    btnOui.style.transform = `scale(${scaleOui})`;
    btnNon.style.transform = `scale(${scaleNon})`;
    
    // // Augmente le padding de la question
    // let currentPadding = parseInt(window.getComputedStyle(question).padding, 10);
    // question.style.padding = `${currentPadding + 2 + scaleOui}px`;
    
    // // Augmente le margin du bouton NON
    // let currentMargin = parseInt(window.getComputedStyle(btnNon).marginLeft, 10);
    // btnNon.style.margin = `${currentMargin + 5}px`;
});

