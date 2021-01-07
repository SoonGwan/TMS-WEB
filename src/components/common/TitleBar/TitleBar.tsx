import React from 'react';

interface ITitleBar {
  title: string;
}

const TitleBar = ({ title }: ITitleBar) => {
  return (
    <div className="TitleBar">
      <h1 className="TitleBar-Title">{title}</h1>
    </div>
  )
}

export default TitleBar;