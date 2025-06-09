import React from "react";
import { Product } from "../../data/products";
import styles from "./ProductItem.module.css";

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, isSelected, onSelect }) => (
  <div className={`${styles.productItem} ${isSelected ? styles.open : ""}`} onClick={onSelect}>
    <button className={styles.productButton}>
      {product.size} Yard
    </button>
  </div>
);

export default ProductItem;