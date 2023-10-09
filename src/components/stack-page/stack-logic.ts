import { TStack } from "../../types/types"

export class StackLogic implements TStack {
    head: number
    arr: string[]
  
    constructor() {
        this.head = 0
        this.arr = []
    }
    push(el: string) {
      this.arr.push(el)
      this.head++
    }
    pop() {
      this.arr.pop()
    }
    clear() {
      this.arr = []
    }
    getArray = () => {
      return this.arr
    }
  }