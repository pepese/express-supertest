'use strict';

const pdfUC = require('../pdf-uc');

describe('app/usecase/pdf-uc.js', () => {
  test('getPdf', async () => {
    return expect(await pdfUC.getPdf()).not.toEqual(null);
  });
  test('getPdfFromHtml', async () => {
    const result = await pdfUC.getPdfFromHtml();
    expect(result).not.toEqual(null);
  });
  test('makePdf', async () => {
    pdfUC.makePdf();
  });
});
