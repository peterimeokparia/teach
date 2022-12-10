import { connect } from 'react-redux';
import ResizePanel from "react-resize-panel";
import style from './style.css';
import classNames from 'classnames/bind';
import '../../../../Images/geometry2.png';
  
  let cx = classNames.bind(style);
  
  const Dividers = () => {
  return <div className={cx('containerr')}>   
  <div className={cx('body')}>
    <ResizePanel direction="e" style={{ flexGrow: '1' }} >
      <div className={cx('sidebar', 'withMargin', 'panel')}>left panel<br /> with margin <br />default 50% of content area using flex-grow</div>
    </ResizePanel>
    <div className={cx('content', 'panel')}>static content Test Test Test K</div>
    <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
      <div className={cx('sidebar',  'withMargin',  'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
    </ResizePanel>
  </div>
  </div>;
  };
  
  export default connect( null, null )(Dividers);