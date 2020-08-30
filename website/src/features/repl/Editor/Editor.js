import React from 'react'
import { ControlledEditor } from '@monaco-editor/react'

import './Editor.css'

const options = {
  minimap: { enabled: false },
}

export const Editor = ({ value, language, onChange, editorRef }) => {
  const onEditorDidMount = React.useCallback((_, editor) => {
    editorRef.current = editor
  }, [])

  return (
    <ControlledEditor
      editorDidMount={onEditorDidMount}
      onChange={onChange}
      value={value}
      language={language}
      options={options}
    />
  )
}
