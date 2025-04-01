export function generateAvatarURL(id) {
    const seed = hashCode(id);
    const baseUrl = 'https://api.dicebear.com/7.x/bottts/svg'; // Or other DiceBear style
    return `${baseUrl}?seed=${seed}`;
}

// Simple hash function to generate a seed
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}