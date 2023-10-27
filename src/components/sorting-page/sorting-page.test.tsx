import { ElementStates } from "../../types/element-states";
import { sortBuble, sortSelect } from "./sortingAlgo";

jest.setTimeout(10000);

describe.each([
    ['пустого массива', [], []],
    ['массива из одного элемента', 
    [
        {number: 1, state: ElementStates.Default},
    ], 
    [
        {number: 1, state: ElementStates.Modified},
    ]
    ],
    ['массива из нескольких элементов', 
    [
        {number: 1, state: ElementStates.Default},
        {number: 5, state: ElementStates.Default},
        {number: 3, state: ElementStates.Default},
    ], 

    [
        {number: 1, state: ElementStates.Modified},
        {number: 3, state: ElementStates.Modified},
        {number: 5, state: ElementStates.Modified},
    ],
    ],
])('Работает сортировка', (name, input, expected) => {
    it(`выбором для ${name}`, async () => {
    const output = await sortSelect(input, 'min', (a) => {}, (a) => {});
    expect(output).toEqual(expected);
    });
    it(`пузырьком для ${name}`, async () => {
    const output = await sortBuble(input, 'min', (a) => {}, (a) => {});
    expect(output).toEqual(expected);
    });
});