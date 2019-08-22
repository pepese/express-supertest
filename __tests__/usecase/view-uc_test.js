'use strict';

const pdfUC = require('../../app/usecase/view-uc');
// const fs = require('fs');

describe('app/usecase/view-uc.js', () => {
  test('getHtml', async () => {
    const result = await pdfUC.getHtml();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    // fs.writeFileSync('sample.html', result);
  });
  test('getPdf', async () => {
    const result = await pdfUC.getPdf();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    // fs.writeFileSync('sample.pdf', result);
  });
});
