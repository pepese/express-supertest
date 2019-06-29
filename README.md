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

- `use [DB]` : DB の選択。無ければ作成される。
- `show dbs` : DB 一覧。
- `show collections` : コレクション一覧。
- `db.stats()` : 現在の DB の状態表示。
- `db.createCollection(name, options)` : コレクションの作成。
- `db.コレクション名.コマンド名(options)` : 基本操作の構文。
    - `insert()` : 挿入。コレクションが無い場合、暗黙的に作成される。作成する方が望ましい。
    - `find()` : 検索。

{item1:{item2:{item3:"2014-10-10T13:50:40+09:00"}}}
db.sample.insert({item1:{item2:{item3:"2014-10-10T13:50:40+09:00"}}})
db.sampple.find()
db.sampple.find({item1:{item2:{item3: {$gte:"2014-10-10T13:50:40+09:00"}}}}) : だめ
db.sample.insert({item1:{item2:{item4:ISODate("2014-10-10T13:50:40+09:00")}}})
db.sampple.find({item1:{item2:{item4: {$gte:ISODate("2014-10-10T13:50:40+09:00")}}}}) : だめ
db.sampple.find({item1.item2.item3: {$gte:"2014-10-10T13:50:40+09:00"}}) : だめ

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

ISODate は必要？ -> 日付を文字列として格納するとaggregateで日付として扱えない -> ISODate を適用して挿入するしかない模様、、、
