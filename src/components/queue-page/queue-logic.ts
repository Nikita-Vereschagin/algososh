import { TQueue } from "../../types/types"

export class QueueLogic implements TQueue {
    tail: number
    head: number
    arr: string[]
    constructor(len: number) {
        this.arr = new Array(len).fill('')
        this.head = 0
        this.tail = 0
      }
      enqueue(el: string) {
        this.arr[this.tail] = el
        this.tail++
      }
      dequeue() {
        const el = this.arr[this.head]
        this.arr[this.head] = ''
        this.head++
        if (this.arr[this.head] === '' && this.arr[this.tail-1] === ''){
            this.head = 0
            this.tail = 0
        }
        return el
      }
      clear() {
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i] = ''
          }
          this.head = 0
          this.tail = 0
      }
      getArray() {
        return this.arr
      }
      getIndex() {
          return {
            head: this.head,
            tail: this.tail
          }
      }
  }
