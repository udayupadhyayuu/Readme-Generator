import React, { useRef } from "react";
import DeleteButton from "./DeleteButton";

const TypingSVGSection = ({ formData, setFormData }) => {
  const { typingSvg } = formData;
  const { lines, font, color, size, repeat } = typingSvg;
  const colorInputRef = useRef(null);

  // Only use non-empty lines for the SVG
  const nonEmptyLines = lines.filter(line => line.trim() !== "");

  // Ensure there's always at least one line to prevent API errors
  const displayLines = nonEmptyLines.length > 0 ? nonEmptyLines : ["abhijeetBhale/Readme-Generator"];

  // Construct the lines parameter correctly for the API - use semicolons to separate lines
  const linesParam = `&lines=${displayLines.map(encodeURIComponent).join(";")}`;

  const svgUrl = `https://readme-typing-svg.herokuapp.com?font=${encodeURIComponent(font)}&size=${size}&pause=1000&color=${color.replace("#", "")}&width=435${linesParam}&center=true&vCenter=true&repeat=${repeat}`;

  const handleLineChange = (idx, value) => {
    const newLines = [...lines];
    newLines[idx] = value;
    setFormData({
      ...formData,
      typingSvg: { ...typingSvg, lines: newLines }
    });
  };

  const addLine = () => {
    setFormData({
      ...formData,
      typingSvg: { ...typingSvg, lines: [...lines, ""] }
    });
  };

  const removeLine = (idx) => {
    if (lines.length > 1) {
      const newLines = lines.filter((_, index) => index !== idx);
      setFormData({
        ...formData,
        typingSvg: { ...typingSvg, lines: newLines }
      });
    }
  };

  // Custom color circle click handler
  const handleColorCircleClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    const markdownText = `<div align=\"center\">\n\n![Typing SVG](${svgUrl})\n\n</div>`;
    try {
      await navigator.clipboard.writeText(markdownText);
      // Note: We'll handle success state in the parent component if needed
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="card my-4 max-w-full" style={{ overflow: 'hidden' }}>
      <h2 className="text-xl font-bold mb-3 text-center">Animated Typing SVG
      <span style={{ marginLeft: '8px', cursor: 'pointer', position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
              <div style={{
                display: 'none',
                position: 'absolute',
                left: '140%',
                top: '55%',
                transform: 'translateY(-50%)',
                background: '#222',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                whiteSpace: 'pre-line',
                zIndex: 100,
                minWidth: '350px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              className="font-tooltip"
              >
                <div className="font-tooltip-arrow" style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderRight: '8px solid #222'
                }} />
                <div>
                  <strong>Tip:</strong> In the <span style={{ color: '#60a5fa' }}>SVG</span> there is a word limit to add text, so make sure you check that!
                </div>
              </div>
            </span>
      </h2>
      <div className="mb-2">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2" style={{ position: 'relative' }}>
            <input
              type="text"
              value={line}
              onChange={e => handleLineChange(idx, e.target.value)}
              placeholder={`Line ${idx + 1}`}
              className="flex-1 p-2 border rounded"
              maxLength={60}
              style={{ 
                width: '25%', 
                fontSize: '18px', 
                borderRadius: '10px', 
                border: '1px solid black', 
                padding: '10px', 
                marginLeft: '-1px',
                paddingRight: lines.length > 1 ? '60px' : '10px'
              }}
            />
            {lines.length > 1 && (
              <div style={{ 
                position: 'absolute', 
                right: '70%', 
                top: '50%',
                transform: 'translateY(-60%)',
                // zIndex: 10
              }}>
                <DeleteButton
                  onClick={() => removeLine(idx)}
                  title="Remove line"
                />
              </div>
            )}
          </div>
        ))}
        <button
          className="cssbuttons-io-button mt-2"
          onClick={addLine}
          type="button"
        >
          Add Line
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
        <div>
          <label className="mr-1" style={{marginTop: '10px'}}>Font:</label>
          <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
            <input value={font} onChange={e => setFormData({
              ...formData,
              typingSvg: { ...typingSvg, font: e.target.value }
            })} className="border p-1 rounded w-32" style={{ width: '150px', textAlign: 'start', background: 'transparent', border: '1px solid black', borderRadius: '10px', color: 'black', padding: '4px 10px', marginTop: '12px', overflow: 'hidden' }} />
          </div>
          <span style={{ marginLeft: '-5px', cursor: 'pointer', position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16" id="info-circle">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
              <div style={{
                display: 'none',
                position: 'absolute',
                left: '140%',
                top: '40%',
                transform: 'translateY(-50%)',
                background: '#222',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                whiteSpace: 'pre-line',
                zIndex: 100,
                minWidth: '350px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              className="font-tooltip"
              >
                <div className="font-tooltip-arrow" style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderRight: '8px solid #222'
                }} />
                You can use any font from Google Fonts.<br />
                Browse fonts at: <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>https://fonts.google.com/</a>
              </div>
            </span>
        </div>
        <div className="flex items-center gap-2" id="color-circle">
          <label className="mr-1" style={{marginTop: '10px'}}>Color:</label>
          <div
            className="cursor-pointer"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `conic-gradient(red, yellow, lime, cyan, blue, magenta, red)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #eee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              position: 'relative'
            }}
            onClick={handleColorCircleClick}
            title="Pick a color"
          >
            <div
              id="color-circle-inner"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: color,
                border: '2px solid #fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
              }}
            />
            <input
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={e => setFormData({
                ...formData,
                typingSvg: { ...typingSvg, color: e.target.value }
              })}
              style={{ display: 'block', position: 'absolute', left: '44px', top: '0',  width: '36px', height: '36px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div>
          <label className="mr-1" style={{marginTop: '10px'}}>Size:</label>
          <input type="number" value={size} min={10} max={60} onChange={e => setFormData({
            ...formData,
            typingSvg: { ...typingSvg, size: Number(e.target.value) }
          })} className="border p-1 rounded w-16" style={{ width: '60px', textAlign: 'end', background: 'transparent', border: '1px solid black', borderRadius: '10px', color: 'black', padding: '4px 10px', marginTop: '12px' }} />
        </div>
        <div id="repeat-checkbox">
          <label className="mr-1" style={{marginTop: '10px'}}>Repeat:</label>
          <input type="checkbox" checked={repeat} onChange={e => setFormData({
            ...formData,
            typingSvg: { ...typingSvg, repeat: e.target.checked }
          })} style={{ width: '16px', height: '16px' }} />
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <h3 className="font-semibold mb-2" style={{marginTop: '20px'}}>Preview:</h3>
        <div className="w-full flex justify-center" id="typing-svg-preview">
          <div
            className="bg-gray-100 rounded p-2 overflow-x-auto"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src={svgUrl}
              alt="Typing SVG Preview"
              className="block mx-auto"
              style={{
                minWidth: '1300px',
                width: 'auto',
                maxWidth: '1300px',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="font-semibold mb-2" style={{marginTop: '20px'}}>Markdown:</h3>
        <div
          className="bg-gray-100 p-2 rounded text-sm overflow-x-auto"
          style={{
            maxWidth: '100%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            userSelect: 'text'
          }}
        >
          {`<div align="center">\n![Typing SVG](${svgUrl})\n</div>`}
        </div>
        <button
          onClick={copyToClipboard}
          className={`cssbuttons-io-button mt-2`}
          type="button"
          style={{ marginTop: '10px' }}
        >
          Copy Markdown
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TypingSVGSection;