import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import { toast } from "react-toastify";
import axios from 'axios';
function Home() {
    const [data, setData] = useState();
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
        //console.log(response)
        //console.log(response.data)
    }
    useEffect(() => {
        loadData();
    }, [])
    const deleteContact = (id) => {
        if (window.confirm("Are you sure that you wanted delete that contact ?")
        ) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact delet successfully");
            setTimeout(() => loadData(), 500)
        }
    }
    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/addContact">
                <button className="btn btn-contact">Add Contact</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAling: "center" }}>No.</th>
                        <th style={{ textAling: "center" }}>Name</th>
                        <th style={{ textAling: "center" }}>Email</th>
                        <th style={{ textAling: "center" }}>Contact</th>
                        <th style={{ textAling: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        console.log(item)
                        //console.log(item.id)
                        //console.log(index)
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
export default Home;