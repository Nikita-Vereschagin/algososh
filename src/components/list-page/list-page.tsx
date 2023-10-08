import React, { FormEventHandler, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css"
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { TArr } from "../queue-page/queue-page";
import { addTimeOut } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TModArr = TArr & {
  changingIndex: number | undefined,
  place: 'head' | 'tail' | undefined
}

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({input: '', index: ''})

  const [flag, setFlag] = useState([false,false,false,false,false,false])
  const [output, setOutput] = useState<TModArr[]>([])

  useEffect(() => {
    let modifiedArray: TModArr[] = []
    const arr = [...Array.from({
      length: 4
    }, () => Math.floor(Math.random() * 100))]
    for (let i=0; i < arr.length; i++){
      modifiedArray[i] = {
        number: arr[i],
        state: ElementStates.Default,
        changingIndex: undefined,
        place: undefined
      } 
    }
    setOutput([...modifiedArray])
  },[])

  const delEl = async(i: number | null, f: number) => {
    if (i === null){
      return
    }
    let modFlag = flag
    modFlag[f] = true
    setFlag([...modFlag])
    let modifiedArray: TModArr[] = output

    if (i === 0){
      const num = modifiedArray[i].number
      modifiedArray[i] = {number: undefined, state: ElementStates.Modified, changingIndex: num, place: 'tail'}
      setOutput([...modifiedArray])

      await addTimeOut(500)

      modifiedArray[i] = {number: undefined, state: ElementStates.Default, changingIndex: undefined, place: undefined}
      modifiedArray.shift()
      setOutput([...modifiedArray])

    }else if (i === output.length - 1){
      const num = modifiedArray[i].number
      modifiedArray[i] = {number: undefined, state: ElementStates.Modified, changingIndex: num, place: 'tail'}
      setOutput([...modifiedArray])

      await addTimeOut(500)

      modifiedArray[i] = {number: undefined, state: ElementStates.Default, changingIndex: undefined, place: undefined}
      modifiedArray.pop()
      setOutput([...modifiedArray])

    } else  {
      for (let j=0; j <= i;j++){
        let num = modifiedArray[j].number
        modifiedArray[j] = {number: num, state: ElementStates.Changing, changingIndex: undefined, place: undefined}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        if (j===i){
          const num = modifiedArray[i].number
          modifiedArray[i] = {number: undefined, state: ElementStates.Modified, changingIndex: num, place: 'tail'}
          setOutput([...modifiedArray])
  
          await addTimeOut(500)
  
          modifiedArray[i] = {number: undefined, state: ElementStates.Default, changingIndex: undefined, place: undefined}
          modifiedArray.splice(i,1)
          modifiedArray = [...modifiedArray.map((item) => item.state === ElementStates.Changing ? {...item, state: ElementStates.Default} : item)]
          setOutput([...modifiedArray])
        }
      }
    }


    modFlag[f] = false
    setFlag([...modFlag])
    modifiedArray = []
    setValues({...values, index: ''})
  }

  const indexSubmit = async(e: React.FormEvent<HTMLFormElement>, i: number | null) => {
    e.preventDefault()
    addHelper(i,4)
    setValues({input: '', index: ''})
  };

  const addHelper = async(i: number | null, f: number) => {
    if (i === null){
      return
    }
    
    let modFlag = flag
    modFlag[f] = true
    setFlag([...modFlag])
    let modifiedArray: TModArr[] = output

    if (i !== output.length && i !== 0){
      for (let j=0; j <= i;j++){
        let num = modifiedArray[j].number
        modifiedArray[j] = {number: num, state: ElementStates.Changing, changingIndex: undefined, place: undefined}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        if (j===i){
          modifiedArray.splice(i, 0, {number: undefined, state: ElementStates.Modified, changingIndex: Number(values.input), place: 'head'})
          setOutput([...modifiedArray])
      
          await addTimeOut(500)
      
          modifiedArray = [...modifiedArray.map((item) => item.state === ElementStates.Changing ? {...item, state: ElementStates.Default} : item)]
          modifiedArray[i] = {number: Number(values.input), state: ElementStates.Default, changingIndex: undefined, place: undefined}
          setOutput([...modifiedArray])
        }
      }
    }else {

    modifiedArray.splice(i, 0, {number: undefined, state: ElementStates.Modified, changingIndex: Number(values.input), place: 'head'})
    setOutput([...modifiedArray])

    await addTimeOut(500)

    modifiedArray[i] = {number: Number(values.input), state: ElementStates.Default, changingIndex: undefined, place: undefined}
    setOutput([...modifiedArray])
  }

    modFlag[f] = false 
    setFlag([...modFlag])
    modifiedArray = []
  };

  const addEl = async(i: number | null, f: number) => {
    addHelper(i,f)
    setValues({...values, input: ''})
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={style.box}>
        <Input max={4} maxLength={4} isLimitText={true} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button text="Добавить в head" isLoader={flag && flag[0]} onClick={()=>addEl(0, 0)}  type="button" disabled={isNaN(Number(values.input)) || values.input === ''}/>
        <Button text="Добавить в tail" isLoader={flag && flag[1]} onClick={()=>addEl(output.length, 1)} type="button" disabled={isNaN(Number(values.input)) || values.input === '' || output.length - 1 < 0}/>
        <Button isLoader={flag && flag[2]} text="Удалить из head" type="button" disabled={!(output.length > 0)} onClick={()=>delEl(0, 2)}/>
        <Button isLoader={flag && flag[3]} text="Удалить из tail" type="button" disabled={!(output.length > 0)} onClick={()=>delEl(output.length - 1, 3)}/>
      </form>
      <form className={style.secBox} onSubmit={(e) => indexSubmit(e, Number(values.index))}>
        <Input max={output.length - 1 === -1 ? 0 : output.length - 1 } name="index" disabled={!(output.length > 0)} type='number' value={values.index} onChange={handleChange}/>
        <Button text="Добавить по индексу" isLoader={flag && flag[4]} type="submit" disabled={values.index === '' || values.input === ''}/>
        <Button isLoader={flag && flag[5]} text="Удалить по индексу" type="button" disabled={!(output.length > 0) || values.index === ''} onClick={()=>delEl(Number(values.index), 5)}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: TModArr, i: number) => {
          {
          if (el.number === undefined && el.state === undefined){
            return null
          }else if (i !== output.length - 1){ 
          return <div className={style.arrowBox} key={i}>
            {el.changingIndex !== undefined ? 
              <Circle letter={el?.number?.toString()} tail={el.place === 'tail' ? <Circle letter={el.changingIndex.toString()}state={ElementStates.Changing}/>: null} head={el.place === 'head' ? <Circle isSmall={true} letter={el.changingIndex.toString()}state={ElementStates.Changing}/> : null} index={i} extraClass={style.margin}  state={el?.state}/>
            :
              <Circle letter={el?.number?.toString()} head={i === 0  ? "top" : ""} index={i} extraClass={style.margin}  state={el?.state}/>
            }
              <ArrowIcon/>
            </div>
          }
          else if (i === output.length - 1){
            if (el.changingIndex !== undefined) {
              return <Circle key={i} letter={el?.number?.toString()} tail={el.place === 'tail' ? <Circle letter={el.changingIndex.toString()}state={ElementStates.Changing}/>: null} head={el.place === 'head' ? <Circle isSmall={true} letter={el.changingIndex.toString()}state={ElementStates.Changing}/> : null} index={i} extraClass={style.margin}  state={el?.state}/>
            } else {
              return <Circle key={i} letter={el?.number?.toString()} head={i === 0  ? "top" : ""} tail={"tail"} index={i} extraClass={style.margin} state={el?.state}/>
            }

            }
          }
          })}
      </div>
    </SolutionLayout>
  );
};
