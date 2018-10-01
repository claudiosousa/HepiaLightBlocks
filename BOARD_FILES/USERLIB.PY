#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from Hepialight import screen, touch, accel

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
    time.sleep(delai_en_sec)

def colorToInt(hexColor):
    return int(hexColor[1:], 16)

COLORS = {
    "R": colorToInt("#A2142F"),
    "B": colorToInt("#0072BD"),
    "O": colorToInt("#D95319"),
    "Y": colorToInt("#EDB120"),
    "P": colorToInt("#7E2F8E"),
    "G": colorToInt("#77AC30"),
    "C": colorToInt("#4DBEEE"),
    ".": colorToInt("#000000")
}

def afficher_grille(grille):
    arr = [COLORS[c] for c in grille if c in COLORS]
    for i in range(NBR_LIGNES):
        for j in range(NBR_COLONNES):
            screen.set_led((i, j), arr[i*NBR_COLONNES+j])


def allumer_tout(couleur):
    for i in range(NBR_LIGNES):
        for j in range(NBR_COLONNES):
            screen.set_led((i, j), couleur)

def eteindre_tout():
    allumer_tout(0)

def allumer_ligne(num_ligne, couleur):
    for i in range(NBR_COLONNES):
        screen.set_led((i, num_ligne), couleur)

def allumer_colonne(num_colonne, couleur):
    for j in range(NBR_LIGNES):
        screen.set_led((num_colonne, j), couleur)

def allumer_led(pos_x, pos_y, couleur):
    screen.set_led((pos_x, pos_y), couleur)

def eteindre_led(pos_x, pos_y):
    screen.set_led((pos_x, pos_y), 0)

def penche_gauche():
    return _accel.get_axis()[0] > _seuil_accel

def penche_droite():
    return _accel.get_axis()[0] < -_seuil_accel

def penche_avant():
    return _accel.get_axis()[1] > _seuil_accel

def penche_arriere():
    return _accel.get_axis()[1] < -_seuil_accel

def touche_bas_gauche():
    return touch.read(0)

def touche_bas_droite():
    return touch.read(1)

def touche_haut_gauche():
    return touch.read(2)

def touche_haut_droite():
    return touch.read(3)
