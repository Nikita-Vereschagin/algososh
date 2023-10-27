

import renderer from 'react-test-renderer';
import { Circle } from "./circle";

import { ElementStates } from "../../../types/element-states";

it('Круг без буквы', () => {
    const tree = renderer
        .create(<Circle letter={undefined}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с буквой', () => {
    const tree = renderer
        .create(<Circle letter="A"/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с head', () => {
    const tree = renderer
        .create(<Circle head='1'/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с reactEl в head', () => {
    const tree = renderer
        .create(<Circle head={<Circle letter="B"/>}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с tail', () => {
    const tree = renderer
        .create(<Circle tail='2'/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с reactEl в tail', () => {
    const tree = renderer
        .create(<Circle tail={<Circle letter="C"/>}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с index', () => {
    const tree = renderer
        .create(<Circle index={99}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с isSmall', () => {
    const tree = renderer
        .create(<Circle isSmall={true}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг в состояние Default', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Default}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг в состояние Changing', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Changing}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг в состояние Modified', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Modified}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 



