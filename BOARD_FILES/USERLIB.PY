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

# use https://goo.gl/gGYfJV to add new chars
textDict = {
    ' ': [],
    'A': [14, 17, 17, 31, 17, 17, 17],
    'B': [15, 17, 17, 31, 17, 17, 15],
    'C': [14, 17, 1, 1, 1, 17, 14],
    'D': [15, 17, 17, 17, 17, 17, 15],
    'E': [31, 1, 1, 15, 1, 1, 31],
    'F': [31, 1, 1, 15, 1, 1, 1],
    'G': [14, 17, 1, 1, 25, 17, 30],
    'H': [17, 17, 17, 31, 17, 17, 17],
    'I': [31, 4, 4, 4, 4, 4, 31],
    'J': [31, 16, 16, 16, 16, 17, 14],
    'K': [17, 17, 9, 7, 9, 17, 17],
    'L': [1, 1, 1, 1, 1, 1, 31],
    'M': [17, 27, 27, 21, 21, 17, 17],
    'N': [17, 19, 21, 21, 25, 17, 17],
    'O': [14, 17, 17, 17, 17, 17, 14],
    'P': [15, 17, 17, 17, 15, 1, 1],
    'Q': [14, 17, 17, 17, 17, 21, 14, 4, 8],
    'R': [15, 17, 17, 15, 9, 17, 17],
    'S': [30, 1, 1, 14, 16, 16, 15],
    'T': [31, 4, 4, 4, 4, 4, 4],
    'U': [17, 17, 17, 17, 17, 17, 14],
    'V': [17, 17, 17, 17, 10, 10, 4],
    'W': [17, 17, 21, 21, 21, 10, 10],
    'X': [17, 17, 10, 4, 10, 17, 17],
    'Y': [17, 10, 4, 4, 4, 4, 4],
    'Z': [31, 16, 8, 4, 2, 1, 31],
    'a': [0, 0, 14, 16, 30, 17, 30],
    'b': [1, 1, 13, 19, 17, 17, 15],
    'c': [0, 0, 14, 17, 1, 17, 14],
    'd': [16, 16, 30, 17, 17, 17, 14],
    'e': [0, 0, 14, 17, 31, 1, 30],
    'f': [24, 4, 30, 4, 4, 4, 31],
    'g': [0, 0, 30, 17, 17, 25, 22, 16, 14],
    'h': [1, 1, 15, 17, 17, 17, 17],
    'i': [4, 0, 7, 4, 4, 4, 31],
    'j': [16, 0, 28, 16, 16, 16, 16, 17, 14],
    'k': [1, 1, 9, 9, 7, 9, 17],
    'l': [7, 4, 4, 4, 4, 4, 31],
    'm': [0, 0, 21, 31, 21, 21, 21],
    'n': [0, 0, 13, 19, 17, 17, 17],
    'o': [0, 0, 14, 17, 17, 17, 14],
    'p': [0, 0, 13, 19, 17, 17, 15, 1, 1],
    'q': [0, 0, 30, 17, 17, 25, 22, 16, 16],
    'r': [0, 0, 27, 6, 2, 2, 15],
    's': [0, 0, 30, 1, 14, 16, 15],
    't': [0, 4, 31, 4, 4, 4, 24],
    'u': [0, 0, 17, 17, 17, 25, 22],
    'v': [0, 0, 17, 17, 10, 10, 4],
    'w': [0, 0, 17, 21, 21, 10, 10],
    'x': [0, 0, 17, 17, 14, 17, 17],
    'y': [0, 0, 17, 17, 10, 10, 4, 4, 3],
    'z': [0, 0, 31, 8, 4, 2, 31],
    '0': [14, 25, 21, 21, 21, 19, 14],
    '1': [4, 7, 4, 4, 4, 4, 31],
    '2': [14, 17, 16, 14, 1, 1, 31],
    '3': [14, 17, 16, 14, 16, 17, 14],
    '4': [8, 12, 10, 9, 31, 8, 8],
    '5': [31, 1, 1, 15, 16, 16, 15],
    '6': [12, 2, 1, 15, 17, 17, 14],
    '7': [31, 16, 8, 4, 2, 2, 2],
    '8': [14, 17, 17, 14, 17, 17, 14],
    '9': [14, 17, 17, 30, 16, 8, 6],
    '.':[0, 0, 0, 0, 0, 4, 4],
    ',':[0, 0, 0, 0, 0, 4, 4, 2],
    ';':[0, 0, 4, 4, 0, 4, 4, 2],
    '?':[14, 17, 16, 12, 0, 4, 4],
    '!':[4, 4, 4, 4, 0, 4, 4],
    '-':[0, 0, 0, 0, 14],
    '_':[0, 0, 0, 0, 0, 0, 31],
    '*':[0, 0, 10, 4, 10],
    '+':[0, 0, 4, 4, 31, 4, 4],
    '/':[16, 16, 8, 4, 4, 2, 2],
    '\\':[2, 2, 4, 8, 8, 16, 16],
    '<':[0, 0, 8, 4, 2, 4, 8],
    '>':[0, 0, 2, 4, 8, 4, 2],
    '#':[10, 10, 31, 10, 31, 10, 10],
    '=':[0, 0, 0, 31, 0, 31],
    "'":[8, 8, 4],
    "%":[11, 11, 4, 2, 2, 13, 13, 0, 0],
    "&":[6, 1, 1, 6, 5, 9, 22, 0, 0],
    "@":[14, 17, 29, 27, 31, 1, 30, 0, 0],
    "$":[4, 30, 5, 14, 20, 15, 4, 0, 0],
}

def afficher_texte(text, color=ROUGE, speed=0.1):
    width = 5
    height = 9
    h_offset = 9
    spacewidth = 2

    def printColumn(i, xpos, text):
        if i < h_offset or i >= h_offset + len(text) * (width + spacewidth):
            char = ' '
            col = 0
        else:
            i -= h_offset
            char = text[i // (width + spacewidth)]
            col = i % (width + spacewidth)
            if char not in textDict:
                char = ' '
        colbit = 1 << col
        charMap = textDict[char]
        for line in range(height):
            colored = len(charMap)>line and charMap[line] & colbit
            screen.set_led((xpos, height - 1 - line), color if colored else 0)

    for step in range(h_offset + len(text) * (width + spacewidth) + 1):
        for i in range(NBR_COLONNES):
            printColumn(step + i, i, text)
        delai(speed)

def afficher_grille(grille):
    arr = [COLORS[c] for c in grille if c in COLORS]
    for i in range(NBR_LIGNES):
        for j in range(NBR_COLONNES):
            screen.set_led((i, j), arr[i * NBR_COLONNES + j])


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
