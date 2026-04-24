import React, { useRef, useEffect } from 'react';

function Editor({ content, onChange, onUndo, onRedo }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent native undo/redo and use our own DSA implementation
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          onUndo();
        } else if (e.key === 'y' || (e.key === 'Z' && e.shiftKey)) {
          e.preventDefault();
          onRedo();
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);
      return () => textarea.removeEventListener('keydown', handleKeyDown);
    }
  }, [onUndo, onRedo]);

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        className="editor-textarea"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing your awesome ideas here..."
        spellCheck="false"
      />
    </div>
  );
}

export default Editor;
