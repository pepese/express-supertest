# express-supertest

![node.js](https://img.shields.io/badge/node.js-v13.5.0-brightgreen)
![npm version](https://img.shields.io/badge/npm%20package-v6.13.4-brightgreen)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![Coverage lines](/coverage/badge-lines.svg)
![Coverage functions](/coverage/badge-functions.svg)
![Coverage branches](/coverage/badge-branches.svg)
![Coverage statements](/coverage/badge-statements.svg)
<!-- description -->
[SuperTest](https://github.com/visionmedia/supertest) をやりたいが為に作ったプロジェクト。  
関係ないこともやってる。

## バッジ

[shields.io](https://shields.io/) で好きなバッジ作れる。  
カバレッジは [jest-coverage-badges](https://github.com/pamepeixinho/jest-coverage-badges) で出した。

## Graceful Shutdown

コンテナ時代（じゃなくても）お作法として `SIGTERM` を受けたら Graceful Shutdown するようにする。

- [terminus](https://github.com/godaddy/terminus)
    - [Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)
- [express-graceful-shutdown](https://github.com/serby/express-graceful-shutdown)

## ロギング

### レベル

|Level|説明|
|:----|:---|
|fatal|即座に対応が必要なエラー。|
|error|ベストエフォートで対応が必要なエラー。|
|warn |すぐに問題になることはないが、後々対応が必要、もしくは今後 error になりそうな事象。|
|info |自分サーバ・プロセス外へのアクセスやサードパーティモジュールを利用する場合の入力情報などを出力。|
|debug|商用・本番では出力しないデバッグ用の情報。|
|trace|商用・本番では出力しない debug よりさらに詳細な情報。|

### レスポンスとログ出力

レスポンスベースで整理する。

|Level|errorCode|status|error                 |mesage|説明|
|:----|:--------|:-----|:---------------------|:-----|:---|
|fatal|FATAL001 |-     |Service Start Failure |      |アプリケーションサービスの起動に失敗。|
|error|ERROR001 |500   |Internal Server Error |      |ハンドリング不可能なエラーが発生。|
|error|ERROR002 |500   |Database Access Error |      |データベースアクセスでエラーが発生。|
|error|ERROR003 |500   |API Access Error      |      |APIアクセスでエラーが発生。|
|warn |WARN001  |400   |Bad Request           |      |リクエストに不正がある。|
|warn |WARN002  |401   |Unauthorized          |      |認証エラーが発生。|
|warn |WARN003  |403   |Forbidden             |      |権限の無いアクセス。|
|warn |WARN004  |404   |Not Found             |      |URIもしくは検索を依頼されたリソースが見つからない。サービスによっては空 body/200 statusで返却することを検討。|
|warn |WARN005  |405   |Method Not Allowed    |      |存在しない HTTP メソッドでのアクセス。許可が無い場合は 403/Forbidden で返却する。|
|warn |WARN006  |406   |Not Acceptable        |      |Accept-* ヘッダで準備のないものを依頼された場合。|
|warn |WARN007  |409   |Conflict              |      |依頼内容を実行するとリソース競合が発生するため拒否。|
|warn |WARN008  |415   |Unsupported Media Type|      |処理できない Content-Type で依頼された。|
|warn |WARN009  |422   |Unprocessable Entity  |      |入力値のバリデーションチェックでエラーが発生。400/Bad Request で返却するか悩む。|

上記のステータスコードに応じたレスポンスオブジェクトの生成には [BOOM](https://github.com/hapijs/boom/) を利用する。

### ロガー

ロガーは [winston](https://github.com/winstonjs/winston) 。  
リクエストロガーに [morgan](https://github.com/expressjs/morgan) とか [express-winston](https://github.com/bithavoc/express-winston) があるが、個人的に使いにくかったので使ってない。  
代わりに [on-headers](https://github.com/jshttp/on-headers) と [on-finished](https://github.com/jshttp/on-finished) を使って自分で実装。

### reqId の設定

[express-http-context](https://github.com/skonves/express-http-context) を利用して 1 リクエスト中に利用できる key-value に リクエスト ID ・トレース ID （ reqId ）を設定する。  
その値を logger が取得してログ出力時に reqId を付与する。  
reqId には uuidv4 を利用する。  
なお、[express-http-context](https://github.com/skonves/express-http-context) では スレッドローカルのように動作する **Continuation-local storage** が利用される。（厳密にはスレッドローカルではない。）  
詳しくは [cls-hooked](https://github.com/jeff-lewis/cls-hooked#readme) を参照 。

## JWT

[node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) を利用してアクセストークンを実現した。  
鍵管理については参考にしないこと。

### 予約済みクレーム名

Payload で予約されたパラメータは以下。

|クレーム名|説明|nodeで使う時|
|---|---|---|
|iat|tokenが発行された時間|デフォルトで勝手に入る|
|exp|tokenの有効期限|expiresIn|
|iss|token発行者の名前|issuer|
|aud|どのクライアント向けに発行されたトークンであるかの識別子|audience|
|jti|トークンの固有 ID|jwtid|
|sub|ユーザーの識別子|subject|
|nbf|JWTが有効になる日時|notBefore|

- [参考](https://qiita.com/keitatata/items/fa89f007de21e286df17)

## バリデーション

### 入力チェック

HTTP リクエストのバリデーションは [express-validator](https://github.com/express-validator/express-validator) で実現。  
その他に [joi](https://github.com/hapijs/joi) と [express-joi-validator](https://github.com/goodeggs/express-joi-validator) もあり、 IF のバリデーション以外にも Entity のバリデーションも重要な場合にはこっちの組み合わせかな。（今回は前者）

### JSON Schema

JSON Schema および Ajv を利用して JSON のバリデーションを実現した。

- [json-schema.org](https://json-schema.org/)
- [Ajv: Another JSON Schema Validator](https://github.com/epoberezkin/ajv)
    - Ajv version 6.0.0 that supports JSON Schema draft-07 is released.

## セキュリティ

### Helmet

HTTP ヘッダによるセキュリティとして [Helmet](https://github.com/helmetjs/helmet) を利用。  
以下のような対応ができる。

- `X-Frame-Options` : クリックジャギング対策
- `Strict-Transport-Security` : HTTPS を強要
- `X-XSS-Protection` : XSS 対策
- `X-DNS-Prefetch-Control` : DNS Prefetch 対策

## MongoDB

以下のように Docker でローカル実行できる。

```bash
$ docker pull mongo:3.6.13-xenial
$ docker run -d --name mongo -p 27017:27017 mongo:3.6.13-xenial
$ docker exec -it mongo bash
:/# mongo
>
```

### MongoDB 基礎

|MongoDB|RDB|
|:---|:---|
|データベース|データベース|
|コレクション|テーブル|
|ドキュメント|行 / レコード|
|フィールド|列 / カラム|

BSON（ Binary JSON ）のデータ型。（ [参考](https://docs.mongodb.com/manual/reference/operator/query/type/) ）

|Type|Number|Alias|Notes|
|:---|:---|:---|:---|
|Double|1|“double”||
|String|2|“string”||
|Object|3|“object”||
|Array|4|“array”||
|Binary data|5|“binData”||
|Undefined|6|“undefined”|Deprecated.|
|Object id|7|“objectId”||
|Boolean|8|“bool”||
|Date|9|“date”||
|Null|10|“null”||
|Regular Expression|11|“regex”||
|DBPointer|12|“dbPointer”|Deprecated.|
|JavaScript|13|“javascript”||
|Symbol|14|“symbol”|Deprecated.|
|JavaScript (with scope)|15|“javascriptWithScope”||
|32-bit integer|16|“int”||
|Timestamp|17|“timestamp”||
|64-bit integer|18|“long”||
|Decimal128|19|“decimal”||
|Min key|-1|“minKey”||
|Max key|127|“maxKey”||

`ISODate` は文字列を `Date` へ変換するユーティリティであって型ではない。

### Mongo Shell

- `use [DB]` : DB の選択。無ければ作成される。
- `show dbs` : DB 一覧。
- `show collections` : コレクション一覧。
- `db.stats()` : 現在の DB の状態表示。
- `db.createCollection(name, options)` : コレクションの作成。
- `db.コレクション名.コマンド名(options)` : 基本操作の構文。
    - `insert()` : 挿入。コレクションが無い場合、暗黙的に作成される。`createCollections` で作成する方が望ましい。
    - `insertMany()` : 複数ドキュメントを配列で挿入。
    - `find()` : 検索。
    - `findOne()` : 1 つ検索。
    - `update()` : フィールドの追加、更新。
    - `save()` :  id が存在する場合 `update()` 、 id が存在しない場合 `insert()`。
    - `upsert()` :  id が存在する場合 `update()` 、 id が存在しない場合 `insert()`。
    - `findAndModify()` : 検索と修正を一括で行う。
    - `remove()` : ドキュメントの削除。

### Jest で MongoDB アプリをテストするとき

MongoDB へのコネクションが残ってしまい、正常に Jest テストが終了しない事象が発生することがある。  
[ここ](https://jestjs.io/docs/en/mongodb)を参考に以下を利用してもよい。

```bash
$ npm i -D @shelf/jest-mongodb
```

## PDF 作成

右往左往したが、 [pdfmake](https://github.com/bpampuch/pdfmake) に落ち着いた。（内部で [pdfkit](https://github.com/foliojs/pdfkit) を利用している。）  
HTML から PDF 変換したらキレイで楽かなと思い [node-html-pdf](https://github.com/marcbachmann/node-html-pdf) と [puppeteer](https://github.com/GoogleChrome/puppeteer) で作ってみたが、モジュールサイズがデカすぎてコンテナサイズが GB サイズになったのでやめた。。。ヘッドレスブラウザとは言えデカいのね。。。


## Linter

[eslint](https://github.com/eslint/eslint) と厳しいと噂の [Uber の設定](https://github.com/uber-web/uber-eslint)を参考に設定した。  
[TypeScript](https://github.com/microsoft/TypeScript) にするか悩むが、型ファイルとかトランスパイルとかウザそうなので、そのうち ECMAScript に取り込まれることを祈って見送り。

## Docker

TODO

## docker-compose

TODO

## ESDoc

所謂 Javadoc の ES 版。  
JSDoc というものもあるが、こっちにした。  
導入。

```bash
$ npm i -D esdoc esdoc-standard-plugin esdoc-node
```

上記で注意なのは、 esdoc は commonjs を解釈できないので、 `esdoc-node` プラグインを入れてやる必要があること。  
`package.json` に設定書いた。（ [参考](https://esdoc.org/manual/config.html) ）

```javascript
{
  "esdoc": {
    "source": "./app",
    "destination": "./docs",
    "plugins": [
      {
        "name": "esdoc-standard-plugin"
      },
      {
        "name": "esdoc-node"
      }
    ]
  },
  "scripts": {
    "esdoc": "esdoc"
  }
}
```

使えるタグは [ここ](https://esdoc.org/manual/tags.html) 。

## Javascritp (ES) 文法メモ

### スプレッド構文

配列やオブジェクトの名前の前に「...」をつけると中身が展開される。

```javascript
const arr1 = ['A', 'B', 'C']
const arr2 = [...arr1, '1', '2']
console.log(arr2) // ["A", "B", "C", "1", "2"]

const obj1 = { first_name:'ichiro', age:'20'}
const obj2 = { ...obj1, role: 'leader', last_name: 'sato' }
console.log(obj2) //{first_name:"ichiro", age:"20", role: "leader", last_name: "sato"}
```

### this

`this` は呼び出し元のオブジェクト。  
つまり、`this` を呼んだ場所によって、その参照先は変わってくる。

|呼んだ場所|thisの参照先|
|:---|:---|
|関数外|グローバルオブジェクト|
|関数内|グローバルオブジェクト（strict mode では undefined）|
|call/applyメソッド|引数で指定されたオブジェクト|
|イベントリスナー|イベント発生元|
|コンストラクタ|生成したインスタンス|
|メソッド|レシーバ（呼び出し元のオブジェクト）|

`apply()` や `call()` は「引数オブジェクト」を「呼び出す関数」の `this` に指定することができるメソッド。  
`apply()` と `call()` の違いは、引数を配列で渡すか、カンマ区切りで渡すかだけ。

```javascript
function example(){
    console.log(this);
}
var element = { num: 4 };
example.apply(element); // { num: 4 }
```

いろいろあるけど、基本 `this` は操作・変更しない。

### bind

`apply()` や `call()` に似ているが、`apply()` や `call()` はそれぞれ関数内で参照する `this` を指定するのに対して、 `bind()` は `this` を束縛した関数オブジェクトをを生成する。

```javascript
function func12(a, b) {
  console.log(this.val + a + b)
}
const bind1 = func12.bind({val: 1})
const bind2 = func12.bind({val: 5}, 5)
const bind3 = func12.bind({val: 2}, 6, 9)
bind1(1, 2) // 4  // 1 + 1 + 2
bind2(3)    // 13 // 5 + 5 + 3
bind3()     // 17 // 2 + 6 + 9
```

### Default Prameters

```javascript
const before = x => {
  if (x === undefined) {
    x = 0
  }
  return x * 2
}

const after = (x = 0) => {
  return x * 2
}
```

### Rest Parameters

```javascript
function f(a, b, ...rest) {
  console.log(rest)
}
f(1, 2, 3, 4, 5) // [3, 4, 5]
```

### Destructuring / デストラクチャリング

```javascript
const arr = [10, 20, 30, 40];
const [first, second, ...rest] = arr;
console.log(rest); // [ 30, 40 ]

const obj = { a: 123, b: 456, c: 789, z: 999 };
const { a, b, c, d } = obj;
console.log(`${a}, ${b}, ${c}, ${d}`); // 123, 456, 789, undefined
// ${z} は「ReferenceError: z is not defined」になる
```

配列でもオブジェクトでも使える。

### Property Definition / プロパティ定義

変数名とキーが一致している場合は省略可能。

```javascript
const a = 1, b = 2;
const before = {
  a: a,
  b: b,
}
const after = {
  a,
  b,
}
console.log(after); // { a: 1, b: 2 }
```

### Computed property name / 動的なプロパティ名

```javascript
const key = 'foo';
const o = {
  [key]: 1,
};
console.log(o); // { foo: 1 } // key じゃなくて foo になってる
```

### Generator Function

`function*` と `yield` の組み合わせ。  
都度関数実行するので、配列全部作るよりメモリ節約。

```javascript
function* range(end) {
  for (let i = 0; i < end; i++) {
    yield i;
  }
}
for (const x of range(5)) {
  console.log(x);
}
// 0
// 1
// 2
// 3
// 4
```

### シンボル

- ES6から使えるようになった
- `Symbol()` コンストラクタから作成し、作成されたシンボルは必ずユニークとなる
- 必ずユニークとなるので、オブジェクトプロパティの名前として使うと、バッティングを回避できる
- 必要に応じて説明のための文字列を渡すことも可能

```javascript
const obj = {};
const HOGE = Symbol();

obj[HOGE] = 123;
obj.HOGE = 999;
console.log(obj); // { HOGE: 999, [Symbol()]: 123 }

const FUGE = Symbol('FUGE');
obj[FUGE] = 123;
obj.FUGE = 999;
console.log(obj); // { HOGE: 999, FUGE: 999, [Symbol()]: 123, [Symbol(FUGE)]: 123 }
```

### for

```javascript
const data = [10, 20 ,30];
for (let i = 0; i < data.length; i++) { // インデックス：旧
  console.log(data[i]);
}
for (let i in data) { // インデックス：新
  console.log(data[i]);
}
data.forEach(value => { // 値：旧
  console.log(value);
});
for (let x of data) { // 値：新
  console.log(x);
}
```

### オブジェクトのコピー

```javascript
const obj_old = { a: 10, b: 20 };
const copy_old = {}
Object.assign(copy_old, obj_old);
console.log(copy_old); // { a: 10, b: 20 }
obj_old.b = 30;
console.log(copy_old); // { a: 10, b: 20 } // コピーであり参照でないことを確認

const obj_new = { a: 10, b: 20 };
const copy_new = { ...obj_new };
console.log(copy_new); // { a: 10, b: 20 }
obj_new.b = 30;
console.log(copy_new); // { a: 10, b: 20 } // コピーであり参照でないことを確認
```

### 参考

- [ECMAScript 2019時代のJavaScript入門書](https://jsprimer.net/)
- [ECMAScript® 2018 Language Specification](https://www.ecma-international.org/ecma-262/9.0/index.html)
- [【まとめ】JavaScriptでデザインパターン](https://qiita.com/kenju/items/4d32598ffddf86af82f2)
- [JavaScript/TypeScriptの例外ハンドリング戦略を考える](https://qiita.com/shibukawa/items/ffe7264ecff78f55b296)

## Node.js

### 参考

- [Node.js v12.9.0 Documentation](https://nodejs.org/api/all.html)
    - 公式、低レイヤの知識も身につき暇なときに読むべし
- [ノンブロッキングI/Oと非同期I/Oの違いを理解する](https://blog.takanabe.tokyo/2015/03/26/240/)
- [JSのデバッグにはconsole.log()ではなくNodeのデバッガーを使いなさい](https://www.webprofessional.jp/debugging-javascript-node-debugger/)
- [Node.jsのパフォーマンスチューニングのtips](https://blog.hiroppy.me/entry/2017/11/06/095943)
- [(初心者向け) Node.js コンソール (console) の使い方](https://qiita.com/tadnakam/items/dda690bb184fdc74851f)
- [Node.jsのデバッグ方法の話](https://qiita.com/daijinload/items/b89788deff9ad83acb42)
- [Node.js production checklist](https://speakerdeck.com/gergelyke/node-dot-js-production-checklist)
  - すごいいい
- [Node.jsでマイクロサービス Micro](https://qiita.com/chanuu/items/ffcc5a3289b8181f9032)
- [Node.js Performance 改善ガイド](https://yosuke-furukawa.hatenablog.com/entry/2017/12/05/125517)
- [JavaScript の仕組み：メモリ管理+ 4つの共通のメモリリーク処理方法](https://qiita.com/tkdn/items/ea4f034e0d661def244a)
