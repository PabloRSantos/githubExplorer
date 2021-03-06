import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repository } from '../pages/Repository';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/repository/:repository+" component={Repository} />
        </Switch>
    </BrowserRouter>
);

export { Routes };
