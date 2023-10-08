import React, { FormEventHandler, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./queue-page.module.css"
import { useForm } from "../../hooks/useForm";
import { TSwap } from "../../types/types";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { addTimeOut } from "../../tools/tools";

export type TArr = TSwap | {number: undefined | number, state: undefined | ElementStates}

export const QueuePage: React.FC = () => {
  const [index, setIndex] = useState<{tail: number, head: number | null}>({tail: 0, head: null})
  const [canDel, setCanDel] = useState(true)
  let size = 7
  const { values, handleChange, setValues } = useForm({input: ''})
  const [flag, setFlag] = useState(false)
  const [output, setOutput] = useState<TArr[]>([...Array(size).fill({number: undefined, state: undefined})])

  const delEl = async() => {
    setFlag(true)
    let modifiedArray: TArr[] = output
    if (index.head !== null){
      if (modifiedArray[index.head+1].number === undefined){
        modifiedArray[index.head] = {number: Number(values.input), state: ElementStates.Changing}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        modifiedArray[index.head] = {number: undefined, state: undefined}
        setOutput([...modifiedArray])
        setCanDel(true)
      }else{
        modifiedArray[index.head] = {number: Number(values.input), state: ElementStates.Changing}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        modifiedArray[index.head] = {number: undefined, state: undefined}
        setIndex({...index, head: index.head + 1})
        setOutput([...modifiedArray])
      }
    }


    setFlag(false)
    modifiedArray = []
  }

  const submit: FormEventHandler = async(e) => {
    e.preventDefault()
    setFlag(true)
    let modifiedArray: TArr[] = output
    if (index.head === null){

      setCanDel(false)
      modifiedArray[index.tail] = {number: Number(values.input), state: ElementStates.Changing}
      setOutput([...modifiedArray])
      await addTimeOut(500)
      modifiedArray[index.tail] = {number: Number(values.input), state: ElementStates.Default}
      setIndex({head: 0, tail: index.tail+1})
      setOutput([...modifiedArray])
    }else{
      if (index.tail < output.length){
        setCanDel(false)
        modifiedArray[index.tail] = {number: Number(values.input), state: ElementStates.Changing}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        modifiedArray[index.tail] = {number: Number(values.input), state: ElementStates.Default}
        setIndex({...index, tail: index.tail+1})
        setOutput([...modifiedArray])
      } else{
        setCanDel(true)
      }
  
    }
    setFlag(false)
    setValues({input: ''})
    modifiedArray = []
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={style.box} onSubmit={submit}>
        <Input disabled={index.tail === output.length} max={4} maxLength={4} isLimitText={true} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button text="Добавить" isLoader={flag} type="submit" disabled={isNaN(Number(values.input)) || values.input === ''}/>
        <Button isLoader={flag} text="Удалить" type="button" disabled={canDel || index.tail === output.length} onClick={()=>delEl()}/>
        <Button text="Очистить" disabled={canDel || index.tail === output.length} style={{marginLeft: 80}} type="button"  onClick={()=>{setOutput([...Array(size).fill({number: undefined, state: undefined})]);setIndex({tail: 0, head: 0});setCanDel(true)}}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: TArr, i: number) => {return <Circle letter={el?.number?.toString()} tail={i + 1 === index.tail  && el.number ? "tail" : ""} head={i === index.head  ? "top" : ""} index={i} extraClass={style.margin} key={i} state={el?.state}/>})}
      </div>
    </SolutionLayout>
  );
};
