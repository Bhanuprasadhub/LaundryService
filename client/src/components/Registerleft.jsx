import react from "react";
import { NavLink } from "react-router-dom";

const Registerleft = () => {
    return (
        <div className="regis-left">
            <div className="regis-left-upper">
                <h1>Laundry </h1>
                <h1>Service</h1>
                <p>Doorstap Wash &</p>
                <p>Dryclean Service</p>

            </div>
            <div className="regis-left-lower">
                <p>Already have an account</p>
                <NavLink to="/"><button>Sign in</button></NavLink>

            </div>
        </div>
    )
}

export default Registerleft