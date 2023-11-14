import _ from 'lodash'
import fs from 'fs'
import glob from 'glob'
import markdownIt from 'markdown-it'
import meta from 'markdown-it-meta'

// Load all MD files in a specified directory and order by metadata 'order' value
const getChildren = function(parent_path, dir) {
    let files = glob
        .sync(parent_path + (dir ? `/${dir}` : '') + '/*.md')
        .map(path => {
            // Instantiate MarkdownIt
            let md = new markdownIt();
            // Add markdown-it-meta
            md.use(meta);
            // Get the order value
            let file = fs.readFileSync(path, 'utf8');
            md.render(file);
            let order = md.meta.order;
            // Remove "parent_path" and ".md"
            path = path.slice(parent_path.length);
            // Remove "index", making it the de facto index page
            if (path.endsWith('index.md')) {
               path = path.slice(0, -8);
            }

            return {
                path,
                order
            };
        });

    // Return the ordered list of files, sort by 'order' then 'path'
    const children = _.sortBy(files, ['order', 'path'])
        .map(file => file.path);

    return children;
};


export default getChildren