import './blocks/custom-blocks.js';


`
    <block type="controls_if">
      <mutation else="1"></mutation>
    </block>
    <block type="controls_if">
      <mutation elseif="1" else="1"></mutation>
    </block>
  </category>
  <category name="Boolean" colour="%{BKY_LOGIC_HUE}">
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>
</category>

<block type="controls_for">
    <field name="VAR">i</field>
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="BY">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
  <block type="controls_forEach"></block>
  <block type="controls_flow_statements"></block>
</category>
<category name="Math" colour="%{BKY_MATH_HUE}">
  <block type="math_number">
    <field name="NUM">123</field>
  </block>
  <block type="math_arithmetic"></block>
  <block type="math_single"></block>
  <block type="math_trig"></block>
  <block type="math_constant"></block>
  <block type="math_number_property"></block>
  <block type="math_round"></block>
  <block type="math_on_list"></block>
  <block type="math_modulo"></block>
  <block type="math_constrain">
    <value name="LOW">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="HIGH">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
  </block>
  <block type="math_random_float"></block>
</category>
<category name="Lists" colour="%{BKY_LISTS_HUE}">
  <block type="lists_create_empty"></block>
  <block type="lists_create_with"></block>
  <block type="lists_repeat">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">5</field>
      </block>
    </value>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
  <block type="lists_indexOf"></block>
  <block type="lists_getIndex"></block>
  <block type="lists_setIndex"></block>
</category>
<sep></sep>
<category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
</category>
<category name="Functions" custom="PROCEDURE" colour="%{BKY_PROCEDURES_HUE}">
</category>
<sep></sep>
<category name="Library" expanded="true">
  <category name="Randomize">
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="list"></arg>
      </mutation>
      <field name="NAME">randomize</field>
      <statement name="STACK">
        <block type="controls_for" inline="true">
          <field name="VAR">x</field>
          <value name="FROM">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <value name="TO">
            <block type="lists_length" inline="false">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">list</field>
                </block>
              </value>
            </block>
          </value>
          <value name="BY">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <statement name="DO">
            <block type="variables_set" inline="false">
              <field name="VAR">y</field>
              <value name="VALUE">
                <block type="math_random_int" inline="true">
                  <value name="FROM">
                    <block type="math_number">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                  <value name="TO">
                    <block type="lists_length" inline="false">
                      <value name="VALUE">
                        <block type="variables_get">
                          <field name="VAR">list</field>
                        </block>
                      </value>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="variables_set" inline="false">
                  <field name="VAR">temp</field>
                  <value name="VALUE">
                    <block type="lists_getIndex" inline="true">
                      <mutation statement="false" at="true"></mutation>
                      <field name="MODE">GET</field>
                      <field name="WHERE">FROM_START</field>
                      <value name="AT">
                        <block type="variables_get">
                          <field name="VAR">y</field>
                        </block>
                      </value>
                      <value name="VALUE">
                        <block type="variables_get">
                          <field name="VAR">list</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <next>
                    <block type="lists_setIndex" inline="false">
                      <value name="AT">
                        <block type="variables_get">
                          <field name="VAR">y</field>
                        </block>
                      </value>
                      <value name="LIST">
                        <block type="variables_get">
                          <field name="VAR">list</field>
                        </block>
                      </value>
                      <value name="TO">
                        <block type="lists_getIndex" inline="true">
                          <mutation statement="false" at="true"></mutation>
                          <field name="MODE">GET</field>
                          <field name="WHERE">FROM_START</field>
                          <value name="AT">
                            <block type="variables_get">
                              <field name="VAR">x</field>
                            </block>
                          </value>
                          <value name="VALUE">
                            <block type="variables_get">
                              <field name="VAR">list</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <next>
                        <block type="lists_setIndex" inline="false">
                          <value name="AT">
                            <block type="variables_get">
                              <field name="VAR">x</field>
                            </block>
                          </value>
                          <value name="LIST">
                            <block type="variables_get">
                              <field name="VAR">list</field>
                            </block>
                          </value>
                          <value name="TO">
                            <block type="variables_get">
                              <field name="VAR">temp</field>
                            </block>
                          </value>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </statement>
    </block>
  </category>
  <category name="Jabberwocky">
    <block type="text_print">
      <value name="TEXT">
        <block type="text">
          <field name="TEXT">'Twas brillig, and the slithy toves</field>
        </block>
      </value>
      <next>
        <block type="text_print">
          <value name="TEXT">
            <block type="text">
              <field name="TEXT">  Did gyre and gimble in the wabe:</field>
            </block>
          </value>
          <next>
            <block type="text_print">
              <value name="TEXT">
                <block type="text">
                  <field name="TEXT">All mimsy were the borogroves,</field>
                </block>
              </value>
              <next>
                <block type="text_print">
                  <value name="TEXT">
                    <block type="text">
                      <field name="TEXT">  And the mome raths outgrabe.</field>
                    </block>
                  </value>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <block type="text">
          <field name="TEXT">"Beware the Jabberwock, my son!</field>
        </block>
      </value>
      <next>
        <block type="text_print">
          <value name="TEXT">
            <block type="text">
              <field name="TEXT">  The jaws that bite, the claws that catch!</field>
            </block>
          </value>
          <next>
            <block type="text_print">
              <value name="TEXT">
                <block type="text">
                  <field name="TEXT">Beware the Jubjub bird, and shun</field>
                </block>
              </value>
              <next>
                <block type="text_print">
                  <value name="TEXT">
                    <block type="text">
                      <field name="TEXT">  The frumious Bandersnatch!"</field>
                    </block>
                  </value>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </category>
</category>
</xml>`;

