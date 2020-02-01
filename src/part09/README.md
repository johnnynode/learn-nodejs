express的安装

1. 手工安装和使用 express
2. 通过生成器生成 express 项目
    * `npm i -s express-generator` 这是express的生成器
    * express此时是命令了 `express -h`、`express`
    * 项目中使用 `../../../node_modules/.bin/express` 来执行express命令
    * `../../../node_modules/.bin/express -e demo`
    * `../../../node_modules/.bin/express -e .`
    * 在`express-gen`目录下执行`npm i && cd bin && node www`
    * 访问: `localhost:3000` 即可见