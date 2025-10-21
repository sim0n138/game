import React, { useState, useEffect } from 'react';
import './CodeEditor.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  currentLine?: number;
  error?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, currentLine, error }) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const highlighted = highlightSyntax(value);
    setHighlightedCode(highlighted);
  }, [value]);

  const highlightSyntax = (code: string): string => {
    const keywords = ['if', 'while', 'function'];
    const commands = ['moveForward', 'turnLeft', 'turnRight', 'canMoveForward', 'atGoal'];
    
    let result = code;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      result = result.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Highlight commands
    commands.forEach(command => {
      const regex = new RegExp(`\\b${command}\\b`, 'g');
      result = result.replace(regex, `<span class="command">${command}</span>`);
    });
    
    // Highlight comments
    result = result.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    
    // Highlight braces
    result = result.replace(/([{}()])/g, '<span class="brace">$1</span>');
    
    return result;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lines = value.split('\n');
  const lineNumbers = lines.map((_, i) => i + 1).join('\n');

  return (
    <div className="code-editor-container">
      <div className="code-editor">
        <div className="line-numbers">
          {lineNumbers.split('\n').map((num, idx) => (
            <div
              key={idx}
              className={`line-number ${currentLine === idx + 1 ? 'current-line' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="editor-content">
          <textarea
            className="code-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="// Write your code here..."
          />
          <div
            className="code-highlight"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
