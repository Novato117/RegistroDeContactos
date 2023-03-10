import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './View.css'
function View() {
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);
    return (
        <div style={{ margin: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>Detalles del contacto</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Nombre: </strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact: </strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />
                    <Link to='/'>
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default View;