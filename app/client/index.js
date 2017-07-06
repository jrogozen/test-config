import assign from 'lodash/assign';
import React from 'react';
import { render } from 'react-dom';

import FrontPage from '../shared/containers/FrontPage';

const renderApp = () => {
    render(
        <FrontPage />,
        document.getElementById('app-root')
    );
};

renderApp();
