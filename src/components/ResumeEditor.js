import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Textbox,Rect } from 'fabric'; // Ensure you're using the right import
import ResumTemplate from './ResumTemplate';
import TextEditor from './TextEditor';
import './ResumeEditor.css';

function ResumeEditor() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState('');
  const [zoom, setZoom] = useState(1); // Track the zoom level

  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current, {
      width:1110,
      height:600,  
      backgroundColor: '#f0f0f0',
    });

    // Draw an A4 page (595x842 pixels)
    const a4Rect = new Rect({
    left: (fabricCanvas.width - 595) / 2, // Center horizontally
    top: (fabricCanvas.height - 842) / 2, // Center vertically
    width: 595,
    height: 842,
    fill: '#ffffff',
    selectable: false, // Make it unselectable
  });

  fabricCanvas.add(a4Rect); 

    // Handle mouse wheel zoom
    fabricCanvas.on('mouse:wheel', (opt) => {
      opt.e.preventDefault();
      opt.e.stopPropagation();
      const delta = opt.e.deltaY;
      const newZoom = delta > 0 ? zoom * 0.9 : zoom * 1.1; // Adjust zoom factor
      setZoom(newZoom);
      fabricCanvas.setZoom(newZoom);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []); // Empty dependency array ensures it only runs once

  const handleAddText = (fontSize, fontFamily, color) => {
    if (canvas && text.trim()) {
      const fabricText = new Textbox(text, {
        left: 100,
        top: 100,
        fontSize: fontSize || 16,
        fontFamily: fontFamily || 'Arial', // Fallback to Arial
        fill: color || '#000', // Set color
      });
      canvas.add(fabricText);
      canvas.setActiveObject(fabricText); // Select the newly added text
      canvas.renderAll();
    }
  };

  const updateSelectedText = (fontSize, fontFamily, color) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({
          fontSize: fontSize || activeObject.fontSize,
          fontFamily: fontFamily || activeObject.fontFamily,
          fill: color || activeObject.fill,
        });
        canvas.renderAll(); // Re-render the canvas
      }
    }
  };

  // Optionally, you could have an effect that listens for changes to `text`
  // and automatically updates the selected text in the canvas.
  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'textbox') {
        activeObject.set('text', text); // Update the text dynamically
        canvas.renderAll();
      }
    }
  }, [text, canvas]); // Only run if text changes

  return (
    <div className='resume-canvas'>
      <div className='Resume-template'>
        <ResumTemplate />
      </div>
      <div className='canvas'>
        <div className='test-editor'>
          <TextEditor
            setText={setText}
            addText={handleAddText}
            updateText={updateSelectedText}
          />
        </div>
        <div className='resume-canvas-area'>
          <canvas ref={canvasRef} id="designCanvas" />
        </div>
      </div>
    </div>
  );
}

export default ResumeEditor;







