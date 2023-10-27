import React, { useEffect, useMemo, useState } from "react";
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
  
  const [loader, setLoader] = useState<'increase' | 'decrease' | 'newArr'>()
  const [sort, setSort] = useState<'bubble' | 'select'>('bubble')
  const [output, setOutput] = useState<TSwap[]>([])
  const [selectedEl, setSelectedEl] = useState<{i: undefined | number, j: undefined | number}>({i: undefined, j: undefined})
  
  const randomArr = () => {
    setLoader('newArr')
    let modifiedArray: TSwap[] = []
    const arr = [...Array.from({
      length: Math.floor(Math.random() * 17) + 3
    }, () => Math.floor(Math.random() * 100))]
    for (let i=0; i < arr.length; i++){
      modifiedArray[i] = {
        number: arr[i],
        state: ElementStates.Default
      } 
    }
    setOutput([...modifiedArray])
    setLoader(undefined)
  }

  useEffect(() => {
    randomArr()
  },[])

  const bubbleSort = async (arr: TSwap[] | undefined, type: string) => {
    if (arr !== undefined){
    
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
          setLoader('increase')
          if (modifiedArray[j].number > modifiedArray[j + 1].number) {
            swap(modifiedArray,j,j+1)
          }
        } else if (type === 'max'){
          setLoader('decrease')
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
    setLoader(undefined)
    modifiedArray = []
  }
  }

  const selectSort = async(arr: TSwap[] | undefined, type: string) => { 
    if (arr !== undefined){
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
            setLoader('increase')
            if(modifiedArray[j].number > modifiedArray[min].number) {
              min=j
            }
          } else if (type === 'min'){
            setLoader('decrease')
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
      setLoader(undefined)
      modifiedArray = []
    }
    } 
  return (
    <SolutionLayout title="Сортировка массива">
      <form>
        <div className={style.box}>
          <div className={style.inputBox}>
            <RadioInput label="Выбор" name="radio" value="select" onClick={() => {setSort('bubble')}}/>
            <RadioInput label="Пузырёк" name="radio" extraClass={style.m} value="bubble" onClick={() => {setSort('select')}} defaultChecked/>
          </div>
          <div className={style.inputBox}>
            <Button isLoader={loader === 'increase'} disabled={loader === 'decrease' || loader === 'newArr' || !output} sorting={Direction.Ascending} text="По возрастанию" type="button" style={{marginRight: 12}} onClick={() => {
              if(sort === 'bubble'){
                bubbleSort(output, 'max')
                }else if(sort === 'select'){
                  selectSort(output,'max')
                }}}/>
            <Button isLoader={loader === 'decrease'} disabled={loader === 'increase' || loader === 'newArr' || !output} sorting={Direction.Descending} text="По убыванию" type="button" onClick={() => {
              if(sort === 'bubble'){
                bubbleSort(output, 'min')
              } 
              else if(sort === 'select'){
                selectSort(output,'min')
              }}
              }/>
          </div>
          <Button isLoader={loader === 'newArr'} disabled={loader === 'increase' || loader === 'decrease'} text="Новый массив" type="button" onClick={() =>randomArr()}/>
        </div>
        <div className={style.columnBox}>
          {output && output.map((el: TSwap ,i:number) => {return <Column state={selectedEl.i === i || selectedEl.j === i ? ElementStates.Changing : el.state} index={el.number} key={i} extraClass={style.columnMargin}/>})}
        </div>
      </form>
    </SolutionLayout>
  );
};
