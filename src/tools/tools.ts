//Функция промежутка между перебором елементов

import { TSwap } from "../types/types";

export const addTimeOut = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Функция перемещения элемента с индексом i с элементом с индексом j

export const swap = (arr: TSwap[] , i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr
}