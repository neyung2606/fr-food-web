import React, { useEffect } from 'react';
import RouterComponent from './router';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const App = () => {
  useEffect(() => {
    return () => {
      
    }
  }, [])

  return (
    <>
      <RouterComponent />
      <NotificationContainer />
    </>
  );
}

export default App;
