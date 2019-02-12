# Tutorial hepialight

Ce tutorial va te guider dans les étapes nécéssaires à la réalisation d'un simple programme avec ton HepiaLight.

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

Glisser-déposer le composant "Allumer LED" dans l'espace de travail:

![](tutorial/images/drag_component.gif =480x\*)

<button onclick="tutorial.workspace('allumer_led_default')">Solution</button>

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

<button onclick="tutorial.workspace('led4_4_blue')">Solution</button>

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

Branchez votre HepiaLight et cliquez sur le boutton "Exécuter" pour executer le programme sur votre carte.
