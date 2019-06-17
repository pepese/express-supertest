"use strict";

const PDFDocument = require("pdfkit");
const fs = require("fs");
const fr = new FileReader();

const getPdf = () => {
  const doc = new PDFDocument();
  //doc.pipe(fs.createWriteStream('output.pdf'));
  doc
   .fontSize(25)
   .text("TEST!!", 100, 100);
  doc.end();
  console.log('!!!!!!! doc.toString(): %o', doc.toString());
  //console.log('typeof doc: %s', typeof doc);
  const toString = Object.prototype.toString
  console.log('!!!!!!! toString.call(doc): %s', toString.call(doc));
  //console.log('!!!!!!! doc: %o', doc);
  fr.readAsDataURL(doc);
  fr.onload = () => {
    const r = fr.result;
    console.log('!!!!!! r: %s', r);
    //r.slice(r.indexOf(',') + 1);
    return r;
  };
}

module.exports = {
  getPdf: getPdf
}
