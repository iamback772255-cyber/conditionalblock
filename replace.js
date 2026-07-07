const fs = require('fs');
const path = require('path');

const files = [
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Feedback.jsx',
  'frontend/src/pages/Dashboard.jsx',
  'frontend/src/components/Sidebar.jsx',
  'frontend/src/components/ConditionBuilder.jsx',
  'frontend/src/components/ABLogo.jsx',
  'frontend/index.html',
  'render.yaml',
  'README.md',
  'SECURITY.md',
  'ARCHITECTURE.md',
  'backend/src/db/rpc_functions.sql',
  'backend/src/db/schema.sql'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/AssetBlock/g, 'ConditionalBlock');
    content = content.replace(/AssetBLOCK/g, 'ConditionalBLOCK');
    content = content.replace(/assetblock/g, 'conditionalblock');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  } else {
    console.log('Skipped ' + file);
  }
});
