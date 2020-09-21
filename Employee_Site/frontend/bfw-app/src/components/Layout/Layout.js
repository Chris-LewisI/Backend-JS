import React from 'react'
import './Layout.css'

const layout = (props) => (
  <>
    <div>
      <p>ToolBar</p>
    </div>
    <main className="content">
      {props.children}
    </main>
  </>

)

export default layout
