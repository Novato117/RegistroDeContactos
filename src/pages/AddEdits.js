import './AddEdit.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
const initialState = {
    name: "",
    email: "",
    contact: "",
};
function AddEdit() {

    const [state, setState] = useState(initialState)
    const { name, email, contact } = state;
    const history = useNavigate();
    const { id } = useParams();
    /**
     * carga los datos para editar
     */
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("please provide value into each input field");
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", { name, email, contact, })
                    .then(() => { setState({ name: "", email: "", contact: "" }); })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Contact Aded Successfully")
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, { name, email, contact, })
                    .then(() => { setState({ name: "", email: "", contact: "" }); })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Contact update Successfully")

            }
            setTimeout(() => history.push("/"), 500);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' placeholder='your name ....' value={name || ""} onChange={handleInputChange} />

                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='your email ....' value={email || ""} onChange={handleInputChange} />

                <label htmlFor='contact'>Contact</label>
                <input type='number' id='contact' name='contact' placeholder='your contact ....' value={contact || ""} onChange={handleInputChange} />

                <input type='submit' value={id ? "update" : "save"} />
                <Link to="/">
                    <input type='button' value="Go back" />
                </Link>
            </form>
        </div>
    )
}


export default AddEdit;