export default function Greedy(totalMoney, products) {
    const typeQuantityMax = {
        'bike': 1,
        'frame': 1,
        'wheels': 2,
        'tires': 2,
        'tube': 2,
        'groupset': 1,
        'accesories': 5
    }
    const selections = [];
    for (let i = 0; i < products.length; i++) {
        let quantityMax = totalMoney / products[i].price;
        if (quantityMax > typeQuantityMax[products[i].type] && quantityMax > 1) {
            quantityMax = typeQuantityMax[products[i].type];
            totalMoney = totalMoney - quantityMax * products[i].price;
            selections.push({ product: products[i], quantity: quantityMax });
        }
    }
    return selections;
}