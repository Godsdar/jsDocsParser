import axios from "axios";
import { parse } from "node-html-parser";

function findH2(data) {
  const h2 = [];
  const paragraphs = [];
  const doc = parse(data);
  const elements = doc.querySelectorAll("h2");

  for (let element of elements) {
    h2.push(element.textContent);
    paragraphs.push(element.nextElementSibling.textContent);
  }
  return {
    headers: h2,
    paragraphs: paragraphs,
  };
}

function parseToMarkdown(docsHeaders) {
  let markdown = "";
  for (const key in docsHeaders) {
    markdown += `## ${docsHeaders[key].header}\n\n${docsHeaders[key].paragraph}\n\n`;
  }
  return markdown;
}

const url = "https://react.dev/learn";

const response = await axios.get(url);
const { data } = response;

const returnedInformation = findH2(data);
const h2 = returnedInformation.headers;
const paragraphs = returnedInformation.paragraphs;
const docsHeaders = {};

for (let i = 0; i < h2.length; i++) {
  docsHeaders[i] = {
    header: h2[i],
    paragraph: paragraphs[i],
  };
}

const markdown = parseToMarkdown(docsHeaders);

console.log(markdown);
