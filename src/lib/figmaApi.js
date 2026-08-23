/**
 * Utility to interact with Figma API
 */

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Parses a Figma URL to extract file ID and node ID.
 * Example URL: https://www.figma.com/file/FILE_ID/Title?node-id=NODE_ID
 */
export function parseFigmaUrl(url) {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/');
    // The format is usually /file/{file_id}/{title} or /design/{file_id}/{title}
    const fileIdIndex = pathParts.findIndex(p => p === 'file' || p === 'design') + 1;
    const fileId = pathParts[fileIdIndex];
    
    let nodeId = parsed.searchParams.get('node-id');
    // Figma sometimes uses '-' instead of ':' in the URL search params, replace it back
    if (nodeId && nodeId.includes('-')) {
      nodeId = nodeId.replace('-', ':');
    }

    return { fileId, nodeId };
  } catch (error) {
    throw new Error('Invalid Figma URL');
  }
}

/**
 * Fetches the Figma node data for a specific frame/element
 */
export async function fetchFigmaNode(token, url) {
  const { fileId, nodeId } = parseFigmaUrl(url);
  
  if (!fileId) {
    throw new Error('File ID could not be extracted from URL');
  }

  // If node-id is missing, we fetch the whole file, but it's very large. 
  // We encourage users to provide a specific frame URL.
  const endpoint = nodeId 
    ? `${FIGMA_API_BASE}/files/${fileId}/nodes?ids=${nodeId}`
    : `${FIGMA_API_BASE}/files/${fileId}`;

  const response = await fetch(endpoint, {
    headers: {
      'X-Figma-Token': token
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Figma API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  
  if (nodeId) {
    return data.nodes[nodeId].document;
  }
  
  return data.document;
}

/**
 * Extracts simplified design specs (colors, typography) from a Figma Node
 */
export function extractFigmaSpecs(node) {
  const specs = {
    colors: [],
    typography: [],
    // future: spacing, corner radius, etc.
  };

  function traverse(n) {
    // Extract Colors (Fills)
    if (n.fills && Array.isArray(n.fills)) {
      n.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          // Convert 0-1 to 0-255 RGB
          const r = Math.round(fill.color.r * 255);
          const g = Math.round(fill.color.g * 255);
          const b = Math.round(fill.color.b * 255);
          // Only add if not already in list to keep it simple
          const hex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).padStart(6, '0')}`.toUpperCase();
          
          if (!specs.colors.some(c => c.hex === hex)) {
            specs.colors.push({
              hex,
              elementName: n.name
            });
          }
        }
      });
    }

    // Extract Typography
    if (n.type === 'TEXT' && n.style) {
      specs.typography.push({
        elementName: n.name,
        fontFamily: n.style.fontFamily,
        fontSize: n.style.fontSize,
        fontWeight: n.style.fontWeight
      });
    }

    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return specs;
}
