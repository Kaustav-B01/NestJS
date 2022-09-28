import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(name: string, desc: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, name, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {
    const product = this.getProd(prodId);
    return { ...product };
  }

  updateProduct(id: string, name: string, desc: string, price: number) {
    const product = this.getProd(id);
    if (name) product.name = name;
    if (desc) product.description = desc;
    if (price) product.price = price;
  }

  deleteProduct(id: string) {
    const product = this.getProd(id);
    this.products.splice(this.products.indexOf(product), 1);
  }

  private getProd(id: string) {
    const product = this.products.find((el) => el.id === id);
    if (!product) throw new NotFoundException('Product not found!');
    return product;
  }
}
