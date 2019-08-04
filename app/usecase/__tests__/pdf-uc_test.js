'use strict';

const pdfUC = require('../pdf-uc');
const fs = require('fs');

describe('app/usecase/pdf-uc.js', () => {
  test('getPdf', async () => {
    return expect(await pdfUC.getPdf()).not.toEqual(null);
  });
  test('getHtml', async () => {
    const result = await pdfUC.getHtml();
    fs.writeFileSync('sample.html', result);
  });
  test('getPdfFromHtml', async () => {
    const result = await pdfUC.getPdfFromHtml();
    expect(result).not.toEqual(null);
  });
  test('makePdf', async () => {
    pdfUC.makePdf();
  });
});
