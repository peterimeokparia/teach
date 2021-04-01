//https://levelup.gitconnected.com/react-portals-what-are-they-and-why-should-we-use-them-7c082a62e8fa

export default class Portal extends React.Component {

    newElement = document.createElement("div");

    componentDidMount = () => {
        portalRoot.appendChild({newElement});
    };

    componentWillUnmount = () => {
        portalRoot.removeChild({newElement});
    };

     render(){
         const { children } = this.props;
         return ReactDOM.createPortal({children, newElement});
     }
}