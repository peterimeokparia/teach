import { createRef, Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const latexStyle = {
  underline: '\\underline{',
  color: '\\color{',
  italics: '\\it'
};

class FormatEquation extends Component {
  constructor(props){
    super(props);
    this.state = {
      latexCode: this.props?.latexCode,
      color: null,
      italics: false,
      underline: false
    };

    this.setItalics = this.setItalics.bind(this);
    this.setColor = this.setColor.bind(this);
  };

    componentDidMount(){       
    };

    componentDidUpdate(){   
      this.props.latexCodeCallBack(this.state.latexCode);
    };

    setUnderline() {
      let currentState = undefined;

      if ( this.state.latexCode.includes(latexStyle.underline)) {
        currentState = this.state.latexCode;
        let temp = [];
 
        currentState.split('').map((element, index) => {
            if( element === '}') {
              temp.push( index )
            }
        });

        if ( currentState ) {
          let splitContent = currentState.split('');
          let indexToReplaceAt = temp[ temp.length-1 ];
          let latexCode ='';

          splitContent.forEach((element, index) => {
          if ( index === indexToReplaceAt ) {
            latexCode = latexCode.concat('');
          } else {
            latexCode = latexCode.concat(element);
          }      
          });
          if ( latexCode.includes(latexStyle.underline) ) {
            latexCode = latexCode.replace(latexStyle.underline, '');
          }
          this.setState({ latexCode });
          return this;
        }
      }
      this.setState({ latexCode: (`${latexStyle.underline}${this.state.latexCode}}`) });
      return this;
    }; 

    setItalics(){
      if ( this.state.latexCode.includes(latexStyle.italics)) { 
        let latexCode = this.state.latexCode;

        latexCode = latexCode.replace(latexStyle.italics, '');

        this.setState({ latexCode });
        return this;
      }
      this.setState({ latexCode: (`${latexStyle.italics}${this.state.latexCode}`) });
      return this;
    };

    setColor(){
      if ( this.state.latexCode.includes(`${latexStyle.color}${this.state.color}}`)) { 
        let latexCode = this.state.latexCode;

        latexCode = latexCode.replace(`${latexStyle.color}${this.state.color}}`, '');
        this.setState({ latexCode });
        return this;
      }

      Swal.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
          'Fruits': {
            apples: 'Apples',
            bananas: 'Bananas',
            grapes: 'Grapes',
            Rhodamine: 'Rhodamine'
          },
          'Vegetables': {
            potato: 'Potato',
            broccoli: 'Broccoli',
            carrot: 'Carrot'
          },
          'icecream': 'Ice cream'
        },
        inputPlaceholder: 'Select a fruit',
        showCancelButton: true,
        inputValidator: (value) => {
        if ( value ) {
            this.color = value;
            this.setState({ latexCode: (`${latexStyle.color}${value}}${this.state.latexCode}`), color: value });
          }
        }
      })
      return this;
    };

    displayProps(){
      return this.latexCode;
    };
    
    render() {  
      return (
          <div className="ComponentCourseList">
            <form>
              <div style={{alignItems: "center" }}>
              <div style={{color: 'blue'}}> 
                {'Underline'} 
                <input 
                  style={{color: 'blue', marginLeft: 20}}
                  type="checkbox"
                  onChange={() => this.setUnderline()}
                /> 
              </div>   
              <div style={{color: 'blue'}}> 
                {'Italics'}
                <input
                  style={{color: 'blue', marginLeft: 20}}
                  type="checkbox"
                  onChange={() => this.setItalics()}
                />  
              </div> 
              <div style={{color: 'blue'}}> 
                {'Color'} 
                <input
                  style={{color: 'blue', marginLeft: 20}}
                  type="checkbox"
                  onChange={() => this.setColor()}
                /> 
              </div> 
              </div>   
                <br/>    
            </form>
          </div>
    ); };
}

export default FormatEquation;



