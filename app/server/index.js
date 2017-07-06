import appRootDir from 'app-root-dir';
import chalk from 'chalk';
import express from 'express';
import http from 'http';
import path from 'path';

import routes from './routes';

const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
app.set('port', process.env.PORT);

app.use('/dist/client', express.static(
    path.resolve(appRootDir.get(), './dist/client'), { maxAge: '365d' }
));

app.use(routes);

const listener = server.listen(app.get('port'), (err) => {
    if (err) {
        console.error(`Error running on port`, app.get('port'));
    }
    console.info(chalk.green(`Listening on port: ${app.get('port')}`));
});

export default listener;
