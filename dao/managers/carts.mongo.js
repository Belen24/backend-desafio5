import {cartsModel} from "../models/carts.model.js";

export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };

    async getCartById(id){
        try {
            const data = await this.model.findById(id);
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al obtener carrito ${error.message}`);
        }
    };

    async createCart(cart){
        try {
            const cart = {};
            const data = await this.model.create(cart);
            return data;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`);
        }
    };

    async addProduct(cartId,productId){

        try {
            const cart = await this.model.findById(cartId);
            if(!cart){
                throw new Error("El carrito no existe")
            }

            cart.products.push (productId);
            await cart.save();
            return "Producto agregado al carrito";
        } catch (error) {
            throw new Error(`Error al agregar el producto ${error.message}`);
        }
    };

    async deleteProduct(cartId){
        try {
            await this.model.findByIdAndDelete(cartId);
            return {message: "Carrito eliminado"};
        } catch (error) {
            throw new Error(`Error al eliminar el carrito ${error.message}`);
        }
    
    };

    async updateCart(cartId, cart){
        try {
            const data = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el carrito ${error.message}`);
        }
    };
}