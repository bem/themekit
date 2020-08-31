import React from 'react'

import { Editor } from '../Editor'
import { yamlToJson } from '../lib/yamlToJson'
import { buildTokens } from '../api'
import styles from './Container.module.css'

export const Container = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState('yaml')
  const [result, setResult] = React.useState('')
  const editorRef = React.useRef(null)
  const onRunClick = React.useCallback(async () => {
    if (editorRef.current === null) {
      return
    }
    const value = editorRef.current.getValue()
    const content = currentLanguage === 'yaml' ? yamlToJson(value) : value
    const _r = await buildTokens({ content })
    setResult(_r)
  }, [currentLanguage, editorRef])

  return (
    <div className={styles.Container}>
      <div className={styles.ContainerSide}>
        <div className="Toolbar">
          <button className="Button" onClick={onRunClick}>
            Run
          </button>
        </div>
        <Editor
          editorRef={editorRef}
          value={`button:\n  value: 10px`}
          language="yaml"
          // onChange={() => (void 0)}
        />
      </div>
      <div className={styles.ContainerSide}>
        <pre>
          {result}
        </pre>
      </div>
    </div>
  )
}
