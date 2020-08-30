import React, { useState, useEffect, useRef } from 'react'

import { Tabs } from './Tabs/Tabs'
import { presets, presetsKeys } from './presets'
import { Editor } from './Editor/Editor'
import { trim } from './utils'
import { executeCode } from './execute-code'
import './App.css'

// TODO: возможность ренеймить табы
export const App = () => {
  const [presetKey, setPresetKey] = useState('css-whitepaper')
  const [files, setFiles] = useState<any>({})
  const [tabKey, setTabKey] = useState('')

  useEffect(() => {
    setFiles(presets[presetKey])
    setTabKey(Object.keys(presets[presetKey])[0])
  }, [presetKey])

  console.log('>>> tabKey', tabKey)

  return (
    <div className="App">
      <select value={presetKey} onChange={(event) => setPresetKey(event.target.value)}>
        {presetsKeys.map((key) => (
          <option key={key}>{key}</option>
        ))}
      </select>
      <div className="Container">
        <div className="Container-Side">
          <div className="Container-Header">
            <Tabs
              active={tabKey}
              tabs={Object.keys(files)}
              onChange={(nextTabKey: string) => setTabKey(nextTabKey)}
            />
            <div className="Container-Acitons">
              <button>Add</button>
              <button
                onClick={() => {
                  // console.log('>>> sourceEditorRef.current', sourceEditorRef.current.getValue())
                  // const res = executeCode('module.exports.fake = 10', () => {})
                  // console.log('>>> res', res)
                }}
              >
                Run
              </button>
            </div>
          </div>
          <Editor
            value={trim(files[tabKey])}
            language="typescript"
            onChange={(_: any, value: any) => {
              // console.log('>>> value', value)
              // console.log('>>> tabKey', tabKey)
              // setFiles({ ...files, [tabKey]: 'const a = 10' })
            }}
          />
        </div>
        <div className="Container-Side"></div>
      </div>
    </div>
  )
}
