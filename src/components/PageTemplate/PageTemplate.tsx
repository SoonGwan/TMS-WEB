import React from 'react';
import './PageTemplate.scss';
import logo from 'assets/logo.svg';
interface IPageTemplate {
  children: React.ReactNode;
}
const PageTemplate = ({ children }: IPageTemplate) => {
  return (
    <div className="PageTemplate">
      <div className="PageTemplate-NavBar">
        <img src={logo} alt={logo} />
      </div>
      <div className="PageTemplate-Children">{children}</div>
    </div>
  );
};

export default PageTemplate;
