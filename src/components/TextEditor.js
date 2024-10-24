import React, { useState, useEffect } from 'react';

const TextEditor = ({ setText, addText, updateText }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [color, setColor] = useState('#000');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    // Call updateText whenever fontSize, fontFamily, or color changes
    updateText(fontSize, fontFamily, color);
  }, [fontSize, fontFamily, color, updateText]); // Only update if dependencies change

  return (
    <div className="text-editor">
      <input
        type="text"
        placeholder="Enter text"
        onChange={handleTextChange}
      />
      <select onChange={(e) => setFontFamily(e.target.value)} value={fontFamily}>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        {/* Add more font options as needed */}
      </select>
      <input
        type="number"
        min="1"
        max="100"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={() => addText(fontSize, fontFamily, color)}>Add Text</button>
    </div>
  );
};

export default TextEditor;


// import React, { useEffect, useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// const TextEditor = ({ setText, addText, updateText }) => {
//   const [fontSize, setFontSize] = useState(16);
//   const [fontFamily, setFontFamily] = useState('Arial');
//   const [color, setColor] = useState('#000');
//   const [editorContent, setEditorContent] = useState('');

//   const handleEditorChange = (content) => {
//     setEditorContent(content); // Update the editor content
//     setText(content); // Update the text in the parent component
//   };

//   useEffect(() => {
//     // Call updateText whenever fontSize, fontFamily, or color changes
//     updateText(fontSize, fontFamily, color);
//   }, [fontSize, fontFamily, color, updateText]);

//   return (
//     <div className="text-editor">
//       <Editor
//         apiKey="your-tinymce-api-key" // Optional, can be omitted for local use
//         value={editorContent}
//         init={{
//           height: 300,
//           menubar: false,
//           plugins: ['advlist autolink lists link image charmap print preview anchor',
//             'searchreplace visualblocks code fullscreen',
//             'insertdatetime media table paste code help wordcount'],
//           toolbar: 'undo redo | formatselect | bold italic backcolor | \
//           alignleft aligncenter alignright alignjustify | \
//           bullist numlist outdent indent | removeformat | help',
//           content_style: 'body { font-family:Arial, sans-serif; font-size:14px }'
//         }}
//         onEditorChange={handleEditorChange}
//       />

//       {/* Additional controls for font settings */}
//       <select onChange={(e) => setFontFamily(e.target.value)} value={fontFamily}>
//         <option value="Arial">Arial</option>
//         <option value="Georgia">Georgia</option>
//         <option value="Times New Roman">Times New Roman</option>
//         <option value="Courier New">Courier New</option>
//         {/* Add more font options as needed */}
//       </select>

//       <input
//         type="number"
//         min="1"
//         max="100"
//         value={fontSize}
//         onChange={(e) => setFontSize(Number(e.target.value))}
//       />

//       <input
//         type="color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//       />

//       <button onClick={() => addText(fontSize, fontFamily, color)}>Add Text</button>
//     </div>
//   );
// };

// export default TextEditor;
