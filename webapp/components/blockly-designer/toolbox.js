import '../blockly-extensions/index.js';
import { TOOLBOX_COLORS } from '../blockly-extensions/Constants.js';

const toolboxConfig = [
    {
        name: 'Affichage',
        color: TOOLBOX_COLORS.DISPLAY,
        blocks: [
            'EteindreTout',
            'AllumerTout',
            ...['AllumerLed', 'EteindreLed'].map(n => ({
                type: n,
                value: [
                    {
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
                    }
                ]
            })),
            ...['AllumerLigne', 'AllumerColonne'].map(n => ({
                type: n,
                value: [
                    {
                        name: 'number',
                        block: {
                            type: 'math_number',
                            field: {
                                name: 'NUM',
                                text: 0
                            }
                        }
                    }
                ]
            })),
            'LedImage',
            'ScrollText'
        ]
    },
    {
        name: 'Événements',
        color: TOOLBOX_COLORS.INPUT,
        blocks: ['BouttonPresse', 'Penche', 'Accel']
    },
    {
        name: 'Logique',
        color: '%{BKY_LOGIC_HUE}',
        blocks: [
            'logic_compare',
            'logic_operation',
            'logic_negate',
            'logic_boolean',
            'controls_if',
            {
                type: 'controls_if',
                mutation: [{ name: 'else', value: 1 }]
            }
        ]
    },
    {
        name: 'Boucles',
        color: '%{BKY_LOOPS_HUE}',
        blocks: [
            'PourToujours',
            {
                type: 'controls_for',
                value: [
                    {
                        name: 'FROM',
                        block: {
                            type: 'math_number',
                            field: {
                                name: 'NUM',
                                text: 0
                            }
                        }
                    },
                    {
                        name: 'TO',
                        block: {
                            type: 'math_number',
                            field: {
                                name: 'NUM',
                                text: 9
                            }
                        }
                    },
                    {
                        name: 'BY',
                        block: {
                            type: 'math_number',
                            field: {
                                name: 'NUM',
                                text: 1
                            }
                        }
                    }
                ]
            },
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
        name: 'Délai',
        color: TOOLBOX_COLORS.DELAY,
        blocks: ['AttendreS', 'AttendreMs']
    },
    {
        name: 'Variables',
        custom: 'VARIABLE',
        color: '%{BKY_VARIABLES_HUE}'
    },
    {
        name: 'Mathématiques',
        color: '%{BKY_MATH_HUE}',
        blocks: [
            {
                type: 'math_number',
                field: {
                    name: 'NUM',
                    text: 7
                }
            },
            'math_arithmetic',
            'MathSingle',
            'MathMax',
            //'math_trig',
            'MathMinMax',
            'MathConstants',
            'MathNumeroProprietes',
            'MathRound',
            'math_modulo'
        ]
    },
    {
        name: 'Fonctions',
        custom: 'PROCEDURE',
        color: '%{BKY_PROCEDURES_HUE}'
    },
    {
        name: 'Communication',
        color: TOOLBOX_COLORS.COMMUNICATION,
        blocks: [
            {
                type: 'EnvoyerMsg',
                value: [
                    {
                        name: 'direction',
                        block: {
                            type: 'Direction',
                            field: {
                                name: 'direction',
                                text: 'N'
                            }
                        }
                    }
                ]
            },
            {
                type: 'RecevoirMsg',
                value: [
                    {
                        name: 'direction',
                        block: {
                            type: 'Direction',
                            field: {
                                name: 'direction',
                                text: 'N'
                            }
                        }
                    }
                ]
            },
            /*'Direction',*/
            'Nord',
            'Ouest',
            'Sud',
            'Est'
        ]
    }
];

/**
 * Methods to build a toolbox xml configuration from the javascript object
 */
const buildFunctions = {
    children: p =>
        _(p)
            .map((v, k) => {
                if (!buildFunctions[k]) return null;
                if (!Array.isArray(v)) v = [v];
                return v.map(e => buildFunctions[k](e));
            })
            .values()
            .filter(v => v)
            .join(''),

    text: v => v,
    field: v =>
        `<field name="${v.name}">${buildFunctions.children(v)}</field>\n`,
    mutation: v => `<mutation ${v.name}="${v.value}"></mutation>\n`,
    value: v =>
        `<value name="${v.name}">${buildFunctions.children(v)}</value>\n`,
    block: b => {
        if (typeof b == 'string') return `<block type="${b}"></block>\n`;
        else
            return `<block type="${b.type}">
                ${buildFunctions.children(b)}
              </block>\n`;
    },
    category: c => `<category name="${c.name}"
                          ${c.custom ? 'custom="' + c.custom + '"' : ''}
                          colour="${c.color}">
                            ${
                                c.blocks
                                    ? c.blocks.map(buildFunctions.block)
                                    : ''
                            }
                  </category>`,
    toolbox: categories => `<xml>
      ${categories.map(buildFunctions.category)}
    </xml>`
};

const toolbox = buildFunctions.toolbox(toolboxConfig);
export default toolbox;
