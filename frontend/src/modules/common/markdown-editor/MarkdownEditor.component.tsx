import React, { FunctionComponent, useRef, useCallback } from 'react';
import MarkdownIt from 'markdown-it';
import underline from 'markdown-it-plugin-underline';
import dynamic from 'next/dynamic';
import './markdown-editor.styles.less';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

interface Props {
  name: string;
  onChange: (text: string) => void;
  value: string;
}

const MarkdownEditor: FunctionComponent<Props> = (props: Props) => {
  const { name, onChange, value } = props;
  const parser = useRef(new MarkdownIt().use(underline));
  const renderHtml = useCallback(
    (text: string): string => parser.current.render(text),
    [],
  );
  const handleEditorChange = useCallback(
    (params: any) => {
      const { text } = params;
      onChange(text);
    },
    [onChange],
  );
  return (
    <div className="markdown-editor-container">
      <MdEditor
        name={name}
        value={value}
        renderHTML={renderHtml}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MarkdownEditor;
