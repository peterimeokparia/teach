import 
React, { 
useEffect, 
useRef, 
useState } from "react";

import Latex from "react-latex";

const MathInput = ({ onChange, ...rest }) => {
    
const ref = useRef();
useEffect(() => {
  window.Guppy.use_osk(new window.GuppyOSK({ goto_tab: "arithmetic", attach: "focus" }));
  const guppy = new  window.Guppy(ref.current);
  guppy.event("change", onChange);
}, []);

return <div ref={ref} {...rest} />;
};

const MathScienceLatex = ({
  previewMode, 
  saveMathScienceFormField,
  loadMathScienceFormField,
  formElement }) => {

  const [ expression, setExpression ] = useState(( previewMode ? formElement?.inputValue : null ));

  let timerHandler = undefined; 
  const timeOutValue = 2000;
function handleMathInputChange( latexText ) {

    setExpression( latexText );

    if ( timerHandler ) {
      clearTimeout( timerHandler );
    }

    timerHandler = setTimeout(() => {
      // saveMathScienceFormField({ ...formElement, markDownContent: latexText, inputValue: latexText });
      saveMathScienceFormField({ ...formElement, inputValue: latexText });
      loadMathScienceFormField();
    }, timeOutValue );    
}
return ( <span> 
  {previewMode 
      ? <span>
        <h3>Math Editor and PreViewer</h3>
          <MathInput onChange={ev => handleMathInputChange(ev.target.latex())} />
          <div style={{ margin: 20 }} />
            <Latex>{`View: $${expression}$`}</Latex>
          </span>
      : <span className="latex-content-text">  
          {/* <p><Latex>{`$${formElement?.markDownContent}$`}</Latex></p> */}
          <p><Latex>{`$${formElement?.inputValue  }$`}</Latex></p>
        </span>     
  }
   </span>                    
)}

export default MathScienceLatex;
