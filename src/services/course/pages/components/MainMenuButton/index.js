import './style.css';

const MainMenuButton = ({ mouseDown, navMenuVisible }) => {
    return (
            <div className="burgerMenuDiv"
                onMouseDown={mouseDown} 
            >
                <div className={navMenuVisible ? 'divOneClose' : 'divOne'}></div>
                <div className={navMenuVisible ? 'divTwoClose' : 'divTwo'}></div>
                <div className={navMenuVisible ? 'divThreeClose' : 'divThree'}> </div>
           </div>
    );
};

export default MainMenuButton;