#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Module utilisateur Français pédagogique pour hepialight2
Contient des fonctions pour interfacer la carte:
    - Accès aux LEDs
    - Accès à l'accéléromètre
    - Accès au pavé tactile
'''

__author__ = 'Adrien Lescourt'
__copyright__ = 'hepialight2 hepia 2017'
__credits__ = ['Adrien Lescourt']
__version__ = '1.0.0'
__email__ = 'adrien.lescourt@hesge.ch'
__status__ = 'Prototype'

import time
from Hepialight import touch, screen, accel

# Constantes
NBR_LIGNES = 10
NBR_COLONNES = 10

# Couleurs
ROUGE = 0xFF0000
VERT = 0x00FF00
BLEU = 0x0000FF

_accel = accel()
_seuil_accel = 0.3


def delai(delai_en_sec):
    '''Met en pause l'exécution du programme

    :delai_en_sec: Temps de la pause en seconde

    '''
    time.sleep(delai_en_sec)


def allumer_tout(couleur):
    '''Allume tout l'écran selon la couleur passe en paramètre

    :couleur: Couleur de l'écran

    '''
    for i in range(NBR_LIGNES):
        for j in range(NBR_COLONNES):
            screen.set_led((i, j), couleur)


def eteindre_tout():
    '''Éteint tout l'écran

    '''
    for i in range(NBR_LIGNES):
        for j in range(NBR_COLONNES):
            screen.set_led((i, j), 0)


def allumer_ligne(num_ligne, couleur):
    '''Allume tout une ligne de la couleur choisi

    :num_ligne: numéro de la ligne entre 0 et 9
    :couleur: couleur des LEDs

    '''
    for i in range(NBR_COLONNES):
        screen.set_led((i, num_ligne), couleur)


def allumer_colonne(num_colonne, couleur):
    '''Allume tout une colonne de la couleur choisi

    :num_colonne: numéro de la colonne entre 0 et 9
    :couleur: couleur des LEDs

    '''
    for j in range(NBR_LIGNES):
        screen.set_led((num_colonne, j), couleur)


def allumer_led(pos_x, pos_y, couleur):
    '''Allume la LED a la position pos_x, pos_y de la couleur choisi

    :pos_x: numero de la ligne entre 0 et 9
    :pos_y: numero de la colonne entre 0 et 9
    :couleur: couleur de la LED

    '''
    screen.set_led((pos_x, pos_y), couleur)


def eteindre_led(pos_x, pos_y):
    '''Eteint la LED a la position pos_x, pos_y

    :x: numero de la ligne entre 0 et 9
    :y: numero de la colonne entre 0 et 9

    '''
    screen.set_led((pos_x, pos_y), 0)


def penche_gauche():
    '''Détecte si la carte penche sur la gauche
    :returns: True si la carte penche sur la gauche, False sinon

    '''
    return _accel.get_axis()[0] > _seuil_accel


def penche_droite():
    '''Détecte si la carte penche sur la droite
    :returns: True si la carte penche sur la droite, False sinon

    '''
    return _accel.get_axis()[0] < -_seuil_accel


def penche_avant():
    '''Détecte si la carte penche en avant
    :returns: True si la carte penche sur en avant, False sinon

    '''
    return _accel.get_axis()[1] > _seuil_accel


def penche_arriere():
    '''Détecte si la carte penche en arrière
    :returns: True si la carte penche sur en arrière, False sinon

    '''
    return _accel.get_axis()[1] < -_seuil_accel


def touche_bas_gauche():
    '''Détecte si le pavé tactile inférieur gauche est pressé
    :returns: True si pressé, False sinon

    '''
    return touch.read(0)


def touche_bas_droite():
    '''Détecte si le pavé tactile inférieur droit est pressé
    :returns: True si pressé, False sinon

    '''
    return touch.read(1)


def touche_haut_gauche():
    '''Détecte si le pavé tactile supérieur gauche est pressé
    :returns: True si pressé, False sinon

    '''
    return touch.read(2)


def touche_haut_droite():
    '''Détecte si le pavé tactile supérieur droit est pressé
    :returns: True si pressé, False sinon

    '''
    return touch.read(3)
