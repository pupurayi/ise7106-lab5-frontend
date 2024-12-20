// import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/assetItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import AssetModal from './AssetModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AssetItem({ asset }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:4100/api/asset/${asset._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            toast.success('Asset Deleted Successfully');
            window.location.reload();
          } else {
            toast.error(r.error)
          }
        });

  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.assetDetails}>
          <CheckButton />
          <div className={styles.text}>
              <p className={getClasses([styles.assetText, asset.status === 'new' && styles['assetText--newd'],])}>{asset.manufacturer} - {asset.model}</p>
              <p className={styles.time}><b>Serial Number: </b>{asset.serialNumber}</p><br/>
              <p className={styles.time}><b>Created:</b>&nbsp;{asset.createdAt}</p><br/>
              <p className={styles.time}><b>Acquired Date:&nbsp;</b>{asset.acquiredDate}</p><br/>
              <p className={styles.time}><b>Status:&nbsp;</b>{asset.status} ({asset.conditionRating}/10)</p>
          </div>
        </div>
        <div className={styles.assetActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <AssetModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        asset={asset}
      />
    </>
  );
}

export default AssetItem;
