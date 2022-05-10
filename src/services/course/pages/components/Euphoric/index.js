import './style.css';

export function euphoricEffect(letter, classname, query){
    addEffectToElement(query);
    return (
        <span className={classname}>
            <span>{letter}</span>
        </span>
    );
};

function addEffectToElement( querySelector ){
    const elements = document.querySelectorAll(querySelector);
    
    elements.forEach((element, idx) => {
        element.addEventListener('load', (e) => {
            e.target.classList.add('active');
        });
        element.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        element.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });
        element.classList.add('active');
        // Initial animation
        setTimeout(() => {
            element.classList.add('active');
        }, 750 * (idx+1));
    });
}