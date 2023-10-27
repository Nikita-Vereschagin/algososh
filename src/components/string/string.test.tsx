import { reverseFunc } from "./stringAlgo";

jest.setTimeout(10000)

describe.each([
    ['Работает с чётным количеством символов', '1234', '4321'],
    ['Работает с нечетным количеством символов', '12345', '54321'],
    ['Работает с одним символом', '1', '1'],
    ['Работает с пустой строкой', '', ''],
])('Проверка разворота строки', (name, input, expected) => {
    it(name, async () => {
    let output = ''
    const modArr = await reverseFunc(input, (el) => {})
    modArr.forEach(el => {
        output = output + el.letter
    })
    expect(output).toBe(expected)
    });
});

