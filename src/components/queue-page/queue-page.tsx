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

type TArr = TSwap | {number: undefined, state: undefined}

export const QueuePage: React.FC = () => {
  let tail: number | null = null
  let head: number | null = null
  let size = 7
  const { values, handleChange, setValues } = useForm({input: ''})
  const [flag, setFlag] = useState(false)
  const [output, setOutput] = useState<TArr[]>([...Array(size).fill({number: undefined, state: undefined})])

  const delEl = async() => {
    setFlag(true)
    let modifiedArray: TArr[] = output
    if (head !== null && modifiedArray[head].number &&  modifiedArray[head].state && head < modifiedArray.length) {
      modifiedArray[head] = {number: undefined, state: undefined}
      if (head === modifiedArray.length - 1 || head === tail) tail = null
      head < modifiedArray.length - 1 && head++
    }
    setFlag(false)
    modifiedArray = []
  }

  const submit: FormEventHandler = async(e) => {
    e.preventDefault()
    let modifiedArray: TArr[] = output
    setFlag(true)
    if (head === null && tail === null) {
      head = 0
      tail = 0
    }
    if (tail !== null && head !== null && tail < modifiedArray.length -1) {
        tail++
        modifiedArray[tail] = {number: Number(values.input), state: ElementStates.Changing}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        modifiedArray[tail].state = ElementStates.Default
        setOutput([...modifiedArray])
      } else if (tail === null && head !== null && head > 0 && head !== modifiedArray.length - 1) {
        modifiedArray[head] = {number: Number(values.input), state: ElementStates.Changing}
        setOutput([...modifiedArray])
        await addTimeOut(500)
        modifiedArray[head].state = ElementStates.Default
        setOutput([...modifiedArray])
        tail = head
        
      }
    setFlag(false)
    setValues({input: ''})
    modifiedArray = []
  };
  console.log(head, tail)
  return (
    <SolutionLayout title="Очередь">
      <form className={style.box} onSubmit={submit}>
        <Input max={4} maxLength={4} isLimitText={true} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button text="Добавить" isLoader={flag} type="submit" disabled={isNaN(Number(values.input)) || values.input === '' ? true : false}/>
        <Button isLoader={flag} text="Удалить" type="button" disabled={output?.length === 0 || output === undefined} onClick={()=>delEl()}/>
        <Button text="Очистить" style={{marginLeft: 80}} type="button" disabled={output?.length === 0 || output === undefined} onClick={()=>setOutput([...Array(size).fill({number: undefined, state: undefined})])}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: TArr, i: number) => {return <Circle letter={el?.number?.toString()} tail={i === tail ? "tail" : ""} head={i === head ? "top" : ""} extraClass={style.margin} key={i} state={el?.state}/>})}
      </div>
    </SolutionLayout>
  );
};
