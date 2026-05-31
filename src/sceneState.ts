export type { SceneNode, SceneNodeType } from './types'
import { SceneNode, SceneNodeType } from './types'

export const INITIAL_HIERARCHY: SceneNode[] = [
  {
    id: 'scene', name: 'Scene', icon: 'Globe', type: 'scene', isOpen: true, children: [
      {
        id: 'geometry', name: 'Geometry', icon: 'Folder', type: 'folder', color: '#fb923c', isOpen: true, children: [
          {
            id: 'car', name: 'GRP_Car', icon: 'Folder', type: 'folder', color: '#fb923c', isOpen: true, children: [
              { id: 'body', name: 'SM_Body', icon: 'Box', color: '#34d399', type: 'mesh' },
              { id: 'wheels', name: 'SM_Wheels', icon: 'Circle', color: '#34d399', type: 'mesh' },
            ]
          },
          { id: 'terrain', name: 'Terrain Base', icon: 'Mountain', color: '#22c55e', type: 'mesh' },
          { id: 'trees', name: 'Foliage', icon: 'Trees', color: '#16a34a', type: 'mesh' },
          { id: 'cube', name: 'Starting Cube', icon: 'Box', color: '#f97316', type: 'mesh' },
        ]
      },
      {
        id: 'env', name: 'Environment', icon: 'Folder', type: 'folder', color: '#fb923c', isOpen: true, children: [
          { id: 'sky', name: 'Sky', icon: 'Cloud', color: '#3b82f6', type: 'light' },
          { id: 'sun', name: 'Sun', icon: 'Sun', color: '#eab308', type: 'light' },
          { id: 'atmosphere', name: 'Atmosphere', icon: 'Droplets', color: '#06b6d4', type: 'volume' },
          { id: 'clouds', name: 'Volumetric Clouds', icon: 'Cloud', color: '#94a3b8', type: 'volume' },
          { id: 'moon', name: 'Moon', icon: 'Moon', color: '#a8a29e', type: 'light' },
        ]
      }
    ]
  }
];

export const flattenItems = (items: SceneNode[], includeFolders = false): SceneNode[] => {
  let result: SceneNode[] = [];
  items.forEach(item => {
    if (includeFolders || (item.type !== 'folder' && item.type !== 'scene')) {
      result.push(item);
    }
    if (item.children) {
      result = result.concat(flattenItems(item.children, includeFolders));
    }
  });
  return result;
};

export const findNode = (items: SceneNode[], id: string): SceneNode | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findNode(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const updateNodeInTree = (items: SceneNode[], id: string, changes: Partial<SceneNode>): SceneNode[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, ...changes };
    }
    if (item.children) {
      return { ...item, children: updateNodeInTree(item.children, id, changes) };
    }
    return item;
  });
};

export const addFolderToNode = (items: SceneNode[], parentId: string, newFolder: SceneNode): SceneNode[] => {
  if (!parentId) parentId = 'scene';
  let added = false;
  
  const mapNodes = (nodes: SceneNode[]): SceneNode[] => {
    return nodes.map(node => {
      if (node.id === parentId && (node.type === 'folder' || node.type === 'scene')) {
        added = true;
        return {
          ...node,
          isOpen: true,
          children: [...(node.children || []), newFolder]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: mapNodes(node.children)
        };
      }
      return node;
    });
  };

  let newItems = mapNodes(items);
  
  if (!added) {
    newItems = newItems.map(node => {
      if (node.id === 'scene') {
         return {
           ...node,
           children: [...(node.children || []), newFolder]
         };
      }
      return node;
    });
  }
  
  return newItems;
};
