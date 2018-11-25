export const COLOR_TO_LETTER = {
    '#A2142F': 'R',
    '#0072BD': 'B',
    '#D95319': 'O',
    '#EDB120': 'Y',
    '#7E2F8E': 'P',
    '#77AC30': 'G',
    '#4DBEEE': 'C',
    '#000000': '.'
};

export const COLUMNS = 10,
    LINES = 10;
export const COLORS = _.map(COLOR_TO_LETTER, (v, k) => k);
export const LETTER_TO_COLOR = _.reduce(
    COLOR_TO_LETTER,
    (acc, v, k) => {
        acc[v] = k;
        return acc;
    },
    {}
);

export const TOOLBOX_COLORS = {
    DISPLAY: '#1e90ff',
    INPUT: '#d400d4',
    LOGIC: '#00a4a6',
    LOOPS: '#00aa00',
    DELAY: '#5c2d91',
    VARIABLES: '#dc143c',
    FONCTIONS: '#3455db',
    MATH: '#9400d3'
};
