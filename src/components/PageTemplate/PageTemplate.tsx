import React from 'react';
import classNames from 'classnames/bind';
import logo from 'assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { ClassNamesFn } from 'classnames/types';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { ImProfile } from 'react-icons/im';
import { FiPackage } from 'react-icons/fi';
import { SiMicrosoftexcel } from 'react-icons/si';

interface IPageTemplate {
  children: React.ReactNode;
}

const style = require('./PageTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PageTemplate = ({ children }: IPageTemplate) => {
  const { pathname } = useLocation();

  return (
    <div className={cx('PageTemplate')}>
      <div className={cx('PageTemplate-NavBar')}>
        <div className={cx('PageTemplate-NavBar-ItemsWrapper')}>
          <Link
            to={'/'}
            className={cx('PageTemplate-NavBar-ItemsWrapper-Link')}
          >
            <div
              className={cx('PageTemplate-NavBar-ItemsWrapper-Items', {
                'PageTemplate-NavBar-ItemsWrapper-Items-selectedItem':
                  pathname === '/',
              })}
            >
              <HiOutlineLocationMarker />
            </div>
          </Link>
          <Link
            to={'/member'}
            className={cx('PageTemplate=NavNar-ItemsWrapper-Link')}
          >
            <div
              className={cx('PageTemplate-NavBar-ItemsWrapper-Items', {
                'PageTemplate-NavBar-ItemsWrapper-Items-selectedItem':
                  pathname === '/member',
              })}
            >
              <ImProfile />
            </div>
          </Link>
          <Link
            to={'/delivery'}
            className={cx('PageTemplate=NavNar-ItemsWrapper-Link')}
          >
            <div
              className={cx('PageTemplate-NavBar-ItemsWrapper-Items', {
                'PageTemplate-NavBar-ItemsWrapper-Items-selectedItem':
                  pathname === '/delivery',
              })}
            >
              <FiPackage />
            </div>
          </Link>
          <Link
            to={'/manage'}
            className={cx('PageTemplate=NavNar-ItemsWrapper-Link')}
          >
            <div
              className={cx('PageTemplate-NavBar-ItemsWrapper-Items', {
                'PageTemplate-NavBar-ItemsWrapper-Items-selectedItem':
                  pathname === '/manage',
              })}
            >
              <SiMicrosoftexcel />
            </div>
          </Link>
        </div>
        <img src={logo} alt={logo} />
      </div>
      <div className={cx('PageTemplate-Children')}>{children}</div>
    </div>
  );
};

export default PageTemplate;
