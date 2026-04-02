const fs = require('fs');
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (let file of list) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if(file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.css')){
                const content = fs.readFileSync(file, 'utf8');
                const match = content.match(/[\u0C00-\u0C7F]/);
                if (match) {
                    results.push({
                      file, 
                      context: content.substring(Math.max(0, match.index-20), match.index+20).replace(/\n/g, ' ')
                    });
                }
            }
        }
    }
    return results;
}
console.log(JSON.stringify(walk('d:/HS Property/src'), null, 2));
