import {getGenderFromName} from "../src/getGenderFromName";

const testCases = [
    {name: 'Jessica Żebrowska', gender: 'f'},
    {name: 'Marcin Dykow', gender: 'm'},
    {name: 'Radek', gender: 'm'},
    {name: 'Kamila Anna Kowalska', gender: 'f'},
    {name: '', gender: 'u'},
    {name: '   ', gender: 'u'},
]

it('Names should allow to recognize gender', () => {
    testCases.forEach(t => {
        expect(getGenderFromName(t.name)).toEqual(t.gender);
    })
})
