import appRootDir from 'app-root-dir';
import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';

const assetsFilePath = path.resolve(
    appRootDir.get(),
    './dist/client/',
    `./assets.json`
);

function styleTags(styles) {
    return styles
        .map(style =>
          `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" />`,
        )
        .join('\n');
}

function scriptTag(jsFilePath) {
    return `<script type="text/javascript" src="${jsFilePath}"></script>`;
}

function scriptTags(jsFilePaths) {
    return jsFilePaths.map(scriptTag).join('\n');
}

function assetsJSONResolver() {
    return JSON.parse(fs.readFileSync(assetsFilePath, 'utf-8'));
}

function getAssetsForClientChunks(chunks) {
    return chunks.reduce((acc, chunkName) => {
        const chunkAssets = assetsJSONResolver()[chunkName];

        if (chunkAssets) {
            if (chunkAssets.json) {
                acc.json.push(chunkAssets.json);
            }
            if (chunkAssets.js) {
                acc.js.push(chunkAssets.js);
            }
            if (chunkAssets.css) {
                acc.css.push(chunkAssets.css);
            }
        }

        return acc;
    }, { js: [], css: [], json: [] });
}

export default function buildHtml(args = {}) {
    const { reactAppString, store, helmet } = args;
    const initialState = store ? store.getState() : {};
    const chunksForRender = [
        'manifest',
        'vendor',
        'index'
    ];
    const assetsForRender = getAssetsForClientChunks(chunksForRender);

    const inlineScript = (body) => {
        return `<script type='text/javascript'>
            ${body}
        </script>`;
    };

    return `<!DOCTYPE html>
    <html ${helmet ? helmet.htmlAttributes.toString() : ''}>
      <head>
        ${helmet ? helmet.title.toString() : ''}
        ${helmet ? helmet.meta.toString() : ''}
        ${helmet ? helmet.link.toString() : ''}
        ${styleTags(assetsForRender.css)}
        ${helmet ? helmet.style.toString() : ''}
        <meta
            content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui"
            name="viewport"
        />
        <meta charSet="UTF-8" />
        <meta content="IE=Edge" httpEquiv="X-UA-Compatible"/>
        <meta content="yes" name="apple-mobile-web-app-capable"/>
        <meta content="yes" name="mobile-web-app-capable"/>
      </head>
      <body>
        <div id='app-root'>${reactAppString || ''}</div>
        ${scriptTags(assetsForRender.json)}
        ${scriptTags(assetsForRender.js)}
        ${helmet ? helmet.script.toString() : ''}
      </body>
    </html>`;
}
