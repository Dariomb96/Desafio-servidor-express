import faker from 'faker';

export const generateMockProducts = (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            _id: faker.random.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
        };
        products.push(product);
    }
    res.json(products);
};