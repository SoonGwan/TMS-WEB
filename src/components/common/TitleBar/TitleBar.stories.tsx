import React from 'react';
import TitleBar from './TitleBar';


const storybook = {
  component: TitleBar,
  title: 'TitleBar',
  excludeStories: /.*Data$/,
}

export default storybook;

export const Default = () => <TitleBar title='제목' />
