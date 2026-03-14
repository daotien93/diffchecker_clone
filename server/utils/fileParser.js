function parseLines(text) {
  if (typeof text !== 'string') return [];
  return text.replace(/\r\n/g, '\n').split('\n');
}

module.exports = { parseLines };

