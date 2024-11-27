import React from 'react';
import LaunchList from './components/LaunchList';
import './assets/scss/styles.scss';

const App = () => {
    return (
        <div className="App">
            <h1>SpaceX Launches</h1>
            <LaunchList />
        </div>
    );
};

export default App;