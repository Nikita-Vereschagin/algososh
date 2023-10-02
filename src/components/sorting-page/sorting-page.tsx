import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import style from "./sorting-page.module.css"
import { addTimeOut, swap } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { TSwap } from "../../types/types";

export const SortingPage: React.FC = () => {
  
  const [flag, setFlag] = useState(false)
  const [newArrFlag, setNewArrFlag] = useState(false)
  const [output, setOutput] = useState<TSwap[]>()
  const [sort, setSort] = useState('bubble')
  const [maxDisabled, setMaxDisabled] = useState(false)
  const [minDisabled, setMinDisabled] = useState(false)
  
  const randomArr = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setNewArrFlag(true)
    let modifiedArray: TSwap[] = []
    const length = Math.floor(Math.random() * 17) + 3
    const arr = [...Array.from({
      length: length
    }, () => Math.floor(Math.random() * 100))]
    for (let i=0; i < arr.length; i++){
      modifiedArray[i] = {
        number: arr[i],
        state: ElementStates.Default
      } 
    }
    setOutput([...modifiedArray])
    setNewArrFlag(false)
    setMaxDisabled(false)
    setMinDisabled(false)
  }

  const bubbleSort = async (arr: TSwap[] | undefined, type: string) => {
    if (arr === undefined){
      return
    }
    setFlag(true)
    
    let modifiedArray: TSwap[] = arr

    for (let i = 0; i < modifiedArray.length; i++) {
      for (let j = 0; j < modifiedArray.length - i - 1; j++) {
        if (type === 'max'){
          if (modifiedArray[j].number > modifiedArray[j + 1].number) {
            await addTimeOut(250)
            modifiedArray[j+1].state = ElementStates.Changing
            modifiedArray[j].state = ElementStates.Changing 
            setOutput([...modifiedArray])
            await addTimeOut(250)
            swap(modifiedArray,j,j+1)
            setOutput([...modifiedArray])
          }
        } else if (type === 'min'){
          if (modifiedArray[j].number < modifiedArray[j + 1].number) {
            await addTimeOut(250)
            modifiedArray[j+1].state = ElementStates.Changing
            modifiedArray[j].state = ElementStates.Changing 
            setOutput([...modifiedArray])
            await addTimeOut(250)
            swap(modifiedArray,j,j+1)
            setOutput([...modifiedArray])
          }
        }
        modifiedArray[modifiedArray.length - 1 - i].state = ElementStates.Modified
        setOutput([...modifiedArray])
        await addTimeOut(500)
      }
    }
    setFlag(false)
    modifiedArray = []
  }

  const selectSort = async(arr: TSwap[] | undefined, type: string) => { 
    if (arr === undefined){
      return
    }
    setFlag(true)
    
    let modifiedArray: TSwap[] = arr
      for(let i = 0; i < modifiedArray.length; i++) {
        let min = i;
        await addTimeOut(250)
        for(let j = i+1; j < modifiedArray.length; j++){
          if (type === 'max'){
            if(modifiedArray[j].number > modifiedArray[min].number) {
              min=j; 
            }
          } else if (type === 'min'){
            if(modifiedArray[j].number < modifiedArray[min].number) {
              min=j; 
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
        console.log(modifiedArray)
      }
      setFlag(false)
      modifiedArray = []
    } 
  return (
    <SolutionLayout title="Сортировка массива">
      <form onSubmit={randomArr}>
        <div className={style.box}>
          <div className={style.inputBox}>
            <RadioInput label="Выбор" name="radio" value="select" onClick={() => {setSort("select"); setOutput([])}}/>
            <RadioInput label="Пузырёк" name="radio" extraClass={style.m} value="bubble" onClick={() => {setSort("bubble"); setOutput([])}} defaultChecked/>
          </div>
          <div className={style.inputBox}>
            <Button isLoader={flag} disabled={maxDisabled || !output} sorting={Direction.Ascending} text="По возрастанию" type="button" style={{marginRight: 12}} onClick={() => {
              if(sort === 'bubble'){
                bubbleSort(output, 'max')
                setMaxDisabled(true)
                setMinDisabled(false)
                }else if(sort === 'select'){
                  selectSort(output,'max')
                  setMaxDisabled(true)
                  setMinDisabled(false)
                }}}/>
            <Button isLoader={flag} disabled={minDisabled || !output} sorting={Direction.Descending} text="По убыванию" type="button" onClick={() => {
              if(sort === 'bubble'){
                bubbleSort(output, 'min')
                setMinDisabled(true)
                setMaxDisabled(false)
              } 
              else if(sort === 'select'){
                selectSort(output,'min')
                setMinDisabled(true)
                setMaxDisabled(false)
              }}
              }/>
          </div>
          <Button isLoader={newArrFlag || flag} text="Новый массив" type="submit"/>
        </div>
        <div className={style.columnBox}>
          {output && output.map((el: TSwap ,i:number) => {return <Column state={el.state} index={el.number} key={i} extraClass={style.columnMargin}/>})}
        </div>
      </form>
    </SolutionLayout>
  );
};
