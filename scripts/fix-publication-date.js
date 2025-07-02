const fs = require('fs').promises;
const path = require('path');

const MARKDOWN_DIR = path.join(__dirname, '..', 'src', 'markdown');

async function fixPublicationDate(filePath) {
    let content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    let dateLineIndex = -1;
    let dateLine = '';
    let dateText = '';

    // Find the date, which is usually on line 4 or 5 and contains a day of the week
    for (let i = 3; i < 6 && i < lines.length; i++) {
        const potentialDate = lines[i].trim();
        if (potentialDate.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/)) {
            dateLineIndex = i;
            dateLine = lines[i];
            dateText = dateLine.trim().split('|')[0].trim();
            break;
        }
    }
    
    if (dateLineIndex === -1) {
        // [INFO] No publication date line found, probably already processed or never had a date.
        return;
    }
    
    const publicationDate = new Date(dateText);

    if (isNaN(publicationDate)) {
        console.log(`[WARN] Could not parse date "${dateText}" from ${path.basename(filePath)}, skipping.`);
        return;
    }

    // Remove the old date line and the following blank line
    lines.splice(dateLineIndex, 2);

    let frontMatterStartLineIndex = -1;
    let frontMatterEndLineIndex = -1;
    let dashesCount = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            dashesCount++;
            if (dashesCount === 1) {
                frontMatterStartLineIndex = i;
            }
            if (dashesCount === 2) {
                frontMatterEndLineIndex = i;
                break;
            }
        }
    }

    // Check if there's already a date in the front matter
    if (frontMatterStartLineIndex !== -1 && frontMatterEndLineIndex !== -1) {
        for (let i = frontMatterStartLineIndex + 1; i < frontMatterEndLineIndex; i++) {
            if (lines[i].startsWith('date:')) {
                console.log(`[INFO] Date already exists in frontmatter for ${path.basename(filePath)}, skipping.`);
                return;
            }
        }
        // Insert the date into the frontmatter
        lines.splice(frontMatterStartLineIndex + 1, 0, `date: ${publicationDate.toISOString()}`);
        const newContent = lines.join('\n');
        await fs.writeFile(filePath, newContent, 'utf-8');
        console.log(`[OK] Added date to frontmatter in ${path.basename(filePath)}`);
    } else {
        // create frontmatter
        let newContent = '---\n';
        newContent += `date: ${publicationDate.toISOString()}\n`;
        newContent += '---\n\n';
        newContent += lines.join('\n');
        await fs.writeFile(filePath, newContent, 'utf-8');
        console.log(`[OK] Created frontmatter with date in ${path.basename(filePath)}`);
    }
}


async function main() {
    console.log('Starting to fix publication dates...');
    const files = await fs.readdir(MARKDOWN_DIR);
    for (const file of files) {
        const filePath = path.join(MARKDOWN_DIR, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile() && file.endsWith('.md')) {
            await fixPublicationDate(filePath);
        }
    }
    console.log('Finished fixing publication dates.');
}

main().catch(err => {
    console.error('Error during date fixing:', err);
    process.exit(1);
}); 