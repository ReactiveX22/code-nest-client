import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { RenderCodeBlock } from './RenderCodeBlock';

const generateIdFromText = (text, index) => {
  if (!text || (Array.isArray(text) && text.length === 0)) {
    return `id-${index}`; // Fallback to a default ID if text is empty or invalid
  }

  const cleanText = typeof text === 'string' ? text : text.join(''); // Join if it's an array
  return (
    cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a hyphen
      .replace(/^-/, '') + `-${index}` // Append the index to make the ID unique
  );
};

const Heading = ({ children, level, index }) => {
  const id = generateIdFromText(children, index);
  const Tag = `h${level}`;

  const fontSize = `text-${4 - (level === 1 ? 0 : level)}xl`;

  return (
    <a href={`#${id}`} className='hover:underline' id={id}>
      <Tag className={`${fontSize} my-4 font-bold`}>
        <span className='font-thin text-text-200'>#</span> {children}
      </Tag>
    </a>
  );
};

Heading.propTypes = {
  children: PropTypes.any,
  index: PropTypes.any,
  level: PropTypes.any,
};

const MarkdownRendererV2 = ({ children }) => {
  let headingIndex = 0;

  const components = {
    h1: (props) => {
      headingIndex++;
      return <Heading {...props} level={1} index={headingIndex} />;
    },
    h2: (props) => {
      headingIndex++;
      return <Heading {...props} level={2} index={headingIndex} />;
    },
    h3: (props) => {
      headingIndex++;
      return <Heading {...props} level={3} index={headingIndex} />;
    },
    p: (props) => {
      return <p className='mb-2'>{props.children}</p>;
    },
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,
    code: ({ children, className }) => {
      const isFenced = className && className.startsWith('language-');

      if (isFenced) {
        const language = className.replace('language-', '') || ''; // Extract language for code block
        return <RenderCodeBlock codeContent={children} language={language} />;
      }

      return (
        <code className='rounded-md bg-bg-800 p-1 font-mono'>{children}</code>
      );
    },
    hr: () => <hr className='my-4 border-zinc-800' />,
    a: ({ ...props }) => (
      <a
        {...props}
        className='text-secondary-500 underline hover:text-secondary-400'
      >
        {props.children}
      </a>
    ),
    img: ({ ...props }) => (
      <img
        {...props}
        className='mx-auto my-4 max-w-full cursor-pointer rounded'
      />
    ),
    ul: ({ children }) => (
      <ul className='mb-4 flex list-disc flex-col pl-8'>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className='mb-4 flex list-decimal flex-col pl-8'>{children}</ol>
    ),
    li: ({ children }) => <li className=''>{children}</li>,
  };

  return (
    <ReactMarkdown
      className='flex flex-col selection:bg-primary-400'
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

MarkdownRendererV2.propTypes = {
  children: PropTypes.any,
};

export default MarkdownRendererV2;
