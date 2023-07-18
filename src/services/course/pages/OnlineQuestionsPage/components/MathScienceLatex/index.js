import React, { useEffect, useRef, useState } from "react";
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import Latex from "react-latex";

const MathInput = ({ onChange, ...rest }) => {
const ref = useRef();

useEffect(() => {
  window.Guppy.use_osk(new window.GuppyOSK({ goto_tab: "arithmetic", attach: "focus" }));
  const guppy = new  window.Guppy(ref.current);

  guppy.event("change", onChange);
}, [ onChange ]);

return <div ref={ref} {...rest} />;
};

const MathScienceLatex = ({
  previewMode, 
  saveMathScienceFormField,
  loadMathScienceFormField,
  formElement,
  content,
  setElementContentFromEditorState 
}) => {
  const [ expression, setExpression ] = useState(( previewMode ? formElement?.inputValue : null ));

  let timerHandler = undefined; 
  const timeOutValue = 2000;

function handleMathInputChange( latexText ) {
    setExpression( latexText );

    if ( timerHandler ) {
      clearTimeout( timerHandler );
    }

    timerHandler = setTimeout(() => {
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
          <>
          <MyEditorTest2 
            element={ formElement }
            setElementContentFromEditorState={ editorState => setElementContentFromEditorState( editorState ) }
            content={ content }
          />
          </>
        </span>     
  }
   </span>                    
  );
};

export default MathScienceLatex;
