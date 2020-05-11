import React, { useState, useEffect } from 'react'

import { Tabs } from './Tabs/Tabs'
import { presets, presetsKeys } from './presets'
import { Editor } from './Editor/Editor'
import { trim } from './utils'
import './App.css'

export const App = () => {
  const [presetKey, setPresetKey] = useState('css-whitepaper')
  const [files, setFiles] = useState<any>({})
  const [tabKey, setTabKey] = useState('')

  useEffect(() => {
    setFiles(presets[presetKey])
    setTabKey(Object.keys(presets[presetKey])[0])
  }, [presetKey])

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
              <button>Run</button>
            </div>
          </div>
          <Editor value={trim(files[tabKey])} language="typescript" />
        </div>
        <div className="Container-Side"></div>
      </div>
    </div>
  )
}
