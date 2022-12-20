export const add = (a, b) => {
    return a + b;
};


/**
 * @param  {string} str
 */
export const mapStrTo7Led = (str) => {
    //      1
    //     ---
    //  6 |   | 2
    //     -7-
    //  5 |   | 3
    //     ---
    //      4
    const cases = {
        ['0']: 123456,
        ['1']: 23,
        ['2']: 12457,
        ['3']: 12347,
        ['4']: 2367,
        ['5']: 13467,
        ['6']: 134567,
        ['7']: 123,
        ['8']: 1234567,
        ['9']: 123467,
        ['-']: 7,
        ['_']: 4,
        ['t']: 4567,
        ['U']: 23456,
        ['P']: 12567,
        [' ']: null
    };
    return cases[str];
};

/**
 * @param  {string} numStr
 */
export const showNumber = (numStr) => {
    if (numStr.length < 4) throw ('必須要有四個字元');
    return numStr.split('').map((item) => {
        return mapStrTo7Led(item);
    });
};


export async function startPrompt(board, callback) {
    const response = await prompts([
        {
            type: 'number',
            name: 'number',
            message: '要顯示的數字?',
            onState: (state) => {
                // do state on board?
            }
        }
    ], { onSubmit: callback });
}
