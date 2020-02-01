const repos = require('./data');
const fs = require('fs')

module.exports = {
    get(i) {
        return repos[i];
    },
    get list() {
        return repos;
    },
    add(article) {
        repos.push(article)
        this.store();
    },
    del(i) {
        repos[i] = null;
        this.store();
    },
    update(i, newOne) {
        repos[i] = newOne;
        this.store();
    },
    store() {
        // 注意：这里的 dat.json 前必须加上/
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(repos))
    },
}