
export default function ( md, ruleName, transform) {
    const replace_vars = function (token, transform) {
        if (token.content) {
            token.content = transform(token.content)
        }
        if (token.attrs) {
            for (let index = token.attrs.length - 1; index >= 0; index--) {
                if(typeof token.attrs[index][1] === 'string') {
                    token.attrs[index][1] = transform(token.attrs[index][1])
                }
            }
        }
        if (token.children) {
            let children = token.children;

            for (let i = children.length - 1; i >= 0; i--) {
                replace_vars(children[i], transform)
            }
        }
    }
    md.core.ruler.push(ruleName, function(state) {
        for (let index = state.tokens.length - 1; index >= 0; index--) {
            replace_vars(state.tokens[index], transform)
        }
      }
    );
};