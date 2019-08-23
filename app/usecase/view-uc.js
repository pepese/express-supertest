'use strict';

const PdfPrinter = require('pdfmake');
const sizeOf = require('image-size');
const path = require('path');

module.exports = class ViewUsecase {
  /**
   * 等幅フォント（Kosugi）・ HTML を使って綺麗に整列表示する。
   * フォントは Google Fonts (https://fonts.google.com/?subset=japanese) から取得。
   * 半角スペースは「&ensp;」、全角スペースは「&emsp;」がぴったり！
   * 「&nbsp;」は半角スペースより狭いので注意。
   */
  static getHtml() {
    const lines = [
      'TEST TEXT',
      '                     TEST       TEXT',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'yyyyy                          yyyyy',
      'ああああああああああああああああああ', // 等幅フォントの場合、全角の幅は半角の倍
      'あああああ　　　　　　　　あああああ', // 全角スペースもまた然り
    ];
    let pdfBody = '';
    for (let i in lines) {
      lines[i] = lines[i].replace(/ /g, '&ensp;'); // 半角スペース
      //lines[i] = lines[i].replace(/　/g, '&emsp;'); // 全角スペース
      pdfBody += '<tr><td>' + lines[i] + '</td></tr>\n';
    }
    const html = `
    <!doctype html>
    <html lang="ja">
    <head>
    <!-- Kosugi font loading -->
    <link href="https://fonts.googleapis.com/css?family=Kosugi&display=swap" rel="stylesheet">
    </head>
    <body>
    <div style="text-align: center;">
    <!-- Kosugi font : 'font-family: 'Kosugi', sans-serif;' -->
    <div style="font-family: 'Kosugi', sans-serif; border: solid 1px #000; display: inline-block; text-align: left;">
    <table>
    ${pdfBody}
    </table>
    </div>
    </div>
    </body>
    </html>
    `;
    return html;
  }

  /**
   * pdfMakeの単位は「us pt」（1pt = 0.35278mm）
   */
  static async getPdf() {
    const lines = [
      'TEST TEXT',
      '                     TEST       TEXT',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'yyyyy                          yyyyy',
      'ああああああああああああああああああ', // 等幅フォントの場合、全角の幅は半角の倍
      'あああああ　　　　　　　　あああああ', // 全角スペースもまた然り
    ];
    // data
    const fonts = {
      Roboto: {
        normal: path.join(__dirname, 'font/ipag.ttf'),
      },
    };
    const testImageDataUrl =
      'data:image/png;base64,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';
    const dimensions = sizeOf(
      Buffer.from(testImageDataUrl.substr(22), 'base64')
    ); // dimensions.width, dimensions.height = 90, 90
    // parameter
    const maxWardNums = 36; // 横の半角文字数上限、全角は半角2文字分の扱い
    const fontSize = 20;
    const fontWHratio = 1 / 2; // フォントの縦横比：横÷縦
    const pageMargin = 20; // ページ上下左右のマージン
    let width = pageMargin * 2 + maxWardNums * fontSize * fontWHratio; // マージン＋横のフォントサイズの合計
    let height = pageMargin * 2 + (dimensions.height / dimensions.width) * 200; // マージン＋縦の画像サイズ（後々行数に応じて縦のフォントサイズを加算）
    // define contents
    const docDefinition = {};
    docDefinition.pageMargins = pageMargin;
    docDefinition.content = [];
    docDefinition.content.push({
      image: testImageDataUrl,
      width: 200,
      alignment: 'center',
    });
    for (let text of lines) {
      // 細かい設定は以下を参照
      // https://gist.github.com/jfdesrochers/08833957232a04638c1cad4d071b31e9
      docDefinition.content.push({
        text: text,
        fontSize: fontSize,
        preserveLeadingSpaces: true, // 空白を正しく表示
      });
      height += fontSize;
    }
    docDefinition.pageSize = {width: width, height: height};
    // make pdf
    const makePdf = () => {
      return new Promise((resolve, reject) => {
        try {
          const bufs = [];
          const printer = new PdfPrinter(fonts);
          const pdfDoc = printer.createPdfKitDocument(docDefinition);
          pdfDoc.on('data', chunk => {
            bufs.push(chunk);
          });
          pdfDoc.on('end', () => {
            resolve(Buffer.concat(bufs));
          });
          pdfDoc.end();
        } catch (e) {
          reject(e);
        }
      });
    };
    const buffer = await makePdf();
    return buffer;
  }
};
