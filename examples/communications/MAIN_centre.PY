"""Décrire cette fonction…
"""
def presseSud():
  return touche_bas_gauche() or touche_bas_droite()

"""Décrire cette fonction…
"""
def allumerSud():
  envoyer_msg((S), 1)

"""Décrire cette fonction…
"""
def allumerNord():
  envoyer_msg((N), 1)

"""Décrire cette fonction…
"""
def presseNord():
  return touche_haut_gauche() or touche_haut_droite()


while True:
  if presseSud():
    allumerSud()
  if presseNord():
    allumerNord()
  delai(0.1)
