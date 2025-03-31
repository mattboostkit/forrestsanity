import { PortableTextBlock } from '@portabletext/types';

export function markdownToSanityBlocks(markdown: string): PortableTextBlock[] {
  // Simple markdown to PortableText conversion
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split('\n');

  let currentBlock: PortableTextBlock | null = null;

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
