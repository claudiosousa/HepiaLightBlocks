# Tutorial blink

Ce tutorial va te guider dans les étapes nécéssaires à la réalisation d'un simple programme _Blink_ avec ton HepiaLight.

Avant de commencer, assure toi que tu as une carte HepiaLight:

![](tutorial/images/board.png =100x\*)

Et que ton espace de travail est vide:

<!--Clicking on the button will apply the content on the `workspace` named `empty` below -->

<button onclick="tutorial.workspace('empty')">Effacer l'espace de travail</button>

<!-- workspace template, empty in this case -->
<workspace id="empty">
    <xml xmlns="http://www.w3.org/1999/xhtml">
    </xml>
</workspace>

# Ajouter un composant

A gauche de l'espace se travail se trouvent tous les composants groupés par catégorie.

Sous ![](tutorial/images/affichage.png =\*x25) se trouvent les composant liés au contrôle des élèments graphique de votre carte.

Glisser-déposer le composant _Allumer LED_ dans l'espace de travail:

![](tutorial/images/drag_component.gif =480x\*)

<button onclick="tutorial.workspace('allumer_led_default')">Charger la solution</button>

<workspace id="allumer_led_default">
    <xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="AllumerLed" id=")meyx.DvGw%LYtqc@me4" x="50" y="113">
        <field name="color">#A2142F</field>
        <value name="y">
        <block type="math_number" id=",.06Ed|XoZokgk#,:i%M">
            <field name="NUM">0</field>
        </block>
        </value>
        <value name="x">
        <block type="math_number" id="-;aTdy8vmONJf!F]oeWQ">
            <field name="NUM">0</field>
        </block>
        </value>
    </block>
    </xml>
</workspace>

# Configurer le composant

Ecrire la valeur `4` sur la ligne et colonne du composant "Allumer LED" dans l'espace de travail.

Choisir la couleur de votre choix en cliquant sur le carré rouge.

![](tutorial/images/allumer_led_configured.png =\*x25)

<button onclick="tutorial.workspace('led4_4_blue')">Charger la solution</button>

<workspace id="led4_4_blue">
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="AllumerLed" id="1Y)7k}}gyaaE:wzIY{jD" x="50" y="113">
    <field name="color">#000099</field>
    <value name="y">
      <block type="math_number" id="fOkJzqoN*3=$Q;.~Q=zU">
        <field name="NUM">4</field>
      </block>
    </value>
    <value name="x">
      <block type="math_number" id="`p[_jH/9_V_RkwT@+%[.">
        <field name="NUM">4</field>
      </block>
    </value>
  </block>
</xml>
</workspace>

# Tester

Configuré ainsi, ce composant allume une leds sur la carte comme illustré:

![](tutorial/images/board_blue_led.png =200x\*)

Branchez votre HepiaLight et cliquez sur le boutton "Exécuter" pour executer le programme sur votre carte.

# Éteindre l'écran

Nous souhaitons que la lumière allumée s'éteigne au bout de 0.5s.

Pour cela, nous devons rajouter le composants:

-   _Attente_, qui se trouve sous le la section _Délai_, configuré pour attendre `0.5s`.
-   _Éteindre tout_, qui se trouve sous le la section _Affichage_.

Les composant doivent être placés les uns après les autres:

![](tutorial/images/allumer_led_eteindre.png =400x\*)

<button onclick="tutorial.workspace('eteindre')">Charger la solution</button>

<workspace id="eteindre">
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="AllumerLed" id="1Y)7k}}gyaaE:wzIY{jD" x="50" y="113">
    <field name="color">#000099</field>
    <value name="y">
      <block type="math_number" id="fOkJzqoN*3=$Q;.~Q=zU">
        <field name="NUM">4</field>
      </block>
    </value>
    <value name="x">
      <block type="math_number" id="`p[_jH/9_V_RkwT@+%[.">
        <field name="NUM">4</field>
      </block>
    </value>
    <next>
      <block type="AttendreS" id="pCvq9k_{lxElg(L(v:[J">
        <field name="s">0.5</field>
        <next>
          <block type="EteindreTout" id="eJYw!%G1@#XWdkiEI,yo"></block>
        </next>
      </block>
    </next>
  </block>
</xml>
</workspace>

# Clignoter

Nous avons réussit à faire allumer une LED qui s'éteint au bout de 0.5s. Bravo !

Nous aimerions maintenant faire clignoter la LED.
En d'autres mots, nous aimerions que la LED se rallume 0.5s plus tard, et qu'elle re-effecue toutes ces étapes de manière répétée.

Pour ce faire, dupliquez le composant _Attente_ déjà placé en le sélectionant, suivi d'un copier-coller (_ctrl+c_ et _ctrl+v_).

Assurez vous de bien placer ce composant après les autres déjà placés.

Il ne nous reste plus faire en sorte que le tout se répète, à l'aide du composant _Pour toujours_, qui se trouve dans la section _Boucles_.

Ce composant doit être placé soigneusement de manière à contenir à son intérieur tous ceux placés précédément:

![](tutorial/images/workspace_final.png =400x\*)

<button onclick="tutorial.workspace('workspace_final')">Charger la solution</button>

<workspace id="workspace_final">
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="PourToujours" id="=;UNUoMIY:JKFD)dzGe{" x="23" y="67">
    <statement name="instructions">
      <block type="AllumerLed" id="1Y)7k}}gyaaE:wzIY{jD">
        <field name="color">#000099</field>
        <value name="y">
          <block type="math_number" id="fOkJzqoN*3=$Q;.~Q=zU">
            <field name="NUM">4</field>
          </block>
        </value>
        <value name="x">
          <block type="math_number" id="p[_jH/9_V_RkwT@+%[.">
            <field name="NUM">4</field>
          </block>
        </value>
        <next>
          <block type="AttendreS" id="pCvq9k_{lxElg(L(v:[J">
            <field name="s">0.5</field>
            <next>
              <block type="EteindreTout" id="eJYw!%G1@#XWdkiEI,yo">
                <next>
                  <block type="AttendreS" id="%h.hb`M;$XO#Jfo:Cm:L">
                    <field name="s">0.5</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
</workspace>

# Tester la version finale

Executez la version final du programme sur votre HepiaLight à l'aide du boutton "Exécuter".

Votre carte doit maintenant affiché une LED qui clignote comme illustré ici:

![](tutorial/images/final_animated.gif =200x\*)
