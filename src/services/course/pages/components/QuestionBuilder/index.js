import './style.css';

const QuestionBuilder = ({ children, props }) => {   
return<>
      {
        children( props )
      }
      </>;
};

export default QuestionBuilder;