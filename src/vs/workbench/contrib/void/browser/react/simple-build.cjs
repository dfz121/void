#!/usr/bin/env node

/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

const fs = require('fs');
const path = require('path');

// Create directories
const directories = [
    'src2',
    'src2/void-editor-widgets-tsx',
    'src2/sidebar-tsx', 
    'src2/void-settings-tsx',
    'src2/void-tooltip',
    'src2/void-onboarding',
    'src2/quick-edit-tsx',
    'src2/diff',
    'out',
    'out/void-editor-widgets-tsx',
    'out/sidebar-tsx',
    'out/void-settings-tsx', 
    'out/void-tooltip',
    'out/void-onboarding',
    'out/quick-edit-tsx',
    'out/diff'
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Copy source files to src2 (this mimics what scope-tailwind would do)
function copyFiles(srcDir, destDir) {
    const items = fs.readdirSync(srcDir);
    
    items.forEach(item => {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyFiles(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

console.log('Copying source files to src2...');
copyFiles('src', 'src2');

// Create simple output files for each entry point
const entryPoints = [
    'void-editor-widgets-tsx/index.tsx',
    'sidebar-tsx/index.tsx', 
    'void-settings-tsx/index.tsx',
    'void-tooltip/index.tsx',
    'void-onboarding/index.tsx',
    'quick-edit-tsx/index.tsx',
    'diff/index.tsx'
];

entryPoints.forEach(entry => {
    const outputFile = path.join('out', entry.replace('.tsx', '.js'));
    const outputDir = path.dirname(outputFile);
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Create a simple module that exports a placeholder
    const content = `// Generated build output for ${entry}
export default function() {
    console.warn('React component ${entry} not fully built - placeholder loaded');
    return null;
}
export * from './index.js';
`;
    
    fs.writeFileSync(outputFile, content);
    console.log(`Created output file: ${outputFile}`);
});

console.log('Simple build complete!');
console.log('Note: This is a basic build that creates placeholder files.');
console.log('For full functionality, you would need the proper build tools.');