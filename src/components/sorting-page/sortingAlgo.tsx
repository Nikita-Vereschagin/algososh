import { addTimeOut, swap } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { TSwap } from "../../types/types";

export const sortBuble = async(
    arr: TSwap[], 
    type: string, 
    setSelectedEl: (el: {i: undefined | number, j: undefined | number}) => void,
    setOutput: (output: TSwap[]) => void) => {
    
    let modifiedArray: TSwap[] = arr
    for (let i=0; i < arr.length; i++){
        modifiedArray[i] = {
        ...modifiedArray[i],
        state: ElementStates.Default
        } 
    }

    for (let i = 0; i < modifiedArray.length; i++) {
        for (let j = 0; j < modifiedArray.length - i - 1; j++) {
        setSelectedEl({i: j, j: j+1})
        await addTimeOut(250)
        if (type === 'min'){
            if (modifiedArray[j].number > modifiedArray[j + 1].number) {
            swap(modifiedArray,j,j+1)
            }
        } else if (type === 'max'){
            if (modifiedArray[j].number < modifiedArray[j + 1].number) {
            swap(modifiedArray,j,j+1)
            }
        }
        setOutput([...modifiedArray])
        await addTimeOut(500)
        }
        modifiedArray[modifiedArray.length - 1 - i].state = ElementStates.Modified
        setOutput([...modifiedArray])
        await addTimeOut(500)
    }
    setSelectedEl({i: undefined, j: undefined})

    return modifiedArray
}

export const sortSelect = async(
    arr: TSwap[], 
    type: string, 
    setSelectedEl: (el: {i: undefined | number, j: undefined | number}) => void,
    setOutput: (output: TSwap[]) => void) => { 
    let modifiedArray: TSwap[] = arr
    for (let i=0; i < arr.length; i++){
        modifiedArray[i] = {
        ...modifiedArray[i],
        state: ElementStates.Default
        } 
    }
    for(let i = 0; i < modifiedArray.length; i++) {
    setSelectedEl({i: i, j: undefined})
    let min = i;
    await addTimeOut(250)
    for(let j = i+1; j < modifiedArray.length; j++){
        setSelectedEl({i: i, j: j})
        if (type === 'max'){
        if(modifiedArray[j].number > modifiedArray[min].number) {
            min=j
        }
        } else if (type === 'min'){
        if(modifiedArray[j].number < modifiedArray[min].number) {
            min=j
        }
        }
        await addTimeOut(250) 
        }
        if (min === i) {
        modifiedArray[i].state = ElementStates.Modified;
    } else {
        swap(modifiedArray, min, i);
        modifiedArray[i].state = ElementStates.Modified;
    }
    await addTimeOut(250)
    setOutput([...modifiedArray])
    }
    setSelectedEl({i: undefined, j: undefined})
    return modifiedArray
} 