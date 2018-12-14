while True:
  r = recevoir_msg((N))

  if r == 1:
    allumer_tout(3355647)
    delai(0.1)
  else:
    eteindre_tout()
