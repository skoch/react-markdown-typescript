import React from 'react';
import gfm from 'remark-gfm';
import { render } from 'react-dom';
import {
  Components,
  CodeComponent,
  HeadingComponent,
} from 'react-markdown/src/ast-to-react';
import ReactMarkdown from 'react-markdown';

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table with alignment:

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## normal
~~~jsx
// this is code we want to transpile and render
// and we want to allow editing
const name = 'normal';
<Testing name={name} />
~~~

## static
~~~jsx static
// this is static code we want to show
const name = 'static';
~~~

## noeditor
~~~jsx noeditor
// this is code we want to transpile and render
// but we do not want to allow editing
const name = 'noeditor';
<Testing name={name} />
~~~

`;

const Heading: HeadingComponent = ({
  node,
  level,
  children,
  className,
  ...props
}): React.ReactNode => {
  return <h2 {...props} children={String(children)} />;
};

const Code: CodeComponent = ({
  node,
  inline,
  children,
  className,
  ...props
}): React.ReactNode => {
  const meta = String(node.data?.meta);
  const isStatic = meta.includes('static');
  const noeditor = meta.includes('noeditor');
  const match = /language-(\w+)/.exec(className || '');
  const showLiveEdit = match && match[0] === 'language-jsx' && !isStatic;

  return !inline && match ? (
    <>
      <code {...props} className={className} children={String(children)} />
      {showLiveEdit && !noeditor && (
        <pre>
          <code>This is where the live code editor would be</code>
        </pre>
      )}
    </>
  ) : (
    <code className={className} {...props} />
  );
};

const components: Components = {
  code: Code,
  h2: Heading,
};

render(
  <ReactMarkdown
    components={components}
    remarkPlugins={[gfm]}
    children={markdown}
  />,
  document.getElementById('app'),
);
