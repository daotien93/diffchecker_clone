export function computeDiff(left, right) {
  const leftLines = left.split('\n');
  const rightLines = right.split('\n');

  const maxLen = Math.max(leftLines.length, rightLines.length);
  const leftStatus = [];
  const rightStatus = [];

  for (let i = 0; i < maxLen; i += 1) {
    const l = leftLines[i];
    const r = rightLines[i];

    if (l === undefined && r !== undefined) {
      leftStatus[i] = 'same';
      rightStatus[i] = 'added';
    } else if (l !== undefined && r === undefined) {
      leftStatus[i] = 'removed';
      rightStatus[i] = 'same';
    } else if (l === r) {
      leftStatus[i] = 'same';
      rightStatus[i] = 'same';
    } else {
      leftStatus[i] = 'changed';
      rightStatus[i] = 'changed';
    }
  }

  return {
    left: leftStatus,
    right: rightStatus
  };
}

