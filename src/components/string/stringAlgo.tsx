
import { ElementStates } from "../../types/element-states";
import { addTimeOut, swap } from "../../tools/tools";
import { TSwap } from "../../types/types";
export const reverseFunc = async (value: string, setOutput: (data: TSwap[]) => void) => {
    let modifiedArray: TSwap[] = []
    const len = value.length%2===0 ? Math.floor(value.length/2) : Math.floor(value.length/2+1)
    for (let i=0; i < value.length; i++){
        modifiedArray[i] = {
        number: i,
        letter: value[i],
        state: ElementStates.Default
        } 
    }
    setOutput(modifiedArray)
    for (let i=0; i < len; i++){
        modifiedArray[i].state = ElementStates.Changing
        modifiedArray[value.length-1-i].state = ElementStates.Changing
        await addTimeOut(1000)
        setOutput([...modifiedArray])
        await addTimeOut(1000)
        modifiedArray = swap(modifiedArray,i,value.length-1-i)
        modifiedArray[i].state = ElementStates.Modified
        modifiedArray[value.length-1-i].state = ElementStates.Modified 
        setOutput([...modifiedArray])
    }
    return modifiedArray
};
