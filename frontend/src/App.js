// App.js
import React, { useState } from 'react';
import Login from './login';
import Create from './create';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onSignUpClick={() => handlePageChange('create')} />
      ) : (
        <Create onLoginClick={() => handlePageChange('login')} />
      )}
    </div>
  );
}

export default App;



