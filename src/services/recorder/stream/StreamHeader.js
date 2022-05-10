import { Link } from 'services/recorder/stream/node_modules/@reach/router';
import './Header.css';

const Header = () => {
  return (
    <div className="headerWrapper">
        <div className="headerTitle">
            <Link to="/">Streamer</Link>
        </div>
        <div className="otherLinks">
            <Link to="/">All Streams</Link>
        </div>
    </div>
)
}

export default Header;