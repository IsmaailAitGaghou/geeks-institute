import {person} from './data.js';

const findAverageAge = () => {
    const totalAge = person.reduce((sum, p) => sum + p.age, 0);
    return totalAge / person.length;
}


console.log(`Average Age: ${findAverageAge()}`);