import React, { useState, useEffect } from 'react';

const lineStyleBase = {
  padding: '0.2rem 0.6rem',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.8rem',
  whiteSpace: 'pre-wrap'
};

const DiffEditor = ({ leftText, rightText, diffResult }) => {
  const leftLines = leftText.split('\n');
  const rightLines = rightText.split('\n');

  const leftStatuses = diffResult?.left || [];
  const rightStatuses = diffResult?.right || [];

  const removals = leftStatuses.filter(s => s === 'removed' || s === 'changed').length;
  const additions = rightStatuses.filter(s => s === 'added' || s === 'changed').length;

  const [formatInput, setFormatInput] = useState('');
  const [formatOutput, setFormatOutput] = useState('');
  const [copiedTarget, setCopiedTarget] = useState(null);

  useEffect(() => {
    if (formatInput.trim() === '') {
      setFormatOutput('');
    }
  }, [formatInput]);

  const formatAsJson = () => {
    const text = formatInput.trim();
    if (!text) {
      setFormatOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(text);
      setFormatOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // Best-effort: không phá dữ liệu gốc, chỉ copy sang bên phải
      setFormatOutput(text);
    }
  };

  const formatAsXml = () => {
    const xml = formatInput.trim();
    if (!xml) {
      setFormatOutput('');
      return;
    }

    const formatted = xml
      .replace(/>\s+</g, '><') // collapse whitespace between tags
      .replace(/></g, '>\n<') // split tags to lines
      .split('\n')
      .reduce(
        (acc, line) => {
          const trimmed = line.trim();
          const closingTag = /^<\/.+>/.test(trimmed);
          const selfClosing = /\/>$/.test(trimmed) || /^<.+\/>/.test(trimmed);
          const openingTag = /^<[^/?!][^>]*?>$/.test(trimmed) && !selfClosing;

          let { indent, lines } = acc;

          if (closingTag) {
            indent = Math.max(indent - 1, 0);
          }

          const currentIndent = '  '.repeat(indent);
          lines.push(currentIndent + trimmed);

          if (openingTag) {
            indent += 1;
          }

          return { indent, lines };
        },
        { indent: 0, lines: [] }
      ).lines
      .join('\n');

    setFormatOutput(formatted);
  };

  const formatAsRaw = () => {
    setFormatOutput(formatInput);
  };

  const formatAsRobotCode = () => {
    const lines = formatInput.split('\n').map(l => l.trim());
    const robot = lines.map(l => (l ? `- ${l}` : '')).join('\n');
    setFormatOutput(robot);
  };

  const handleCopy = async (text, target) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text || '');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text || '';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedTarget(target);
      setTimeout(() => setCopiedTarget(null), 1500);
    } catch (e) {
      // swallow errors silently
    }
  };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '0.95rem' }}>Diff Result</h2>
        {removals > 0 && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              padding: '0.1rem 0.5rem',
              borderRadius: '999px',
              background: '#fee2e2',
              color: '#b91c1c'
            }}
          >
            <span style={{ fontWeight: 700 }}>- {removals}</span>
            <span>{removals === 1 ? 'removal' : 'removals'}</span>
          </span>
        )}
        {additions > 0 && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              padding: '0.1rem 0.5rem',
              borderRadius: '999px',
              background: '#dcfce7',
              color: '#15803d'
            }}
          >
            <span style={{ fontWeight: 700 }}>+ {additions}</span>
            <span>{additions === 1 ? 'addition' : 'additions'}</span>
          </span>
        )}
      </div>
      <div
        style={{
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
      >
        <div style={{ background: '#ffffff', borderRight: '1px solid #e5e7eb' }}>
          {leftLines.map((line, idx) => {
            const status = diffResult?.left?.[idx] || 'same';
            let style = { ...lineStyleBase };

            if (status === 'removed' || status === 'changed') {
              style.background = '#fee2e2'; // soft red
              style.color = '#7f1d1d';
              style.borderLeft = '3px solid #ef4444';
            }

            return (
              <div key={idx} style={style}>
                {line || ' '}
              </div>
            );
          })}
        </div>
        <div style={{ background: '#ffffff' }}>
          {rightLines.map((line, idx) => {
            const status = diffResult?.right?.[idx] || 'same';
            let style = { ...lineStyleBase };

            if (status === 'added' || status === 'changed') {
              style.background = '#dcfce7'; // soft green
              style.color = '#14532d';
              style.borderLeft = '3px solid #22c55e';
            }

            return (
              <div key={idx} style={style}>
                {line || ' '}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          marginTop: '1.25rem',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
          background: '#ffffff'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Format helper</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={formatAsJson}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              JSON
            </button>
            <button
              type="button"
              onClick={formatAsXml}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              XML
            </button>
            <button
              type="button"
              onClick={formatAsRaw}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Raw
            </button>
            <button
              type="button"
              onClick={formatAsRobotCode}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Code robot
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}
        >
          <div style={{ position: 'relative' }}>
            <textarea
              placeholder="Paste any text / JSON / XML here..."
              style={{
                width: '100%',
                minHeight: '220px',
                ...lineStyleBase,
                fontSize: '0.8rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb'
              }}
              value={formatInput}
              onChange={e => setFormatInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleCopy(formatInput, 'input')}
              style={{
                position: 'absolute',
                right: '0.4rem',
                bottom: '0.35rem',
                padding: '0.1rem 0.35rem',
                borderRadius: '999px',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              {copiedTarget === 'input' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <textarea
              readOnly
              placeholder="Formatted output"
              style={{
                width: '100%',
                minHeight: '220px',
                ...lineStyleBase,
                fontSize: '0.8rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}
              value={formatOutput}
            />
            <button
              type="button"
              onClick={() => handleCopy(formatOutput, 'output')}
              style={{
                position: 'absolute',
                right: '0.4rem',
                bottom: '0.35rem',
                padding: '0.1rem 0.35rem',
                borderRadius: '999px',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              {copiedTarget === 'output' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiffEditor;

