"use strict";

const PDFDocument = require("pdfkit");
const htmlPdf = require("html-pdf");

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
    });
  };
  const buffer = await makePdf();
  const base64Str = buffer.toString("base64");
  const pdfBase64 = "data:application/pdf;base64," + base64Str;
  return pdfBase64;
}

const getPdfFromHtml = async () => {
  const lines = [
    "TEST TEXT",
    "TEST TEXT",
    "TEST TEXT",
  ];
  let pdfBody = "";
  for (let i in lines) {
    pdfBody += "<tr><td>" + lines[i] + "</td></tr>";
  }
  const html = `
  <!doctype html>
  <html lang="ja>
  <head></head>
  <body>
  <div style= "font-family: monospace; ">
  <table>
  ${pdfBody}
  </table>
  </div>
  </body>
  </html>
  `;

  const makePdf = () => {
    return new Promise((resolve, reject) => {
      try {
        htmlPdf.create(html, {}).toBuffer((err, buffer) => {
          if (err) {
            throw err;
          }
          resolve(buffer);
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  const buffer = await makePdf();
  const base64Str = buffer.toString("base64");
  const pdfBase64 = "data:application/pdf;base64," + base64Str;
  return pdfBase64;
}

module.exports = {
  getPdf: getPdf,
  getPdfFromHtml: getPdfFromHtml
}
