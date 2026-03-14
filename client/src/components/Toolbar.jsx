import React from 'react';

const Toolbar = ({ onCompare, onClear }) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2rem',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>Diffchecker By Ti Dao</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={onClear}
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            color: '#374151',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
        <button
          type="button"
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            color: '#374151',
            fontSize: '0.85rem',
            cursor: 'default'
          }}
        >
          Export ▾
        </button>
        <button
          type="button"
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '0.375rem',
            border: '1px solid #111827',
            background: '#111827',
            color: '#f9fafb',
            fontSize: '0.85rem',
            cursor: 'default'
          }}
        >
          Save
        </button>
        <button
          type="button"
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '0.375rem',
            border: '1px solid #0f766e',
            background: '#14b8a6',
            color: '#ecfeff',
            fontSize: '0.85rem',
            cursor: 'default'
          }}
        >
          Share
        </button>
        <button
          onClick={onCompare}
          style={{
            marginLeft: '0.5rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '0.375rem',
            border: 'none',
            background: '#22c55e',
            color: '#022c22',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Compare
        </button>
      </div>
    </header>
  );
};

export default Toolbar;

