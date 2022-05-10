import './style.css';

const MiniSideBarButton = ({ mouseDown, navMenuVisible  }) => {
    return (
            <span className="sideburgerMenuDiv"
                onMouseDown={mouseDown}
            >
                <div className={navMenuVisible ? 'sideDivOneClose' : 'sideDivOne'}></div>
                <div className={navMenuVisible ? 'sideDivTwoClose' : 'sideDivTwo'}></div>
                <div className={navMenuVisible ? 'sideDivThreeClose' : 'sideDivThree'}> </div>
           </span>
    );
};

export default MiniSideBarButton;