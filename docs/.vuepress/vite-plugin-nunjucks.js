import nunjucks from 'nunjucks';
import setup from './setup'; 

// Nunjucks Configuration
nunjucks.configure({
    autoescape: false,
    tags: {
      blockStart: '{%',
      blockEnd: '%}',
      variableStart: '{{',
      variableEnd: '}}',
      commentStart: '{#',
      commentEnd: '#}'
    }
  });

const config = {
  ...setup,
  javaDocBase: `https://static.javadoc.io/org.rundeck/rundeck-core/${setup.rundeckVersionFull}`,
  javaDocStorageApiBase: `https://static.javadoc.io/org.rundeck/rundeck-storage-api/${setup.rundeckVersionFull}`
};

// Vite Plugin
export default function VitePluginNunjucksMd() {
    return{
      name: 'vite-plugin-nunjucks-md',
      transform(src, id) {
        const testString = "## Rundeck {{ rundeckVersion }} Documentation";
        const rendered = nunjucks.renderString(testString, config);
        console.log(rendered);
        console.log('Transforming:', id);
        if (id.endsWith('.md')) {
          return {
            code: nunjucks.renderString(src, config),
            map: null
          };
        }
      }
    } 
  };