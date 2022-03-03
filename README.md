# Web昆布

[![CI](https://github.com/livewing/web-conv/workflows/CI/badge.svg)](https://github.com/livewing/web-conv/actions?query=workflow%3ACI)
[![LICENSE](https://img.shields.io/github/license/livewing/web-conv)](./LICENSE)

![App](https://user-images.githubusercontent.com/7447366/156334687-00b7fee9-c5f5-4cfa-8fe2-ece534af0c28.png)

ゲームパッドを使用してメロディーやコードを演奏することができる Web アプリケーションです。大合奏!バンドブラザーズのフリー演奏に相当する機能を実行できます。

[アナコンMIDI昆布](https://www.nicovideo.jp/watch/sm3964382) や [あの昆布](https://www.nicovideo.jp/watch/sm6587448) の Web 版に相当します。

## 実行

[Web昆布](https://web-conv.livewing.net/)

注意: macOS 上の Safari と Chromium (Google Chrome) 、 Arch Linux 上の Chromium (Google Chrome) で動作を確認しています。 Firefox ではゲームパッドの十字キーがボタンではなくスティックとして認識される場合があるため、すべての機能を使用できない可能性があります。また、環境によってはサウンド出力に遅延が発生する場合があります。

## 使用方法

[使用方法](./doc/how-to-use.md)

## 開発

### clone と実行

```
$ git clone https://github.com/livewing/web-conv.git
$ cd web-conv
$ npm i
$ npm start
```

`PORT=8080` で `webpack-dev-server` が動きます。

### Storybook

```
$ npm run storybook
```

`PORT=6006` で Storybook が動きます。

### テスト

```
$ npm t
```

Jest によるテスト (StoryShots スナップショットテストを含む) を実行します。 UI の変更でスナップショットを更新する必要があるときは以下を実行します。

```
$ npm t -- -u
```

### ビルド

```
$ npm run build
```

`dist/` ディレクトリにバンドルが書き出されます。

## To Do

- [ ] 音声サンプルの読み込み
- [ ] スティックによるコントロールチェンジ

## ライセンス

[The MIT License](./LICENSE) でライセンスされています。
