
export function fibonaci(count) {
    //1 1 2 3 5 8 --> count = 6 || sum = 20
    if (typeof count != 'number' || count <= 0) return 'Invalid Input';
    if (count % 1 != 0) return 'Enter a round number';
    if (count <= 2) return count;
    let sum = 2;

    let current = 2;
    let prev = 1;
    let temp;

    for (let i = 3; i <= count; i++) {
        sum += current;
        temp = current;
        current += prev;
        prev = temp;
    }
    return sum;
}

export function sum(arr) {
    if (!arr || arr.length == 0) return 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        if ((typeof num) != 'number') {
            return 'Error';
        }
        sum += num;
    }
    return sum;
}