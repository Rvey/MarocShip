import { Link } from "react-router-dom";

interface NavigationProps {
    
}
 
const Navigation: React.FC<NavigationProps> = () => {
    return ( 
        <div>
            <Link to="/">Dashboard</Link>
            <Link to="/admin">login</Link>
            <Link to="/statistics">statistics</Link>
        </div>
     );
}
 
export default Navigation;