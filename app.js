/ * fonction qui execute un jour */

function round(cube, taille) {
    /* crée un nouveau cube avec les valeurs du cube de la veille */
    var new_cube = new Array();
    for (var i = 0; i < taille + 2; i++) {
        new_cube[i] = new Array();
    }
    for (var i = 0; i < taille + 2; i++) {
        for (var j = 0; j < taille + 2; j++) {
            new_cube[i][j] = new Array();
        }
    }
    for (var i = 0; i < taille + 2; i++) {
        for (var j = 0; j < taille + 2; j++) {
            for (var k = 0; k < taille + 2; k++) {
                new_cube[i][j][k] = cube[i][j][k]; //recopie le tableau
            }
        }
    }

    /* Pour chaque petit cube, si un de ses voisins est contaminé, il est contaminé aussi*/
    for (var i = 1; i < taille + 1; i++) {
        for (var j = 1; j < taille + 1; j++) {
            for (var k = 1; k < taille + 1; k++) {
                if (cube[i + 1][j][k] == 1) {
                    new_cube[i][j][k] = 1; //enregistre la contaimination dans le nouveau cube
                } else if (cube[i - 1][j][k] == 1) {
                    new_cube[i][j][k] = 1;
                } else if (cube[i][j + 1][k] == 1) {
                    new_cube[i][j][k] = 1;
                } else if (cube[i][j - 1][k] == 1) {
                    new_cube[i][j][k] = 1;
                } else if (cube[i][j][k + 1] == 1) {
                    new_cube[i][j][k] = 1;
                } else if (cube[i][j][k - 1] == 1) {
                    new_cube[i][j][k] = 1;
                }
            }
        }
    }
    return new_cube; //retourne le nouveau cube
}


function percent(cube, taille) {
    cmp = 0;
    for (var i = 1; i < taille + 1; i++) {
        for (var j = 1; j < taille + 1; j++) {
            for (var k = 1; k < taille + 1; k++) {
                if (cube[i][j][k] == 1) {
                    cmp++;
                }
            }
        }
    }
    return cmp * 100 / Math.pow(taille, 3);
}

/* fonction qui vérifie si un cube est entièrment contaminé */
function full(cube, taille) {
    for (var i = 1; i < taille + 1; i++) {
        for (var j = 1; j < taille + 1; j++) {
            for (var k = 1; k < taille + 1; k++) {
                if (cube[i][j][k] == 0) { //s'il y a un petit cube pas contaminé on sort de la fonction
                    return false;
                }
            }
        }
    }
    return true; //si tous les petits cubes sont contaminés en retourne vrai
}

function affiche(cube, taille) {
    txt = '<div class="teste">';
    for (var i = 1; i < taille + 1; i++) {
        for (var j = 1; j < taille + 1; j++) {
            for (var k = 1; k < taille + 1; k++) {
                if (cube[i][j][k] == 1) {
                    txt += '<span class="element_infecte" value="' + cube[i][j][k] + '">' + cube[i][j][k] + '</span>';

                } else {
                    txt += '<span class="element_non_infecte" value="' + cube[i][j][k] + '">' + cube[i][j][k] + '</span>';

                }
            }

            txt += '<br>';
        }
        txt += '<br>';
    }
    txt += '</div>';
    return txt;

}

/* fonction qui execute l'algorithme */
function test(x, y, z, taille) {
    /*création du cube*/
    var cube = new Array();
    for (var i = 0; i < taille + 2; i++) {
        cube[i] = new Array();
    }
    for (var i = 0; i < taille + 2; i++) {
        for (var j = 0; j < taille + 2; j++) {
            cube[i][j] = new Array();
        }
    }
    for (var i = 0; i < taille + 2; i++) {
        for (var j = 0; j < taille + 2; j++) {
            for (var k = 0; k < taille + 2; k++) {
                cube[i][j][k] = 0; //initialisation, aucun petit cube est contaminé
            }
        }
    }

    var txt = '';

    cube[x + 1][y + 1][z + 1] = 1; //ajoute le premier contaminé
    var cmp = 0; //compteur de jours
    var nb = parseInt(percent(cube, taille)); //pourcentage quotidien

    txt += '<div class="jours"> Jour ' + cmp + ' (' + nb + '%)' + '<br></div>';
    txt += affiche(cube, taille);
    while (!full(cube, taille)) { //tant qu'il y a des petits cubes pas contaminé
        cmp++; //ajoute un jour
        cube = round(cube, taille); //execute l'effet d'un jour

        nb = parseInt(percent(cube, taille)); //pourcentage quotidien

        txt += '<div class="jours">Jour ' + cmp + ' (' + nb + '% de contamination quotidien)' + '<br></div>';
        txt += affiche(cube, taille);
        var nb_jour = document.getElementById('nb_jour');
        nb_jour.innerHTML = 'Il faut attendre ' + '<span id="nb_jours">' + cmp + 'jour(s)' + '</span>' + 'pour que le cube soit entièrement contaminé';
    }
    var affichage = document.getElementById('enc');
    affichage.innerHTML = txt;
    cube = []; //vide le tableau
    return cmp; //retourne le nombre de jour
}

//var res= test(x,y,z,taille_cube);

var valider = document.getElementById('valider');

function valide() {
    var taille_cube = parseInt(document.getElementById('taille_cube').value);
    var x = parseInt(document.getElementById("x").value);
    var y = parseInt(document.getElementById("y").value);
    var z = parseInt(document.getElementById('z').value);

    var res = test(x, y, z, taille_cube);



}



valider.addEventListener('click', valide);

var nb_jour = document.getElementById('nb_jour');
nb_jour.innerHTML = cmp;