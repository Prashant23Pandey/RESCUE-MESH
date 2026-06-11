const fs = require('fs');
const { execSync } = require('child_process');

try {
  execSync('powershell -Command "Copy-Item \'Disaster Response (3).pptx\' \'temp_ppt.zip\' -Force; Expand-Archive -Path \'temp_ppt.zip\' -DestinationPath \'temp_ppt_extracted\' -Force"', { stdio: 'ignore' });
  
  const slideDir = 'temp_ppt_extracted/ppt/slides';
  const files = fs.readdirSync(slideDir).filter(f => f.endsWith('.xml'));
  
  // Sort files by slide number
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

  for (const file of files) {
    const content = fs.readFileSync(`${slideDir}/${file}`, 'utf-8');
    const matches = [...content.matchAll(/<a:t>(.*?)<\/a:t>/g)];
    const text = matches.map(m => m[1]).join(' ');
    if (text) {
      console.log(`\n--- Slide ${file.match(/\d+/)[0]} ---`);
      console.log(text);
    }
  }

} catch (e) {
  console.error("Error reading ppt:", e.message);
} finally {
  execSync('powershell -Command "Remove-Item -Recurse -Force \'temp_ppt_extracted\' -ErrorAction SilentlyContinue; Remove-Item \'temp_ppt.zip\' -ErrorAction SilentlyContinue"', { stdio: 'ignore' });
}
