import React from 'react'

const Module = (props) => {
  const pageTitle = props.pageTitle
  const icon = props.icon
  const color = props.color

  return (
    <div className="flex-container">
      <h1 style={{color: color}}>{pageTitle}</h1>
      <div className="d-flex">
   
      </div>
    </div>
  )
}

export default Module