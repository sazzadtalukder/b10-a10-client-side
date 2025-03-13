import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <p>Error Page!!!! </p>
            <Link to='/'><button>Go Home</button></Link>
        </div>
    );
};

export default ErrorPage;