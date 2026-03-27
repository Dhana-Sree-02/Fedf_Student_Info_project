import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL, callApi, IMGURL } from '../lib';

const ViewInfoPage = () => {
    const [usersData, setUsersData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        _id: "",
        id: "",
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        dept: "",
        address: "",
        password: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        callApi("GET", APIURL + "users/getallusers", "", loadUsers);
    }, []);

    function loadUsers(res) {
        setUsersData(res);
    }

    const filteredUsers = usersData.filter(user =>
        Object.values(user).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    function deleteUser(_id) {
        const ack = confirm("Do you want to delete? click OK");
        if (!ack)
            return;

        callApi("DELETE", APIURL + "users/deleteuser/" + _id, "", deleteResponse);
    }

    function deleteResponse(res) {
        alert(res.msg);
        callApi("GET", APIURL + "users/getallusers", "", loadUsers);
    }

    function editUser(index) {
        setFormData(usersData[index]);
        setIsEdit(true);
    }

    function closeEdit() {
        setIsEdit(false);
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function updateUser() {
        callApi("PUT", APIURL + "users/updateuser", JSON.stringify(formData), updateResponse);
    }

    function updateResponse(res) {
        alert(res.msg);
        setIsEdit(false);
        callApi("GET", APIURL + "users/getallusers", "", loadUsers);
    }

    function addNew() {
        setFormData({
            _id: "",
            id: "",
            firstname: "",
            lastname: "",
            mobile: "",
            email: "",
            dept: "",
            address: "",
            password: ""
        });
        setIsEdit(true);
    }

    function saveUser() {
        let data = JSON.stringify({
            id: formData.id,
            firstname: formData.firstname,
            lastname: formData.lastname,
            mobile: formData.mobile,
            email: formData.email,
            dept: formData.dept,
            address: formData.address,
            password: formData.password
        });
        callApi("POST", APIURL + "users/saveuser", data, saveResponse);
    }

    function saveResponse(res) {
        alert(res.msg);
        setIsEdit(false);
        callApi("GET", APIURL + "users/getallusers", "", loadUsers);
    }

    return (
        <div className='app view-info-page'>
            <div className='header'>
                <button className="back-btn" onClick={() => navigate('/main')}>&larr; Back to Home</button>
                <h1><span>Student Information Management</span></h1>
                <button className="logout-btn" onClick={() => { localStorage.removeItem("userRole"); navigate('/login'); }}>Logout</button>
            </div>
            <div className='section'>
                <div className="table-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by any field..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style={{ 'width': '50px' }}>S#</th>
                            <th style={{ 'width': '120px' }}>ID No</th>
                            <th style={{ 'width': '150px' }}>First Name</th>
                            <th style={{ 'width': '150px' }}>Last Name</th>
                            <th style={{ 'width': '120px' }}>Mobile#</th>
                            <th style={{ 'width': '200px' }}>Email</th>
                            <th style={{ 'width': '150px' }}>Department</th>
                            <th style={{ 'width': '200px' }}>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td style={{ 'textAlign': 'center' }}>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.mobile}</td>
                                <td>{user.email}</td>
                                <td>{user.dept}</td>
                                <td>{user.address}</td>
                                <td>
                                    <img src={IMGURL + "edit.png"} alt='Edit' onClick={() => editUser(index)} />
                                    <img src={IMGURL + "bin.png"} alt='Delete' onClick={() => deleteUser(user._id)} />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>No records found matching search</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='footer'>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <button style={{ marginRight: 'auto' }} onClick={() => addNew()}>Add New User</button>
                    <span style={{ margin: '0 auto' }}>Copyright @ 2026 - KL University</span>
                </div>
            </div>

            {isEdit &&
                <div className='popup'>
                    <div className='panel'>
                        <span className="close-popup" onClick={() => closeEdit()}>&times;</span>
                        <h3>{formData._id === "" ? "Add New User" : "Edit User Information"}</h3>
                        <div className="form-group">
                            <label>ID Number</label>
                            <input type='text' name='id' value={formData.id} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type='text' name='firstname' value={formData.firstname} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type='text' name='lastname' value={formData.lastname} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type='text' name='mobile' value={formData.mobile} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input type='email' name='email' value={formData.email} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input type='text' name='dept' value={formData.dept} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type='text' name='address' value={formData.address} onChange={(e) => handleInput(e)} />
                        </div>
                        {formData._id !== "" ?
                            <button className="btn-primary" onClick={() => updateUser()}>Update Info</button>
                            :
                            <button className="btn-primary" onClick={() => saveUser()}>Save Record</button>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default ViewInfoPage;
