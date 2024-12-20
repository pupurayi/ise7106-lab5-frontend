import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import AssetModal from './AssetModal';
import { updateFilterStatus } from '../slices/assetSlice';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.asset.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Asset
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="Old">Old</option>
        <option value="New">New</option>
      </SelectButton>
      <AssetModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
