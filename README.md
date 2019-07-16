# reqId の設定

`express-http-context` を利用して 1 リクエスト中に利用できる key-value に reqId を設定する。  
その値を logger が取得してログ出力時に reqId を付与する。  
reqId には uuidv4 を利用する。  
なお、`express-http-context` では スレッドローカルのように動作する **Continuation-local storage** が利用される。  
詳しくは [ここ](https://github.com/jeff-lewis/cls-hooked#readme) 。

# JWT

## 予約済みクレーム名

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

# JSON Schema

- [json-schema.org](https://json-schema.org/)
- [Ajv: Another JSON Schema Validator](https://github.com/epoberezkin/ajv)
    - Ajv version 6.0.0 that supports JSON Schema draft-07 is released.

# MongoDB

```bash
$ docker pull mongo:3.6.13-xenial
$ docker run -d --name mongo -p 27017:27017 mongo:3.6.13-xenial
$ docker exec -it mongo bash
:/# mongo
>
```

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

## Jest で MongoDB アプリをテストするとき

[ここ](https://jestjs.io/docs/en/mongodb)を参考に以下を利用してもよい。

```bash
$ npm i -D @shelf/jest-mongodb
```

## 操作メモ

```
{item1:{item2:{item3:"2014-10-10T13:50:40+09:00"}}}
db.sample.insert({item1:{item2:{item3:"2014-10-10T13:50:40+09:00"}}})
db.sampple.find()
db.sampple.find({item1:{item2:{item3: {$gte:"2014-10-10T13:50:40+09:00"}}}}) : だめ
db.sample.insert({item1:{item2:{item4:ISODate("2014-10-10T13:50:40+09:00")}}})
db.sampple.find({item1:{item2:{item4: {$gte:ISODate("2014-10-10T13:50:40+09:00")}}}}) : NG
db.sampple.find({item1.item2.item3: {$gte:"2014-10-10T13:50:40+09:00"}}) : NG

db.sampple.find({"item1.item2.item3": {$gte:"2014-10-10T13:50:40+09:00"}}) : NG
db.sampple.find({"item1.item2.item4": {"$gte":ISODate("2014-10-10T13:50:40+09:00")}}) : NG


db.sample2.insert({item1: ISODate("2014-10-10T13:50:40+09:00")})
db.sample2.find({item1: {"$gte":ISODate("2014-10-10T13:50:40+09:00")}}) : OK


db.sample2.insert({item2: {item3: ISODate("2014-10-10T13:50:40+09:00")}})
db.sample2.find({"item2.item3": {"$gte":ISODate("2014-10-10T13:50:40+09:00")}})

db.sample3.insert({item1:{item2:{item3:ISODate("2014-10-10T13:50:40+09:00")}}})
db.sample3.find({"item1.item2.item3": {"$gte":ISODate("2014-10-10T13:50:40+09:00")}}) : OK

db.sample4.insert({item1: "2014-10-10T13:50:40+09:00"})
db.sample4.find({item1: {"$gte":"2014-10-10T13:50:40+09:00"}})

db.sample5.insert({item1:{item2:{item3:"2014-10-10T13:50:40+09:00"}}})
db.sample5.find({"item1.item2.item3": {"$gte":"2014-10-10T13:50:40+09:00"}}) : OK
```

- ISODate は必要？ -> 日付を文字列として格納するとaggregateで日付として扱えない -> ISODate を適用して挿入するしかない模様、、、
- ISODate は Date型へ変換してるだけ
