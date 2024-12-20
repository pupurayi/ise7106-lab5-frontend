import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import AssetItem from './AssetItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const [assetList, setAssetList] = useState([]);
  useEffect(() => {
    fetch('http://ec2-35-172-129-171.compute-1.amazonaws.com/lab5/api/assets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.success) {
          setAssetList(r.result.assets);
        } else {
          window.alert(r.error)
        }
      });
  }, []);

  const filterStatus = useSelector((state) => state.asset.filterStatus);

  const sortedAssetList = [...assetList];
  sortedAssetList.sort((a, b) => a.priority - b.priority);

  const filteredAssetList = sortedAssetList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredAssetList && filteredAssetList.length > 0 ? (
          filteredAssetList.map((asset) => (
            // <motion.div key={asset._id} variants={child}>
            <AssetItem key={asset._id} asset={asset} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Assets
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
