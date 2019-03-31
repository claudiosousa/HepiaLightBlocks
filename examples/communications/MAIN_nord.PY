while True:
  r = recevoir_msg((S))

  if r == 1:
    allumer_tout(13369344)
    delai(0.1)
  else:
    eteindre_tout()
