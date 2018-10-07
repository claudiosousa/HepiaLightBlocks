import '../blockly-extensions/index.js';

const toolboxConfig = [
  {
    name: 'Ecran',
    color: 0,
    blocks: [
      'LedImage',
      ...['AllumerLed', 'EteindreLed']
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
      'AttendreS',
      'AttendreMs'
    ]
  },
  {
    name: 'Variables',
    custom: 'VARIABLE',
    color: '%{BKY_VARIABLES_HUE}'
  },
];

/**
 * Methods to build a toolbox xml configuration from the javascript object
 */
const buildFunctions = {

  children: p =>
    _(p).map((v, k) => {
      if (!buildFunctions[k])
        return null;
      if (!Array.isArray(v))
        v = [v]
      return v.map(e => buildFunctions[k](e));
    })
      .values()
      .filter(v => v)
      .join(''),

  text: v => v,
  field: v => `<field name="${v.name}">${buildFunctions.children(v)}</field>\n`,
  value: v => `<value name="${v.name}">${buildFunctions.children(v)}</value>\n`,
  block: b => {
    if (typeof (b) == 'string')
      return `<block type="${b}"></block>\n`;
    else
      return `<block type="${b.type}">
                ${buildFunctions.children(b)}
              </block>\n`;
  },
  category: c => `<category name="${c.name}"
                          ${c.custom ? 'custom="' + c.custom + '"' : ''}
                          colour="${c.color}">
                            ${c.blocks ? c.blocks.map(buildFunctions.block) : ''}
                  </category>`,
  toolbox: categories => `<xml>
      ${categories.map(buildFunctions.category)}
    </xml>`
}

export default buildFunctions.toolbox(toolboxConfig);
