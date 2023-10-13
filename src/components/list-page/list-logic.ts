import { TList } from "../../types/types"

export class ListLogic implements TList {
    arr: string[]
    constructor() {
        this.arr = [...Array.from({
            length: 4
          }, () => Math.floor(Math.random() * 100).toString())]
      }
      addHelper(i: number, el: string) {
        this.arr.splice(i, 0, el)
      }
      delHelper(i: number){
        if (i === 0){
            this.arr.shift()
        }else if (i === this.arr.length-1){
            this.arr.pop()
        }else{
            this.arr.splice(i, 1)
        }
      }
      getArray() {
        return this.arr
      }
  }
