const fs = require('fs');

class ProductManager {
    
    constructor(path) {
        this.products = [];
        this.id = 0;
        this.path = path;
    }
    addProduct(title, artist, price, thumbnail, code, stock) {
        const parse = JSON.parse(fs.readFileSync(this.path))
        const validate = parse.find((e => e.code === code));
        if (validate) {
            return console.log('codigo de producto ya existe')
        } else {
            this.id++;
            const product = {
                title,
                artist,
                price,
                thumbnail,
                code,
                stock,
                id: this.id,
            }
            this.products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }
    getProducts() {
        const file = fs.readFileSync(this.path);
        const parseo = JSON.parse(file);
        return parseo;
    }
    getProductsById(id) {
        return console.log(this.getProducts().find(product => product.id === id || "not found"));
    }
    updateProduct(id, productMod) {
        const newProduct = this.getProductsById(id).map((product) => {
            if (product.id === id) {
                product.title = productMod.title
                product.description = productMod.description
                product.price = productMod.price
                product.thumbnail = productMod.thumbnail
                product.code = productMod.code
                product.stock = productMod.stock
            } else { console.log("product not found"); }
        })
        this.products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
    deleteProduct(id) {
        const newProductList = this.getProducts().filter(product => product.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(newProductList));
    }
}

module.exports = ProductManager;
/*
const manager = new ProductManager('./products.json');
manager.addProduct( "BLEACHED PUNK", "KAOS07", 6500, "recursos/tapa1.jpg", "bdf126", 21 )
manager.addProduct( "Power To The Soul", "Chlär", 3200, "recursos/tapa2.jpg" , "ace456", 24 )
manager.addProduct( "HEARTCORE ESSENTIALS", "KAOS08", 4700, "recursos/tapa3.jpg", "adf246", 29 )
manager.addProduct( "Juicy", "Julian Muller",  4100, "recursos/tapa4.jpg", "abd124", 28 )
manager.addProduct( "Strange Days", "Slam", 3700, "recursos/tapa5.jpg", "ade146", 27 )
manager.addProduct( "Disparate Lines", "Axel Karakasis", 3200, "recursos/tapa6.jpg", "acf146", 30 )
manager.addProduct( "Mögen", "TBK006", 2900, "recursos/tapa7.jpg", "bef124", 19 )
manager.addProduct( "TRANSFORMA VOLUME FIVE", "A.Paul, DJ Dextro", 4300, "recursos/tapa8.jpg", "acf123", 12 )
manager.addProduct( "Many ways To Go", "Jeroen Search", 3400, "recursos/tapa9.jpg", "acd234", 5 )
manager.addProduct( "Intermission", "Thomas Hessler", 2400, "recursos/tapa10.jpg", "abe134", 7 )
manager.addProduct( "LOSDOSMILDOS", "COYU", 5400, "recursos/tapa11.jpg", "abc456", 13 )
manager.addProduct( "Traces Of Influences", "Hertz, Mhonolink", 4300, "recursos/tapa12.jpg", "def456", 17 )
manager.addProduct( "Evolving", "A-STS", 2000, "recursos/tapa13.jpg", "adf136", 22 )
manager.addProduct( "Manifesto Raw Culture", "Various Artists", 2900, "recursos/tapa14.jpg", "aef356", 21 )
manager.addProduct( "Techwise & Otherwise", "Devilfish", 5100, "recursos/tapa15.jpg", "bdf135", 16 )
manager.addProduct( "Never Mind Have Fun", "M.I.T.A.", 4500, "recursos/tapa16.jpg", "ade156", 32 )
manager.addProduct( "Metaroots 2", "SCOM047", 3500, "recursos/tapa17.jpg", "abd156", 9 )
manager.addProduct( "Planet MHz III", "MHZ003", 2700, "recursos/tapa18.jpg", "abf234", 11 )
manager.addProduct( "Third Eye", "Florian Meindl", 4000, "recursos/tapa19.jpg", "acd156", 15 )
manager.addProduct( "Masquerade", "A.Morgan", 3200, "recursos/tapa20.jpg", "ade135", 20 )
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc12", 25)
manager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "Sin Imagen", "abc1234", 10)
manager.getProducts()
manager.getProductsById(1)
manager.updateProduct(1, ("pro pruba", "Eses un prod prueba", 20, "Sinagen", "a12", 5)) ------- no lo puedo hacer funcionar
manager.deleteProduct(1);*/

