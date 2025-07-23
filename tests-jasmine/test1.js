import { fibonaci, sum } from "../tests/test1-function.js";
import { tests } from "../tests/tests.js";

// describe('test suite: fibonaci', () => {
//     it('Negative number', () => {
//         expect(fibonaci(-0.5)).toEqual('Invalid Input');
//     });
// });

Object.keys(tests).forEach(functions => {
    describe(`\n*** test suite: ${functions} ***`, () => {
        tests[functions].forEach(test => {
            const { title, realOutput, expectedOutput } = test;
            it(title, () => {
                expect(realOutput).toEqual(expectedOutput);
            });
        });
    });


});