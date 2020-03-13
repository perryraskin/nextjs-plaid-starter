const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby(['posts/*.md', 'pages/**/*.tsx', '!pages/_*{.jsx,.tsx}']);
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page
                        .replace('pages', '')
                        .replace('posts', '/blog')
                        .replace('.tsx', '')
                        .replace('.md', '');
                    const route = path === '/index' ? '' : path;

                    return `
                        <url>
                            <loc>${`${process.env.BASE_URL}${route}`}</loc>
                        </url>
                    `;
                })
                .join('')}
        </urlset>
    `;

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    fs.writeFileSync('public/sitemap.xml', formatted);
})();