const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\benad\\.gemini\\antigravity\\brain\\159c83e0-8c1a-4ed1-a129-0117306e86ee\\.system_generated\\logs\\transcript.jsonl';
const outDir = 'C:\\Users\\benad\\RESCUE-MESH\\backend\\src';
const outTestDir = 'C:\\Users\\benad\\RESCUE-MESH\\backend\\test';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(outTestDir)) fs.mkdirSync(outTestDir, { recursive: true });

const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

const filesToRecover = [
  'app.ts', 'index.ts', 'priority.ts', 'store.ts', 'types.ts', 'validation.ts', 'backend.test.ts'
];

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    // Look for tool responses from view_file
    if (obj.content && obj.content.includes('The following code has been modified to include a line number')) {
      const content = obj.content;
      
      for (const file of filesToRecover) {
        if (content.toLowerCase().includes(`backend/src/${file}`.toLowerCase()) || 
            content.toLowerCase().includes(`backend\\\\src\\\\${file}`.toLowerCase()) ||
            content.toLowerCase().includes(`backend/test/${file}`.toLowerCase()) ||
            content.toLowerCase().includes(`backend\\\\test\\\\${file}`.toLowerCase())) {
          
          let linesToKeep = [];
          let isCode = false;
          
          const textLines = content.split('\n');
          for (let i = 0; i < textLines.length; i++) {
            const tl = textLines[i];
            if (tl.startsWith('The following code has been modified')) {
              isCode = true;
              continue;
            }
            if (tl.startsWith('The above content shows the entire')) {
              isCode = false;
              continue;
            }
            
            if (isCode) {
              const match = tl.match(/^\d+:\s?(.*)$/);
              if (match) {
                linesToKeep.push(match[1]);
              } else if (tl.match(/^\d+:/)) {
                // empty line
                linesToKeep.push('');
              }
            }
          }
          
          if (linesToKeep.length > 0) {
            const dest = file === 'backend.test.ts' ? path.join(outTestDir, file) : path.join(outDir, file);
            fs.writeFileSync(dest, linesToKeep.join('\n'));
            console.log(`Recovered ${file} with ${linesToKeep.length} lines`);
          }
        }
      }
    }
  } catch (e) {
  }
}
