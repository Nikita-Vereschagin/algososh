import React, { FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./fibonacci-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { addTimeOut } from "../../tools/tools";
export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({input: ''})
  const [flag, setFlag] = useState(false)
  const [output, setOutput] = useState<string[]>()

  const fib = async(n: string) => {
    //переводим строку в число
    let number = parseInt(n) +2
    let modifiedArray: string[] = []
    var val = [0, 1]; 
    if (number === 1){
      let arr = []
      arr.push('1')
      setOutput([...arr])
      await addTimeOut(500)
      arr.push('1')
      setOutput([...arr])
    }else {
      modifiedArray.push('1')
      setOutput([...modifiedArray])
      await addTimeOut(500)
      for (let i=2; i < number; i++){
        await addTimeOut(500)
        //формула последовательности фибоначчи
        val[i] = val[i - 2] + val[i - 1];
        modifiedArray.push(val[i].toString())
        setOutput([...modifiedArray])
      }
    }
    //возвращаем все сонстанты и флаги в исходное положение 
    setFlag(false)
    modifiedArray = []
    setValues({input: ''})
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    fib(values.input)
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.box} onSubmit={submit}>
        <Input max={21} maxLength={2} isLimitText={parseInt(values.input) > 20 ? true : false} name="input" type={typeof values.input} value={values.input} onChange={handleChange}/>
        <Button isLoader={flag} text="Рассчитать" type="submit" disabled={parseInt(values.input) < 0 ||  parseInt(values.input) > 20? true : false}/>
      </form>
      <div className={style.circles}>
        {output && output?.map((el: string, i: number) => {return <Circle letter={el} extraClass={style.margin} key={i} index={i}/>})}
      </div>
    </SolutionLayout>
  );
};
