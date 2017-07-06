import express from 'express';
import Helmet from 'react-helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';

import buildHtml from './utils/buildHtml';
import FrontPage from 'shared/containers/FrontPage';

const router = express.Router();

router.get('/*', function renderer(req, res) {
    const reactAppString = renderToString(
        <FrontPage />
    );

    return res.status(200).send(buildHtml({
        reactAppString,
        helmet: Helmet.renderStatic()
    }));
});

export default router;
