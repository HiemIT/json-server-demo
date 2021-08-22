var faker = require('faker');
const fs = require('fs');

// set locale to use Vietnamese
faker.locale = "vi";

// Radom data

// console.log(faker.phone.phoneNumberFormat())
// console.log(faker.image.food())

// console.log(faker.random.uuid())


// Random data

const radomCategoryList = (n)=> {
    if (n <= 0) return [];
    
    const categoryList = [];

    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id : faker.random.uuid(),
            name : faker.commerce.department(),
            createdAt : Date.now(),
            updatedAt : Date.now(),
        }

        categoryList.push(category)
    });

    return categoryList
}

const radomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts < 0) return [];

    const productList = [];

    for(const category of categoryList){
        console.log(category)
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                category : category.id,
                id : faker.random.uuid(),
                name : faker.commerce.productName(),
                color : faker.commerce.color(),
                price : Number.parseFloat(faker.commerce.price()),
                description : faker.commerce.productDescription(),
                createdAt : Date.now(),
                updatedAt : Date.now(),
                thumbnailUrl : faker.image.imageUrl(400.400),
            }

            productList.push(product)
        })
    }

     return productList
}
// prepare db object 
(() => {
    const categoryList = radomCategoryList(5);
    const productList = radomProductList(categoryList,5);

    const db =  {
        categories : categoryList,
        products : productList,
        profile : {
            name: "Pro",
        }
    }
// write db object to db.json 

fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log("Generate data successFully")
})

})()
