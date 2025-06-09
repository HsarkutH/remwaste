import React, { useEffect, useState } from "react";
import { Product } from "../../data/products";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styles from "./ProductBottomDrawer.module.css";

interface ProductBottomDrawerProps {
  product: Product | null;
  nextProduct: Product | null;
  spinKey: number;
  onSpinComplete: () => void;
  onClose: () => void;
}

const drawerVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" }
};

const ProductBottomDrawer: React.FC<ProductBottomDrawerProps> = ({
  product,
  nextProduct,
  spinKey,
  onSpinComplete,
  onClose
}) => {
  const [displayedProduct, setDisplayedProduct] = useState<Product | null>(product);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (product && nextProduct && product.id !== nextProduct.id) {
      setIsSpinning(true);
      setHasFlipped(false);
    }
  }, [spinKey, product, nextProduct]);

  useEffect(() => {
    if (!product) setDisplayedProduct(null);
    else setDisplayedProduct(product);
  }, [product]);

  useEffect(() => {
    if (!isSpinning) return;
    const unsubscribe = rotateY.onChange((latest) => {
      if (!hasFlipped && Math.abs(latest) >= 90) {
        setDisplayedProduct(nextProduct!);
        setHasFlipped(true);
      }
    });
    return () => unsubscribe();
  }, [isSpinning, hasFlipped, nextProduct, rotateY]);

  if (!product) return null;

  const vatAmount = displayedProduct
    ? (displayedProduct.price_before_vat * displayedProduct.vat) / 100
    : 0;
  const total = displayedProduct
    ? displayedProduct.price_before_vat + vatAmount
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.drawerOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={drawerVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className={styles.card}
          key={spinKey}
          style={{ rotateY }}
          initial={{ rotateY: 0 }}
          animate={isSpinning ? { rotateY: 180 } : { rotateY: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            if (isSpinning) {
              setIsSpinning(false);
              setHasFlipped(false);
              onSpinComplete();
            }
          }}
        >
          {displayedProduct && (
            <div className={styles.cardContent}>
              {/* img on left */}
              <div className={styles.imageWrapper}>
                <img
                  src={`/img/skip-${displayedProduct.size}.jpg`}
                  alt={`${displayedProduct.size} Yard Skip`}
                  className={styles.productImage}
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = "/img/skip-placeholder.jpg";
                  }}
                />
              </div>
              {/* details on rights */}
              <div className={styles.details}>
                <div className={styles.cardHeader}>
                  <span className={styles.size}>{displayedProduct.size} Yard</span>
                  <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.detailRow}>
                  <span>Hire Period:</span>
                  <span>{displayedProduct.hire_period_days} days</span>
                </div>
                <div className={styles.detailRow}>
                  <span>On Road:</span>
                  <span>{displayedProduct.allowed_on_road ? "Yes" : "No"}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Heavy Waste:</span>
                  <span>{displayedProduct.allows_heavy_waste ? "Yes" : "No"}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Price:</span>
                  <span>
                    £{displayedProduct.price_before_vat} + VAT: £{vatAmount.toFixed(2)}
                  </span>
                </div>
                <button
                  className={styles.continueBtn}
                  onClick={() =>
                    alert(`Total: £${total.toFixed(2)} (incl. VAT)`)
                  }
                >
                  Continue <span className={styles.totalText}>£{total.toFixed(2)}</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductBottomDrawer;