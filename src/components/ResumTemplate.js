import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResumTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('https://api.reactiveresume.com/templates');
        
        // Check if the response contains a valid array of templates
        if (Array.isArray(response.data.data)) {
          setTemplates(response.data.data);  // Update templates state with the array
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError('Error fetching templates');
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="template-list">
      {templates.map((template, index) => (
        <div key={index} className="template-item">
          <h3>{template.name}</h3>
          <img src={template.thumbnail} alt={template.name} />
        </div>
      ))}
    </div>
  );
}

export default ResumTemplate;
