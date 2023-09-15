const fs = require('fs');
const yaml = require('js-yaml');

const inputYamlPath = '/Users/chrismcg/Downloads/rundeck-api.yml';  // Change to your YAML path
const outputMdPath = './docs/api/apiDocumentation.md';

// Load YAML and convert to JSON
const yamlContent = fs.readFileSync(inputYamlPath, 'utf8');
const apiData = yaml.load(yamlContent);

let markdownContent = `# Rundeck API Spec\n\n${apiData.info.description}\n\n`;

for (const path in apiData.paths) {

    for (const method in apiData.paths[path]) {
        const endpoint = apiData.paths[path][method];
        markdownContent += `## ${endpoint.summary}\n`;
        markdownContent += `### Endpoint: ${path}\n`;
        markdownContent += `- **Method**: ${method.toUpperCase()}\n`;
        markdownContent += `- **Description**: ${endpoint.description}\n`;

        // Include request example if it exists
        if (endpoint.requestBody && endpoint.requestBody.content) {
            for (const contentType in endpoint.requestBody.content) {
                if (endpoint.requestBody.content[contentType].examples) {
                    markdownContent += '- **Example Request**:\n';
                    for (const exampleKey in endpoint.requestBody.content[contentType].examples) {
                        const prettyExample = formatExample(endpoint.requestBody.content[contentType].examples[exampleKey].value);
                        markdownContent += `\t- **${exampleKey}**:\n\`\`\`json\n${prettyExample}\n\`\`\`\n`;
                    }
                }
            }
        }

        // Include response examples if they exist
        for (const status in endpoint.responses) {
            const response = endpoint.responses[status];
            if (response.content) {
                for (const contentType in response.content) {
                    if (response.content[contentType].examples) {
                        markdownContent += `- **${status} Response Example**:\n`;
                        for (const exampleKey in response.content[contentType].examples) {
                            const prettyExample = formatExample(response.content[contentType].examples[exampleKey].value);
                            markdownContent += `\t- **${exampleKey}**:\n\`\`\`json\n${prettyExample}\n\`\`\`\n`;
                        }
                    }
                }
            }
        }

        markdownContent += '\n';
    }
}

function formatExample(example) {
    // Check if it's stringified JSON
    if (typeof example === "string" && (example.trim().startsWith('{') || example.trim().startsWith('['))) {
        try {
            // Parse the string and then stringify it again with formatting
            return JSON.stringify(JSON.parse(example), null, 2);
        } catch (e) {
            // In case of any parsing error, return the original string
            return example;
        }
    }
    return JSON.stringify(example, null, 2); // default formatting
}

// Save markdown content to a file
fs.writeFileSync(outputMdPath, markdownContent);

console.log(`Markdown documentation generated at: ${outputMdPath}`);