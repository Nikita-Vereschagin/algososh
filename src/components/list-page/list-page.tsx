import React, { FormEventHandler, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css"
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { addTimeOut } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ListLogic } from "./list-logic";

type TLoader = 'delT' | 'addT' | 'delH' | 'addH' | 'delI' | 'addI'

export const ListPage: React.FC = () => {
  const [list,] = useState(() => new ListLogic());
  const { values, handleChange, setValues } = useForm({ input: '', index: '' })
  const [loader, setLoader] = useState<TLoader>()
  const [selectedEl, setSelectedEl] = useState<{del: number | undefined, add: number | undefined, value: string | undefined}>({del: undefined, add: undefined,value: undefined})
  const [index, setIndex] = useState<number>()
  const output = useMemo(() => {return list.getArray()}, [list.getArray()])

  const delHelper = async (i: number, f: TLoader) => {
    setLoader(f)
    if (i === output.length-1 || i === 0){
        setSelectedEl({del: i, add: undefined, value: output[i]})
        await addTimeOut(500)
        output[i] = ''
        await addTimeOut(500)
        list.delHelper(i)
    }else{
        for (let j=0; j <= i; j++){
            setIndex(j)
            await addTimeOut(500)
            if (j===i){
                setSelectedEl({del: i, add: undefined, value: output[i]})
                await addTimeOut(500)
                output[i] = ''
                await addTimeOut(500)
                list.delHelper(i)
            }
        }
    }
    setLoader(undefined)
    setIndex(undefined)
    setSelectedEl({del: undefined, add: undefined, value: undefined})
    setValues({ input: '', index: '' })
  }

  const addHelper = async (i: number, f: TLoader) => {
    setLoader(f)
    if (i === output.length-1 || i === 0){
        setSelectedEl({add: i, del: undefined, value: values.input})
        await addTimeOut(500)
        setSelectedEl({add: i, del: undefined, value: values.input})
        await addTimeOut(500)
        list.addHelper(i,values.input)
    }else{
        for (let j=0; j <= i; j++){
            setIndex(j)
            await addTimeOut(500)
            if (j===i){
                setSelectedEl({add: i, del: undefined, value: values.input})
                await addTimeOut(500)
                setSelectedEl({add: i, del: undefined, value: values.input})
                await addTimeOut(500)
                list.addHelper(i,values.input)
            }
        }
    }
    setLoader(undefined)
    setIndex(undefined)
    setSelectedEl({add: undefined, del: undefined, value: undefined})
    setValues({ input: '', index: '' })
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={style.box}>
        <Input max={4} 
               maxLength={4} 
               isLimitText={true} 
               name="input" 
               type='string'
               disabled={loader !== undefined} 
               value={values.input} 
               onChange={handleChange} />
        <Button text="Добавить в head" 
                isLoader={loader === 'addH'} 
                onClick={() => addHelper(0,'addH')} 
                type="button" 
                disabled={values.input === '' || loader !== undefined} />
        <Button text="Добавить в tail" 
                isLoader={loader === 'addT'} 
                onClick={() => addHelper(output.length-1, 'addT')} 
                type="button" 
                disabled={values.input === '' || loader !== undefined} />
        <Button isLoader={loader === 'delH'} 
                text="Удалить из head" 
                type="button" 
                disabled={output.length === 0 || loader !== undefined} 
                onClick={() => delHelper(0, 'delH')} />
        <Button isLoader={loader === 'delT'} 
                text="Удалить из tail" 
                type="button" 
                disabled={output.length === 0 || loader !== undefined} 
                onClick={() => delHelper(output.length-1, 'delT')} />
      </form>
      <form className={style.secBox}>
        <Input max={output.length - 1 === -1 ? 0 : output.length - 1} 
               name="index" 
               disabled={loader !== undefined} 
               type='number' 
               value={values.index} 
               onChange={handleChange} />
        <Button text="Добавить по индексу" 
                isLoader={loader === 'addI'} 
                type="button" 
                disabled={values.input === '' || values.index === '' || Number(values.index) > output.length|| loader !== undefined}
                onClick={() => addHelper(Number(values.index), 'addI')} />
        <Button isLoader={loader === 'delI'} 
                text="Удалить по индексу" 
                type="button" 
                disabled={output.length === 0 || values.index === '' || Number(values.index) > output.length || loader !== undefined} 
                onClick={() => delHelper(Number(values.index), 'delI')} />
      </form>
      <div className={style.circles}>
        {output?.map((el: string, i: number) => {
          {
            if (i !== output.length - 1) {
              return <div className={style.arrowBox} key={i}>
                <Circle letter={el} 
                        tail={(selectedEl.del === i && selectedEl.value !== undefined) ? 
                        <Circle letter={selectedEl.value} state={ElementStates.Changing} /> 
                            : 
                        i === output.length-1 ? 'tail' : null} 
                        head={(selectedEl.add === i && selectedEl.value !== undefined)  ? 
                        <Circle isSmall={true} letter={selectedEl.value} state={ElementStates.Changing} /> 
                            : 
                        i === 0  ? 'head' : null} 
                        index={i} 
                        extraClass={style.margin} 
                        state={(index !== undefined && i <= index) ? 
                        ElementStates.Changing : selectedEl.del === i || selectedEl.add === i ?
                        ElementStates.Modified : ElementStates.Default} />
                <ArrowIcon />
              </div>
            }
            else if (i === output.length - 1) {
                return <Circle key={i} 
                               letter={el} 
                               tail={(selectedEl.del === i && selectedEl.value !== undefined) ? 
                                <Circle letter={selectedEl.value} 
                                        state={ElementStates.Changing} /> 
                                    : 
                                    i === output.length-1 ? 'tail' : null} 
                                head={(selectedEl.add === i && selectedEl.value !== undefined) ? 
                                    <Circle isSmall={true} 
                                    letter={selectedEl.value} 
                                    state={ElementStates.Changing} /> 
                                        : 
                                    i === 0  ? 'head' : null} 
                                    index={i} 
                                    extraClass={style.margin} 
                                    state={(index !== undefined && i <= index) ? 
                                        ElementStates.Changing : selectedEl.del === i || selectedEl.add === i ?
                                        ElementStates.Modified : ElementStates.Default} />
            }
          }
        })}
      </div>
    </SolutionLayout>
  );
};
