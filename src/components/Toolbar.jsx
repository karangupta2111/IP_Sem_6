import React, { useRef } from 'react';

function Toolbar({ 
  title, 
  onTitleChange, 
  saveStatus, 
  lastSaved, 
  wordCount, 
  charCount,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDownload,
  isDarkMode,
  toggleDarkMode,
  onNewFile,
  onOpenFile
}) {
  const fileInputRef = useRef(null);

  const handleOpenClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-top">
        <input 
          type="text" 
          className="title-input" 
          value={title} 
          onChange={onTitleChange} 
          placeholder="Untitled Document"
          aria-label="Document Title"
        />
        <div className="toolbar-actions">
          <button className="action-btn" onClick={onNewFile} title="New File">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          </button>
          <button className="action-btn" onClick={handleOpenClick} title="Open File">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h16"/><path d="M3 15l-3 7"/><path d="M19 15l3 7"/></svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".txt,.md,.json,.js,.csv,.html,.css" 
            onChange={onOpenFile} 
          />
          <div className="divider"></div>
          <button 
            className="action-btn" 
            onClick={onUndo} 
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          <button 
            className="action-btn" 
            onClick={onRedo} 
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
          </button>
          <div className="divider"></div>
          <button className="action-btn" onClick={onDownload} title="Download as .txt">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </button>
          <button className="action-btn theme-toggle" onClick={toggleDarkMode} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="toolbar-bottom">
        <div className="status-indicator">
          <span className={`status-dot ${saveStatus === 'Saving...' ? 'saving' : saveStatus === 'Saved' ? 'saved' : 'typing'}`}></span>
          <span className="status-text">{saveStatus}</span>
          {lastSaved && <span className="last-saved">Last saved: {lastSaved}</span>}
        </div>
        
        <div className="stats">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
