const fs = require('fs');
const https = require('https');
const path = require('path');

const RAW_FILE = 'c:/Users/user/Downloads/export_2026-03-28T07-35-41-998Z.json';
const OUTPUT_FILE = path.join(__dirname, 'src/data/products.json');
const IMAGES_DIR = path.join(__dirname, 'public/images/ireland-classics');

// Create directories if they don't exist
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Check for redirects
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image: ${res.statusCode} ${url}`));
      }
      
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function cleanDescription(desc) {
  if (!desc) return '';
  
  // Remove emojis
  let cleaned = desc.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{E0020}-\u{E007F}\u{FE0F}]/gu, '');
  
  // Remove hashtags
  cleaned = cleaned.replace(/#\w+/g, '');
  
  // Remove DM text
  cleaned = cleaned.replace(/DM For Other Sizes/ig, '');
  
  // Remove Size specification
  cleaned = cleaned.replace(/👕\s*Size:\s*\w+/ig, '');
  cleaned = cleaned.replace(/Size:\s*\w+/ig, '');
  
  // Clean up excessive newlines and spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

async function processProducts() {
  const rawData = fs.readFileSync(RAW_FILE, 'utf-8');
  const allRows = JSON.parse(rawData);
  
  // Filter out the 'Get Unlimited...' row and messy rows. Get first 10 actual items.
  const validProducts = allRows.filter(p => p.id && !p.id.includes('Get Unlimited') && !p.id.includes('###'));
  const targetProducts = validProducts.slice(0, 10);
  
  const processedProducts = [];

  for (const item of targetProducts) {
    const titleMatch = item.Title.trim();
    if (!titleMatch) continue;
    
    console.log(`Processing: ${item.Title}`);
    
    // Process images
    const rawImagesStr = item['All Images'] || '';
    const rawImages = rawImagesStr.split('||').map(s => s.trim()).filter(Boolean);
    const localImages = [];
    
    for (let i = 0; i < rawImages.length; i++) {
        const imageUrl = rawImages[i];
        let urlObj;
        try {
            urlObj = new URL(imageUrl);
        } catch (e) {
            continue;
        }
        const ext = path.extname(urlObj.pathname) || '.jpg';
        const filename = `${item.id}-${i + 1}${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        
        try {
            await downloadImage(imageUrl, destPath);
            localImages.push(`/images/ireland-classics/${filename}`);
            console.log(`  Downloaded: ${filename}`);
        } catch (err) {
            console.error(`  Failed to download ${imageUrl}:`, err.message);
        }
    }

    const cleanedDesc = cleanDescription(item.Description);
    const urlSlug = item.Title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Title case the string
    const titleCase = item.Title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    processedProducts.push({
      id: item.id,
      title: titleCase,
      slug: urlSlug || item.id,
      description: cleanedDesc,
      price: parseFloat(item.Price) || 25.00,
      images: localImages,
      collection: 'Ireland Classics',
      currency: item.Currency || 'EUR'
    });
  }

  // Write out the processed data
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedProducts, null, 2));
  console.log(`Successfully processed ${processedProducts.length} products to ${OUTPUT_FILE}`);
}

processProducts().catch(console.error);
