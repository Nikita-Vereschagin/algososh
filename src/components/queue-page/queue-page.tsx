import React, { FormEventHandler, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./queue-page.module.css"
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { addTimeOut } from "../../tools/tools";
import { QueueLogic } from "./queue-logic";

export const QueuePage: React.FC = () => {
  const [queue,] = useState(() => new QueueLogic(7));
  const { values, handleChange, setValues } = useForm({input: ''})
  const [loader, setLoader] = useState<'enqueue' | 'dequeue' | 'clear'>()
  const [selectedEl, setSelectedEl] = useState<number>()

  const output = useMemo(() => {return queue.getArray()}, [queue.getArray(), loader])
  const {head, tail} = useMemo(() => {return queue.getIndex()}, [queue.getIndex()])
  const dequeue = async() => {
    setLoader('dequeue')
    setSelectedEl(head)
    await addTimeOut(500)
    queue.dequeue()
    setSelectedEl(undefined)
    setLoader(undefined)
  }
  const clear = async() => {
    setLoader('clear')
    queue.clear()
    await addTimeOut(500)
    setLoader(undefined)
  }

  const enqueue: FormEventHandler = async(e) => {
    e.preventDefault()
    setLoader('enqueue')
    setSelectedEl(tail)
    await addTimeOut(500)
    queue.enqueue(values.input)
    setSelectedEl(undefined)
    setLoader(undefined)
    setValues({input: ''})
  };
  return (
    <SolutionLayout title="Очередь">
      <form className={style.box} onSubmit={enqueue}>
      <Input max={4} 
               maxLength={4} 
               isLimitText={true} 
               name="input" 
               type='string' 
               value={values.input} 
               onChange={handleChange}
               disabled={loader !== undefined}/>
        <Button text="Добавить" 
                isLoader={loader === 'enqueue'} 
                type="submit" 
                disabled={values.input === '' || loader === 'dequeue' || loader === 'clear'}/>
        <Button text="Удалить" 
                isLoader={loader === 'dequeue'}
                type="button" 
                disabled={output[head] === '' || output[tail-1] === '' || loader === 'enqueue' || loader === 'clear'} 
                onClick={()=>dequeue()}/>
        <Button text="Очистить" 
                isLoader={loader === 'clear'} 
                type="button" 
                disabled={output[head] === '' || output[tail-1] === '' || loader === 'enqueue' || loader === 'dequeue'} 
                onClick={()=>{clear()}}
                style={{marginLeft: 80}} />
        </form>
      <div className={style.circles}>
        {output.map((el: string, i: number) => {
          return <Circle letter={el} 
                         tail={i + 1 === tail && output[tail-1] !== '' ? "tail" : ""} 
                         head={i === head && output[head] !== '' ? "top" : ""} 
                         index={i} 
                         extraClass={style.margin} 
                         key={i} 
                         state={selectedEl === i ? ElementStates.Changing : ElementStates.Default}/>})
                         }
      </div>
    </SolutionLayout>
  );
};
