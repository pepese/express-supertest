'use strict';

const pdfUC = require('../view-uc');
const fs = require('fs');

describe('app/usecase/view-uc.js', () => {
  test('getHtml', async () => {
    const result = await pdfUC.getHtml();
    fs.writeFileSync('sample.html', result);
  });
  test('getPdf', async () => {
    const result = await pdfUC.getPdf();
    fs.writeFileSync('sample.pdf', result);
  });
});
