const fs = require('fs');
const path = require('path');

// List of files with "About Me" sections
const filesWithAboutMe = [
    'blockchain-gaming-putting-the-state-on-chain.md',
    'preventing-cheaters-in-fog-of-war-games.md',
    'the-gospel-of-polkadot-as-told-by-gpt3.md',
    'the-limits-of-action-verification-in-blockchain-games.md',
    'on-infinite-multi-user-dungeons.md',
    'emergent-currencies-in-the-gaming-metaverse-unleashing-the-power-of-player-created-money.md',
    'top-5-most-active-games-on-immutable.md',
    'the-worlds-of-web-3-games.md',
    'subrogue-a-simple-game-with-tough-problems.md',
    'business-banking-for-blockchain-organisations.md',
    'cryptocurrency-storage-and-custody-needs-better-solutions.md',
    'review-of-a-meetup-in-crypto-valley-v12-vaduz-liechtenstein.md',
    'research-into-immutables-l2-scaling-solution.md',
    'multiple-currencies-for-online-games.md',
    'an-overview-of-liechtensteins-blockchain-act.md',
    'governance-of-and-incentives-for-a-web-3-game.md',
    'using-polkadot-to-power-the-future-of-online-multiplayer-games.md',
    'true-ownership-needs-provable-on-chain-assets.md',
    'in-game-and-on-chain-guilds-can-become-companies.md',
    'subrogue-request-for-help.md',
    'a-list-of-my-blockchain-writing.md',
    '2021-crypto-scorecard.md',
    'crypto-aint-dead-but-is-it-cycling-or-supercycling.md',
    'subrogue.md',
    'trusted-trade-offs-in-blockchain-gaming.md',
    'fork-off-preserving-gaming-communities-with-blockchain-technology.md',
    'of-gains-liquidity-and-bear-market-fomo.md',
    'the-thick-and-thin-of-blockchain-gaming-architectures.md'
];

function removeAboutMeSection(content) {
    // Regex to match "About Me" section with various formats:
    // - # About me
    // - # About Me
    // - # About me🎯
    // - # About Me 👉
    // - # [**About me**](https://edthomson.com/)
    const aboutMeRegex = /^# (?:\[?\*{0,2})?About [Mm]e(?:\*{0,2}\]?\([^)]*\))?(?:\s*[🎯👉💡🏅❓]*)?\s*$/gm;
    
    const match = content.match(aboutMeRegex);
    if (!match) {
        return content;
    }
    
    // Find the position of the "About Me" section
    const aboutMeIndex = content.search(aboutMeRegex);
    if (aboutMeIndex === -1) {
        return content;
    }
    
    // Remove everything from the "About Me" section to the end
    const cleanedContent = content.substring(0, aboutMeIndex).trim();
    
    return cleanedContent;
}

function processFile(filename) {
    const filePath = path.join('src/markdown', filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filename}`);
        return;
    }
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const originalLength = content.length;
        
        const cleanedContent = removeAboutMeSection(content);
        
        if (cleanedContent.length < originalLength) {
            fs.writeFileSync(filePath, cleanedContent);
            const removedChars = originalLength - cleanedContent.length;
            console.log(`✅ Processed ${filename} - removed ${removedChars} characters`);
        } else {
            console.log(`ℹ️  No "About Me" section found in ${filename}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
    }
}

function main() {
    console.log('🧹 Removing "About Me" sections from blog posts...\n');
    
    let processedCount = 0;
    let removedCount = 0;
    
    filesWithAboutMe.forEach(filename => {
        const filePath = path.join('src/markdown', filename);
        
        if (fs.existsSync(filePath)) {
            const originalContent = fs.readFileSync(filePath, 'utf8');
            const cleanedContent = removeAboutMeSection(originalContent);
            
            if (cleanedContent.length < originalContent.length) {
                fs.writeFileSync(filePath, cleanedContent);
                const removedChars = originalContent.length - cleanedContent.length;
                console.log(`✅ ${filename} - removed ${removedChars} characters`);
                removedCount++;
            } else {
                console.log(`ℹ️  ${filename} - no "About Me" section found`);
            }
            processedCount++;
        } else {
            console.log(`⚠️  ${filename} - file not found`);
        }
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Files modified: ${removedCount}`);
    console.log(`   Files unchanged: ${processedCount - removedCount}`);
    
    if (removedCount > 0) {
        console.log(`\n🎉 Successfully removed "About Me" sections from ${removedCount} blog posts!`);
        console.log(`💡 You may want to rebuild the site with: npm run build`);
    }
}

main(); 