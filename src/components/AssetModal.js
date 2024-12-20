import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function AssetModal({ type, modalOpen, setModalOpen, asset }) {
  const [_id, setId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [status, setStatus] = useState('new');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [conditionRating, setConditionRating] = useState('10');
  const [acquiredDate, setAcquiredDate] = useState(null);

  useEffect(() => {
    if (type === 'update' && asset) {
      setId(asset._id);
      setSerialNumber(asset.serialNumber);
      setStatus(asset.status);
      setManufacturer(asset.manufacturer);
      setModel(asset.model);
      setConditionRating(asset.conditionRating);
      setAcquiredDate(asset.acquiredDate);
    } else {
      setId('');
      setSerialNumber('');
      setStatus('new');
      setManufacturer('');
      setModel('');
      setConditionRating(10);
      setAcquiredDate(null);
    }
  }, [type, asset, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (serialNumber === '') {
      toast.error('Please enter a Serial Number');
      return;
    }
    if (manufacturer === '') {
      toast.error('Please enter a manufacturer');
      return;
    }
    if (model === '') {
      toast.error('Please enter a model');
      return;
    }
    if (conditionRating === '') {
      toast.error('Please enter a Condition Rating');
      return;
    }
    if (acquiredDate === null) {
      toast.error('Please enter a Acquired Date');
      return;
    }
    if (serialNumber && status) {
      if (type === 'add') {
          fetch(`https://tengasolar.co.zw/lab5/api/asset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              serialNumber,
              status,
              manufacturer,
              model,
              conditionRating,
              acquiredDate
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              if (r.success) {
                toast.success('Asset added successfully');
                setModalOpen(false);
                window.location.reload();
              } else {
                toast.error(r.error)
              }
            });
      }
      if (type === 'update') {
        fetch(`https://tengasolar.co.zw/lab5/api/asset/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            serialNumber,
            status,
            manufacturer,
            model,
            conditionRating,
            acquiredDate
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.success) {
              toast.success('Asset updated successfully');
              setModalOpen(false);
              window.location.reload();
            } else {
              toast.error(r.error)
            }
          });
      }
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} ASSET
              </h1>
              <label htmlFor="serialNumber">
                Serial Number
                <input
                  type="text"
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </label>
              <label htmlFor="manufacturer">
                Manufacturer
                <input
                  type="text"
                  id="manufacturer"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                />
              </label>
              <label htmlFor="model">
                Model
                <input
                  type="text"
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </label>
              <label htmlFor="conditionRating">
                Condition Rating
                <input
                  type="number"
                  min={1}
                  id="conditionRating"
                  value={conditionRating}
                  onChange={(e) => setConditionRating(e.target.value)}
                />
              </label>
              <label htmlFor="acquiredDate">
                Acquired Date
                <input
                  type="date"
                  id="acquiredDate"
                  value={acquiredDate}
                  onChange={(e) => setAcquiredDate(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Old">Old</option>
                  <option value="New">New</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Asset' : 'Update Asset'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AssetModal;
