import { ElementStates } from "./element-states";

export type TSwap = {letter?: string , number: number, state: ElementStates}

export type TStack = {
    push(el: string): void;
    pop(): void;
    clear(): void;
    getArray(): string[];
}

export type TQueue = {
    enqueue(el: string): void;
    dequeue(): void;
    clear(): void;
    getArray(): string[];
    getIndex(): {head: number, tail: number}
}

export type TList = {
    addHelper(i: number, el: string): void;
    delHelper(i: number): void;
    getArray(): string[];
}