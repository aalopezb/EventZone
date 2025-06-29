import React from 'react';
import UserRecommendations from './components/UserRecommendations';
import SimilarEvents from './components/SimilarEvents';
import PopularEvents from './components/PopularEvents';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Recommendations Frontend</h1>
      <UserRecommendations userId={1} />
      <SimilarEvents eventId={1} />
      <PopularEvents />
    </div>
  );
}

export default App;
