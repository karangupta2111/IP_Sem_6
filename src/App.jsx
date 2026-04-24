import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import { useDebounce } from './hooks/useDebounce';
import { Stack } from './utils/stack';
import './index.css';

function App() {
  // Global State
  const [title, setTitle] = useState(() => localStorage.getItem('editor_title') || '');
  const [content, setContent] = useState(() => localStorage.getItem('editor_content') || '');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [lastSaved, setLastSaved] = useState(() => localStorage.getItem('editor_last_saved') || null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('editor_theme') === 'dark');

  // Stacks for Undo/Redo implementation
  const undoStackRef = useRef(new Stack());
  const redoStackRef = useRef(new Stack());
  
  // Ref to prevent auto-save on initial mount
  const isInitialMount = useRef(true);
  
  // Dummy state to trigger re-renders when stacks change
  const [, setStackSize] = useState(0);
  const updateStackState = () => setStackSize(Date.now());

  // Save logic
  const saveToStorage = useCallback((currentTitle, currentContent) => {
    setSaveStatus('Saving...');
    
    setTimeout(() => {
      localStorage.setItem('editor_title', currentTitle);
      localStorage.setItem('editor_content', currentContent);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('editor_last_saved', timestamp);
      setLastSaved(timestamp);
      setSaveStatus('Saved');
    }, 600);
  }, []);

  const debouncedSave = useDebounce(saveToStorage, 1500);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    setSaveStatus('Typing...');
    debouncedSave(title, content);
  }, [title, content, debouncedSave]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((newContent) => {
    setContent((prevContent) => {
      if (prevContent !== newContent) {
        undoStackRef.current.push(prevContent);
        redoStackRef.current.clear();
        updateStackState();
      }
      return newContent;
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (!undoStackRef.current.isEmpty()) {
      setContent((prevContent) => {
        redoStackRef.current.push(prevContent);
        const nextContent = undoStackRef.current.pop();
        updateStackState();
        return nextContent;
      });
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (!redoStackRef.current.isEmpty()) {
      setContent((prevContent) => {
        undoStackRef.current.push(prevContent);
        const nextContent = redoStackRef.current.pop();
        updateStackState();
        return nextContent;
      });
    }
  }, []);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title || 'Untitled Document'}.txt`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('editor_theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const handleNewFile = () => {
    if (window.confirm('Are you sure you want to create a new file? Unsaved changes may be lost.')) {
      setTitle('');
      setContent('');
      undoStackRef.current.clear();
      redoStackRef.current.clear();
      updateStackState();
      localStorage.removeItem('editor_title');
      localStorage.removeItem('editor_content');
      setLastSaved(null);
      localStorage.removeItem('editor_last_saved');
      setSaveStatus('Saved');
    }
  };

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      
      setTitle(fileName);
      setContent(fileContent);
      undoStackRef.current.clear();
      redoStackRef.current.clear();
      updateStackState();
      setSaveStatus('Saved');
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const wordCount = useMemo(() => {
    const text = content.trim();
    return text ? text.split(/\s+/).length : 0;
  }, [content]);

  const charCount = content.length;

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Animated Background Elements */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>

      <div className="app-container">
        <main className="main-content glass-effect">
          <Toolbar 
            title={title}
            onTitleChange={handleTitleChange}
            saveStatus={saveStatus}
            lastSaved={lastSaved}
            wordCount={wordCount}
            charCount={charCount}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={!undoStackRef.current.isEmpty()}
            canRedo={!redoStackRef.current.isEmpty()}
            onDownload={handleDownload}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onNewFile={handleNewFile}
            onOpenFile={handleOpenFile}
          />
          <Editor 
            content={content} 
            onChange={handleContentChange}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
