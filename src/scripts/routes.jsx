import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Home'

const MyRoutes = () => (
    <BrowserRouter basename="/agvisor-ui">
        <Routes>
            <Route exact path="/" element={<Home />}/>
        </Routes>
    </BrowserRouter>
    )

export default MyRoutes;
