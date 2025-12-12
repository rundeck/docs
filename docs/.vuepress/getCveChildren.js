import _ from 'lodash'
import fs from 'fs'
import { globSync } from 'glob'
import markdownIt from 'markdown-it'
import meta from 'markdown-it-meta'

/**
 * Custom sorting function for CVE files
 * - Pinned files (order < 50) appear first, sorted by order value
 * - CVE files are automatically sorted by CVE number in descending order (newest first)
 * - Other files with order >= 50 appear after CVEs, sorted by order value
 */
const getCveChildren = function(parent_path, dir) {
    let files = globSync(parent_path + (dir ? `/${dir}` : '') + '/*.md').map(path => {
        // Instantiate MarkdownIt
        let md = new markdownIt();
        // Add markdown-it-meta
        md.use(meta);
        // Get the order value
        let file = fs.readFileSync(path, 'utf8');
        md.render(file);
        let order = md.meta.order;
        
        // Get the filename for CVE detection
        let filename = path.split('/').pop();
        
        // Remove "parent_path" and ".md"
        let cleanPath = path.slice(parent_path.length);
        // Remove "index", making it the de facto index page
        if (cleanPath.endsWith('index.md')) {
            cleanPath = cleanPath.slice(0, -8);
        }

        return {
            path: cleanPath,
            order,
            filename
        };
    });

    // Separate files into categories
    const pinnedFiles = [];
    const cveFiles = [];
    const otherFiles = [];

    files.forEach(file => {
        if (file.order && file.order < 50) {
            // Pinned files (Security Notices, special pages)
            pinnedFiles.push(file);
        } else if (file.filename.startsWith('cve-')) {
            // CVE files - extract year and number for sorting
            const match = file.filename.match(/cve-(\d{4})-(\d+)\.md/);
            if (match) {
                file.cveYear = parseInt(match[1]);
                file.cveNumber = parseInt(match[2]);
            }
            cveFiles.push(file);
        } else {
            // Other files (like log4j.md with high order values)
            otherFiles.push(file);
        }
    });

    // Sort each category
    const sortedPinned = _.sortBy(pinnedFiles, ['order', 'path']);
    
    // Sort CVE files by year DESC, then by number DESC (newest CVEs first)
    const sortedCves = _.orderBy(cveFiles, ['cveYear', 'cveNumber'], ['desc', 'desc']);
    
    const sortedOthers = _.sortBy(otherFiles, ['order', 'path']);

    // Combine: pinned files first, then CVEs, then other files
    const orderedFiles = [...sortedPinned, ...sortedCves, ...sortedOthers];

    // Return just the paths
    return orderedFiles.map(file => file.path);
};

export default getCveChildren;

