import React from 'react';
import RouterComponent from './router';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const App = () => {
  return (
    <>
      <RouterComponent />
      <NotificationContainer />
    </>
  );
}

export default App;
