import React, { FormEventHandler, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./stack-page.module.css"
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { addTimeOut } from "../../tools/tools";
import { StackLogic } from "./stack-logic";


export const StackPage: React.FC = () => {
  const [stack,] = useState(() => new StackLogic());
  const { values, handleChange, setValues } = useForm({input: ''})
  const [loader, setLoader] = useState<'push' | 'pop' | 'clear'>()
  const [selectedEl, setSelectedEl] = useState<number>()

  const output = useMemo(() => {return stack.getArray()}, [stack.getArray()])

  const pop = async() => {
    if (output){
      setLoader('pop')
      setSelectedEl(output.length-1)
      await addTimeOut(250)
      stack.pop()
      setSelectedEl(undefined)
      setLoader(undefined)
    }
  }

  const clear = async() => {
    setLoader('clear')
    stack.clear()
    await addTimeOut(500)
    setLoader(undefined)
  }

  const push: FormEventHandler = async(e) => {
    e.preventDefault();
    if (output){
      setLoader('push')
      stack.push(values.input)
      setSelectedEl(output.length-1)
      await addTimeOut(250)
      setSelectedEl(undefined)
      setLoader(undefined)
      setValues({input: ''})
    }
  };
  return (
    <SolutionLayout title="Стек">
      <form className={style.box} onSubmit={push}>
        <Input max={4} 
               maxLength={4} 
               isLimitText={true} 
               name="input" 
               type='string' 
               value={values.input} 
               onChange={handleChange}
               disabled={loader !== undefined}/>
        <Button text="Добавить" 
                isLoader={loader === 'push'} 
                type="submit" 
                disabled={values.input === '' || loader === 'pop' || loader === 'clear'}/>
        <Button text="Удалить" 
                isLoader={loader === 'pop'}
                type="button" 
                disabled={output.length === 0 || loader === 'push' || loader === 'clear'} 
                onClick={()=>pop()}/>
        <Button text="Очистить" 
                isLoader={loader === 'clear'} 
                type="button" 
                disabled={output.length === 0 || loader === 'push' || loader === 'pop'} 
                onClick={()=>clear()}
                style={{marginLeft: 80}} />
      </form>
      <div className={style.circles}>
        {output?.map((el: string, i: number) => {
          return <Circle letter={el} 
                         head={i === output.length - 1 ? "top" : ""} 
                         extraClass={style.margin} 
                         key={i} 
                         state={selectedEl === i ? ElementStates.Changing : ElementStates.Default}/>})}
      </div>
    </SolutionLayout>
  );
};
