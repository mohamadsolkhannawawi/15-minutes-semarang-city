import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';

function App() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <MapPage />;
  }

  return <MainPage onCheckLocation={() => setShowMap(true)} />;
}

export default App;