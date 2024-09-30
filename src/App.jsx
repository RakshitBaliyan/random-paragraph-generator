import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [paragraphCount, setParagraphCount] = useState('');
  const [paragraphs, setParagraphs] = useState([]);
  const [copyStatus, setCopyStatus] = useState({}); // To track copy status for each paragraph
  const [copyAllStatus, setCopyAllStatus] = useState(false); // To track copy all status

  // Array of words for generating random sentences
  const words = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'Integer', 'neque', 'venenatis', 'vitae', 'mollis', 'nibh', 'sollicitudin',
    'aliquam', 'sagittis', 'urna', 'quis', 'condimentum', 'finibus', 'ut',
    'turpis', 'metus', 'porttitor', 'vel', 'velit', 'gravida', 'blandit',
    'tempus', 'auctor', 'hendrerit', 'tincidunt'
  ];

  // Function to generate a random sentence
  const generateRandomSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 13) + 8; // 8 to 20 words
    let sentence = '';

    for (let i = 0; i < sentenceLength; i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      sentence += word + ' ';
    }

    // Capitalize the first letter and add a period at the end
    sentence = sentence.trim();
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    return sentence;
  };

  // Function to generate a paragraph with 8-10 sentences
  const generateParagraph = () => {
    const numberOfSentences = Math.floor(Math.random() * 3) + 8; // 8 to 10 sentences
    let paragraph = '';

    for (let i = 0; i < numberOfSentences; i++) {
      paragraph += generateRandomSentence() + ' ';
    }

    return paragraph.trim();
  };

  // Handler for generating paragraphs
  const handleGenerateParagraphs = () => {
    const count = parseInt(paragraphCount, 10);

    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }

    const generatedParagraphs = [];

    for (let i = 0; i < count; i++) {
      generatedParagraphs.push(generateParagraph());
    }

    setParagraphs(generatedParagraphs);
    setCopyStatus({}); // Reset copy status when new paragraphs are generated
    setCopyAllStatus(false);
  };

  // Function to copy a single paragraph to clipboard
  const copyParagraph = async (para, index) => {
    try {
      await navigator.clipboard.writeText(para);
      // Update copy status for the specific paragraph
      setCopyStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
      // Reset the copy status after 2 seconds
      setTimeout(() => {
        setCopyStatus((prevStatus) => ({ ...prevStatus, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Function to copy all paragraphs to clipboard
  const copyAllParagraphs = async () => {
    try {
      const allText = paragraphs.join('\n\n');
      await navigator.clipboard.writeText(allText);
      setCopyAllStatus(true);
      // Reset the copy all status after 2 seconds
      setTimeout(() => {
        setCopyAllStatus(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy all: ', err);
    }
  };

  return (
    <div className="container">
      <h1>Random Paragraph Generator</h1>
      <div className="input-group">
        <input
          type="number"
          value={paragraphCount}
          onChange={(e) => setParagraphCount(e.target.value)}
          placeholder="Enter number of paragraphs"
          min="1"
        />
        <button onClick={handleGenerateParagraphs}>Generate</button>
        {paragraphs.length > 0 && (
          <button onClick={copyAllParagraphs} className="copy-all-button">
            {copyAllStatus ? 'Copied!' : 'Copy All'}
          </button>
        )}
      </div>
      <div className="paragraph-container">
        {paragraphs.map((para, index) => (
          <div key={index} className="paragraph-wrapper">
            <p className="paragraph">{para}</p>
            <button
              onClick={() => copyParagraph(para, index)}
              className="copy-button"
            >
              {copyStatus[index] ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App
