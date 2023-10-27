import React from "react";

import renderer from 'react-test-renderer';
import { Button } from "./button";
import { fireEvent, getByText, render, screen } from "@testing-library/react";

it('Кнопка с текстом', () => {
    const tree = renderer
        .create(<Button text="text"/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 
it('Кнопка без текста', () => {
    const tree = renderer
        .create(<Button text=""/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 
it('Кнопка с disabled', () => {
    const tree = renderer
        .create(<Button disabled={true}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 
it('Кнопка с loader', () => {
    const tree = renderer
        .create(<Button isLoader={true}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Нажатие на кнопку работает корректно', () => {
    window.alert = jest.fn();
    render(<Button text="Кнопка" onClick={()=>alert('Works')}/>)
    fireEvent.click(screen.getByText("Кнопка"));
    expect(window.alert).toHaveBeenCalledWith('Works');
}); 

