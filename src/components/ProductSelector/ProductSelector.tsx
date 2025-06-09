import React, { useState } from "react";
import { products, Product } from "../../data/products";
import ProductItem from "./ProductItem";
import ProductBottomDrawer from "./ProductBottomDrawer";
import styles from "./ProductSelector.module.css";

const ProductSelector: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [spinKey, setSpinKey] = useState(0);

  // on click the product
  const handleSelect = (product: Product) => {
    if (!drawerProduct) {
      // if drawer is closed, open it
      setDrawerProduct(product);
      setSelectedProduct(product);
    } else if (drawerProduct.id !== product.id) {
        //start the animation
      setSelectedProduct(product); // for change the product
      setSpinKey(prev => prev + 1); // trigger the animation
    } else {
      // Close the drawer
      setDrawerProduct(null);
      setSelectedProduct(null);
    }
  };

  const handleSpinComplete = () => {
    if (selectedProduct) setDrawerProduct(selectedProduct);
  };

  return (
    <div className={styles.selectorContainer}>
      <h2 className={styles.title}>Select Your Skip Size</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isSelected={drawerProduct?.id === product.id}
            onSelect={() => handleSelect(product)}
          />
        ))}
      </div>
      <ProductBottomDrawer
        product={drawerProduct}
        nextProduct={selectedProduct}
        spinKey={spinKey}
        onSpinComplete={handleSpinComplete}
        onClose={() => {
          setDrawerProduct(null);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default ProductSelector;