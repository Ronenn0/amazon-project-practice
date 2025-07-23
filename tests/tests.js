import { fibonaci, sum } from "./test1-function.js";

// console.log('test suite: Fibonaci');

// console.log('Negative number');
// console.log(fibonaci(-0.5) == 'Invalid Input' ? 'passed' : 'failed');

// console.log('Bigger than 1 and not rounded number');
// console.log(fibonaci(1.5) == 'Enter a round number' ? 'passed' : 'failed');

export const tests = {
    fibonaci: [{
        title: 'Negative number',
        realOutput: fibonaci(-0.5),
        expectedOutput: 'Invalid Input'
    }, {
        title: 'Bigger than 1 and not rounded number',
        realOutput: fibonaci(1.5),
        expectedOutput: 'Enter a round number'
    }, {
        title: 'A small number',
        realOutput: fibonaci(3),
        expectedOutput: 4
    }, {
        title: 'A big number',
        realOutput: fibonaci(35),
        expectedOutput: 24157816
    }
    ],
    sum: [
        {
            title: 'A Normal Array',
            realOutput: sum([5, 7, 3]),
            expectedOutput: 15
        }, {
            title: 'Array with a word in it',
            realOutput: sum([5, 'hey', 3]),
            expectedOutput: 'Error'
        }, {
            title: 'Empty Array',
            realOutput: sum([]),
            expectedOutput: 0
        }, {
            title: 'No Array',
            realOutput: sum(),
            expectedOutput: 0
        }
    ]
};

// console.log(Object.keys(tests));

// Object.keys(tests).forEach(functions => {
//     console.log(`\n*** test suite: ${functions} ***`);
//     tests[functions].forEach(test => {
//         const { title, realOutput, expectedOutput } = test;
//         console.log(title);
//         console.log(`Expected Output: ${expectedOutput}`);
//         console.log(`Actual Output: ${realOutput}`);
//         console.log('*_ ' + (realOutput == expectedOutput ? 'passed' : 'failed') + ' _*\n ');
//     });
// });