export default function(dotCount) {
    const orders = generatePermutations(dotCount);

    let ordersString = orders.map(order => {
        return order.join('');
    });

    const uniques = [];

    const byKey = {};
    const grouped = {};

    while (ordersString.length !== 0) {
        const ordering = ordersString[0];
        const duplicates = [];

        let shifted = ordering;

        uniques.push(ordering.split(''));

        for (let i = 0; i < ordering.length; i++) {
            shifted = shiftOrder(shifted);
            const shiftedReverse = shifted.split('').reverse().join('');

            const doup = ordersString.splice(ordersString.indexOf(shifted), 1)[0];
            const doupReverse = ordersString.splice(ordersString.indexOf(shiftedReverse), 1)[0];

            byKey[doup] = ordering;
            byKey[doupReverse] = ordering;

            duplicates.push(doup);
            duplicates.push(doupReverse);
        }

        grouped[ordering] = duplicates;
    }

    return { uniques, byKey, grouped };
}

function shiftOrder(order) {
    const array = order.split('');
    array.push(array.shift());
    return array.join('');
}

// http://stackoverflow.com/questions/9960908/permutations-in-javascript
function generatePermutations(length) {
    const input = [];

    for (let i = 0; i < length; i++) {
        input.push(i);
    }

    const permArr = [];
    const usedChars = [];

    function permute(input) {
        let i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            permute(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr;
    }

    return permute(input);
}
