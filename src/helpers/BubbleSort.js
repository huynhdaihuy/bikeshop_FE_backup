export default function bubbleSort(array, type) {
    if (type === 'inc')
        for (let i = 0; i < array.length; i++) {
            for (let x = 0; x < array.length - 1 - i; x++) {
                if (array[x].price < array[x + 1].price) {
                    [array[x], array[x + 1]] = [array[x + 1], array[x]];
                }
            }
        }
    else
        for (let i = 0; i < array.length; i++) {
            for (let x = 0; x < array.length - 1 - i; x++) {
                if (array[x].price > array[x + 1].price) {
                    [array[x], array[x + 1]] = [array[x + 1], array[x]];
                }
            }
        }
    return array;
}