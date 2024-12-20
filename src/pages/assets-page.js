import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from '../components/AppContent';
import AppHeader from '../components/AppHeader';
import PageTitle from '../components/PageTitle';
import styles from '../styles/modules/app.module.scss';
import logo from '../icon.jpeg';

function AssetsPage(props) {
  return (
    <>
      <div className="container">
      <img src={logo} className={styles.centerImage} alt="logo" />
        <PageTitle>RBZ ASSET REGISTER (ISE 7106 LAB-5)</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default AssetsPage;
