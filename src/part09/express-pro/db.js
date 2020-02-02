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
        repos.splice(i, 1);
        this.store();
    },
    update(i, newOne) {
        repos.splice(i, 1, newOne);
        this.store();
    },
    store() {
        // 注意：这里的 dat.json 前必须加上/
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(repos))
    },
}