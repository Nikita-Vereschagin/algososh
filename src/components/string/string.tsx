import React, { FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./string.module.css";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { addTimeOut, swap } from "../../tools/tools";
import { TSwap } from "../../types/types";
export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({input: ''})
  const [flag, setFlag] = useState(false)
  const [output, setOutput] = useState<TSwap[]>()




  const reverse = async(value: string[]) => {
    setFlag(true)
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
    setFlag(false)
    modifiedArray = []
    setValues({input: ''})
  }
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    reverse(values.input.split(''))
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.box} onSubmit={submit}>
        <Input max={11} maxLength={20} isLimitText={values.input.length > 11 ? true : false} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button isLoader={flag} text="Развернуть" type="submit" disabled={values.input.length < 2 ? true : false}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: TSwap, i: number) => {return <Circle letter={el.letter} extraClass={style.margin} key={i} state={el.state}/>})}
      </div>
    </SolutionLayout>
    );
};
