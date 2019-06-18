"use strict";

const PDFDocument = require("pdfkit");

const getPdf = async () => {
  const doc = new PDFDocument();
  const makePdf = () => {
    return new Promise((resolve, reject) => {
      try {
        const bufs = [];
        doc
        .fontSize(25)
        .text("TEST!!", 100, 100);
        doc.on("data", chunk => {
          bufs.push(chunk);
        });
        doc.on("end", () => {
          resolve(Buffer.concat(bufs));
        });
        doc.end();
      } catch (e) {
        reject(e);
      }
    })
  };
  const buffer = await makePdf();
  const base64Str = buffer.toString("base64");
  const pdfBase64 = "" + base64Str;
  return pdfBase64;
}

module.exports = {
  getPdf: getPdf
}
