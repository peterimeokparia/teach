import { 
useEffect } from 'react';
  
import { 
connect } from 'react-redux';

import ResizePanel from "react-resize-panel";
import style from './style.css';
import classNames from 'classnames/bind';

import '../../images/geometry2.png';

// ../../../../images/geometry2.png)
  
  let cx = classNames.bind(style);
  
  const Dividers = ({}) => {
     
  return <div className={cx('containerr')}>
  {/* <ResizePanel direction="s">
    <div className={cx('header', 'panel')}>
      <span>header</span>
    </div>
  </ResizePanel>
   */}
   
  <div className={cx('body')}>
  
    <ResizePanel direction="e" style={{ flexGrow: '1' }} >
      <div className={cx('sidebar', 'withMargin', 'panel')}>left panel<br /> with margin <br />default 50% of content area using flex-grow</div>
    </ResizePanel>

    <div className={cx('content', 'panel')}>static content Test Test Test K</div>

    <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
      <div className={cx('sidebar',  'withMargin',  'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
    </ResizePanel>
  
  </div>
  
  {/* <ResizePanel direction="n" style={{height: '200px'}}>
    <div className={cx('footer', 'panel')}>
      <div className={cx('footerArea')}>
        <div className={cx('footerAreaContent')}>
          <span>footer area, min height: 100px</span>
        </div>
      </div>
      <div className={cx('footerBottomBar')}>
        bottom bar
      </div>
    </div>
  </ResizePanel> */}
  </div>
  };
  
  export default connect( null, null )(Dividers);