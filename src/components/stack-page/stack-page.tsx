import React, { FormEventHandler, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./stack-page.module.css"
import { useForm } from "../../hooks/useForm";
import { TSwap } from "../../types/types";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { addTimeOut } from "../../tools/tools";


export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({input: ''})
  const [flag, setFlag] = useState(false)
  const [output, setOutput] = useState<TSwap[]>()

  const popEl = async() => {
    if (!output){
      return
    }
    setFlag(true)
    let modifiedArray: TSwap[] = output
    await addTimeOut(250)
    modifiedArray[modifiedArray.length-1].state = ElementStates.Changing
    setOutput([...modifiedArray])
    await addTimeOut(250)
    modifiedArray.length = modifiedArray.length - 1
    setOutput([...modifiedArray])
    setFlag(false)
    modifiedArray = []
  }

  const submit: FormEventHandler = async(e) => {
    e.preventDefault();
    setFlag(true)
    let modifiedArray: TSwap[]
    if (output){
      let modifiedArray = output
      modifiedArray.push({number: Number(values.input), state: ElementStates.Changing})
      console.log(output)
      setOutput([...modifiedArray])
      await addTimeOut(500)
      modifiedArray[modifiedArray.length-1].state = ElementStates.Default
      setOutput([...modifiedArray])
      await addTimeOut(500)
    } else {
      setOutput([{number: Number(values.input), state: ElementStates.Changing}])
      await addTimeOut(500)
      setOutput([{number: Number(values.input), state: ElementStates.Default}])
    }
    setFlag(false)
    setValues({input: ''})
    modifiedArray = []
  };
  return (
    <SolutionLayout title="Стек">
      <form className={style.box} onSubmit={submit}>
        <Input max={4} maxLength={4} isLimitText={true} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button text="Добавить" isLoader={flag} type="submit" disabled={isNaN(Number(values.input)) || values.input === '' ? true : false}/>
        <Button isLoader={flag} text="Удалить" type="button" disabled={output?.length === 0 || output === undefined} onClick={()=>popEl()}/>
        <Button text="Очистить" style={{marginLeft: 80}} type="button" disabled={output?.length === 0 || output === undefined} onClick={()=>setOutput(undefined)}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: TSwap, i: number) => {return <Circle letter={el.number.toString()} head={i === output.length - 1 ? "top" : ""} extraClass={style.margin} key={i} state={el.state}/>})}
      </div>
    </SolutionLayout>
  );
};
