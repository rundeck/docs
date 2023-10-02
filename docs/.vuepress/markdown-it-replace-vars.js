
export default function ( md, ruleName, transform) {
    md.core.ruler.push(ruleName, function(state) {
      
        for (let index = state.tokens.length - 1; index >= 0; index--) {
    
          if(state.tokens[index].content){
              state.tokens[index].content = transform(state.tokens[index].content)
              continue
          }
          if(state.tokens[index].children){
            let children = state.tokens[index].children;
    
            for (let i = children.length - 1; i >= 0; i--) {
              children[i].content = transform(children[i].content);
            }
          }
        }
      }
    );
};