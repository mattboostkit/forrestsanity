import { Block } from "@sanity/types";

export function markdownToSanityBlocks(markdown: string): Block[] {
  // Simple markdown to PortableText conversion
  const blocks: Block[] = [];
  const lines = markdown.split('\n');

  let currentBlock: Block | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }]
      };
    } 
    else if (line.startsWith('**') && line.endsWith('**')) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: line.replace(/\*\*/g, ''),
          marks: ['strong']
        }]
      };
    }
    else if (line.startsWith('- ')) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: line.replace('- ', '• ')
        }]
      };
    }
    else if (line.trim() === '') {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = null;
    }
    else {
      if (!currentBlock) {
        currentBlock = {
          _type: 'block',
          style: 'normal',
          children: []
        };
      }
      currentBlock.children.push({
        _type: 'span',
        text: line + '\n'
      });
    }
  }

  if (currentBlock) blocks.push(currentBlock);
  return blocks;
}