const toolbox = [
  {
    name: 'Ecran',
    color: 0,
    blocks: [
      'led_image',
      ...['allumer_led', 'eteindre_led']
        .map(n => ({
          type: n,
          value: [{
            name: 'y',
            block: {
              type: 'math_number',
              field: {
                name: 'NUM',
                text: 0
              }
            }
          },
          {
            name: 'x',
            block: {
              type: 'math_number',
              field: {
                name: 'NUM',
                text: 0
              }
            }
          }]
        }))
    ]
  },
  {
    name: 'Logique',
    color: '%{BKY_LOGIC_HUE}',
    blocks: [
      'controls_if'
    ]
  },
  {
    name: 'Boucles',
    color: '%{BKY_LOOPS_HUE}',
    blocks: [
      'controls_whileUntil',
      {
        type: 'controls_repeat_ext',
        value: {
          name: 'TIMES',
          block: {
            type: 'math_number',
            field: {
              name: 'NUM',
              text: 10
            }
          }
        }
      }
    ]
  },
  {
    name: 'Delai',
    color: '40',
    blocks: [
      'attendre_s',
      'attendre_ms'
    ]
  },
  {
    name: 'Variables',
    custom: 'VARIABLE',
    color: '%{BKY_VARIABLES_HUE}'
  },
];


const build = {

  children: p =>
    _(p).map((v, k) => {
      if (!build[k])
        return null;
      if (!Array.isArray(v))
        v = [v]
      return v.map(e => build[k](e));
    })
      .values()
      .filter(v => v)
      .join(''),

  text: v => v,
  field: v => `<field name="${v.name}">${build.children(v)}</field>\n`,
  value: v => `<value name="${v.name}">${build.children(v)}</value>\n`,
  block: b => {
    if (typeof (b) == 'string')
      return `<block type="${b}"></block>\n`;
    else
      return `<block type="${b.type}">
                ${build.children(b)}
              </block>\n`;
  },
  category: c => `<category name="${c.name}"
                          ${c.custom ? 'custom="' + c.custom + '"' : ''}
                          colour="${c.color}">
                            ${c.blocks ? c.blocks.map(build.block) : ''}
                  </category>`,
  toolbox: categories => `<xml>
      ${categories.map(build.category)}
    </xml>`
}

let tb = build.toolbox(toolbox);
console.log(tb);


export default {
  media: '../node_modules/blockly/media/',
  toolbox: build.toolbox(toolbox),
  zoom:
  {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  grid:
  {
    spacing: 25,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  trashcan: true
};
