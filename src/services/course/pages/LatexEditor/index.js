import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Latex from "react-latex";
import './style.css';

const MathInput = ({ onChange, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    window.Guppy.use_osk(new window.GuppyOSK({ goto_tab: "arithmetic", attach: "focus" }));
    const guppy = new  window.Guppy(ref.current);

    guppy.event("change", onChange);
  }, [ onChange ]);

  return <div ref={ref} {...rest} />;
};

const LatexEditor = ({ setLatexExpression }) => {
  const [ expression, setExpression ] = useState("");

  useEffect(()=>{}, [expression]);

  useEffect(() => {
    if ( expression && setLatexExpression  ) {
      setLatexExpression( expression );
    }
  }, [ expression, setLatexExpression ]);

  return (
    <div className="latex">
        <h1>Math Editor and Viewer</h1>
        <MathInput onChange={ev => setExpression(ev.target.latex())} />
        <div style={{ margin: 20 }} />
        <Latex>{`View: $${expression}$`}</Latex>
    </div>
  );
};

export default connect( null, null )(LatexEditor);
