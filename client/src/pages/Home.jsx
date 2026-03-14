import React, { useState } from 'react';
import Toolbar from '../components/Toolbar.jsx';
import FileUpload from '../components/FileUpload.jsx';
import DiffEditor from '../components/DiffEditor.jsx';
import { computeDiff } from '../utils/diffHelper.js';

const Home = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffResult, setDiffResult] = useState(null);

  const handleCompare = () => {
    const result = computeDiff(leftText, rightText);
    setDiffResult(result);
  };

  const handleClear = () => {
    setLeftText('');
    setRightText('');
    setDiffResult(null);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#0f172a' }}>
      <Toolbar onCompare={handleCompare} onClear={handleClear} />
      <main style={{ padding: '1rem 2rem' }}>
        <FileUpload
          leftText={leftText}
          rightText={rightText}
          onLeftChange={setLeftText}
          onRightChange={setRightText}
        />
        <DiffEditor leftText={leftText} rightText={rightText} diffResult={diffResult} />
      </main>
    </div>
  );
};

export default Home;

