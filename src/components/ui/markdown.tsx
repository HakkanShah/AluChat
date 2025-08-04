import React from 'react';

// A very simple markdown-to-JSX renderer. It's not a full markdown parser.
// It only supports:
// - Markdown links: [text](url)
// - Unordered lists: - item
// This is to avoid adding a large dependency like react-markdown.

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const lines = content.split('\n');

  return (
    <>
      {lines.map((line, lineIndex) => {
        // Handle list items
        if (line.trim().startsWith('- ')) {
          const text = line.trim().substring(2);
          const parts = text.split(linkRegex);
          return (
            <div key={lineIndex} className="flex">
              <span className="mr-2">•</span>
              <p>
                {parts.map((part, i) => {
                  if (i % 3 === 1) { // This is the link text
                    const url = parts[i + 1];
                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:opacity-80"
                      >
                        {part}
                      </a>
                    );
                  }
                  if (i % 3 === 2) { // This is the URL, which we've already used
                    return null;
                  }
                  return <React.Fragment key={i}>{part}</React.Fragment>;
                })}
              </p>
            </div>
          );
        }

        // Handle regular text with links
        const parts = line.split(linkRegex);
        return (
          <p key={lineIndex}>
            {parts.map((part, i) => {
              if (i % 3 === 1) { // This is the link text
                const url = parts[i + 1];
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:opacity-80"
                  >
                    {part}
                  </a>
                );
              }
              if (i % 3 === 2) { // This is the URL, which we've already used
                return null;
              }
              return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
          </p>
        );
      })}
    </>
  );
};
