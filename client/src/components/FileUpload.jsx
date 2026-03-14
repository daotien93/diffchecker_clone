import React from 'react';

const textAreaStyle = {
  width: '100%',
  minHeight: '220px',
  background: '#ffffff',
  color: '#0f172a',
  borderRadius: '0.5rem',
  border: '1px solid #e5e7eb',
  padding: '0.75rem',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.85rem',
  resize: 'vertical',
  boxSizing: 'border-box'
};

const FileUpload = ({ leftText, rightText, onLeftChange, onRightChange }) => {
  const handleFileLoad = (file, sideSetter) => {
    const reader = new FileReader();
    reader.onload = e => {
      sideSetter(e.target.result || '');
    };
    reader.readAsText(file);
  };

  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Original</span>
            <input
              type="file"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleFileLoad(file, onLeftChange);
              }}
              style={{ fontSize: '0.75rem' }}
            />
          </div>
          <textarea
            style={textAreaStyle}
            value={leftText}
            onChange={e => onLeftChange(e.target.value)}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Modified</span>
            <input
              type="file"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleFileLoad(file, onRightChange);
              }}
              style={{ fontSize: '0.75rem' }}
            />
          </div>
          <textarea
            style={textAreaStyle}
            value={rightText}
            onChange={e => onRightChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default FileUpload;

