import React, { useState } from 'react';
import axios from 'axios';
import './Employeeform.css';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Admin'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.employeeId || formData.employeeId.length > 10) newErrors.employeeId = 'Employee ID must be 1-10 characters.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';
        if (!formData.department) newErrors.department = 'Department is required.';
        if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) newErrors.dateOfJoining = 'Date of joining cannot be in the future.';
        if (!formData.role) newErrors.role = 'Role is required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        

        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            setMessage(response.data.message || 'Employee added successfully!');
            setFormData({
                name: '',
                employeeId: '',
                email: '',
                phone: '',
                department: '',
                dateOfJoining: '',
                role: '',
            });
            
                alert("Form Submitted Successufully");
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
        
    };

    return (
        
        <div className="form-container">
            <h2>Add Employee</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="First and Last Name"
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </label>

                <label>
                    Employee ID:
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="E.g., EMP123"
                        required
                    />
                    {errors.employeeId && <span className="error">{errors.employeeId}</span>}
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@domain.com"
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>

                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </label>

                <label>
                    Department:
                    <select name="department" value={formData.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                    {errors.department && <span className="error">{errors.department}</span>}
                </label>

                <label>
                    Date of Joining:
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        required
                    />
                    {errors.dateOfJoining && <span className="error">{errors.dateOfJoining}</span>}
                </label>

                <label>
                    Role:<input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="E.g., Manager"
                        required
                    />
                    
                    {errors.role && <span className="error">{errors.role}</span>}
                </label>

                <div className="button-container">
                    <button type="submit">Submit</button>
                    <button
    type="button"
    onClick={() => {
        setFormData({
            name: '',
            employeeId: '',
            email: '',
            phone: '',
            department: '',
            dateOfJoining: '',
            role: '',
        });
        setErrors({});
        setMessage('');
    }}
>
    Reset
</button>


                </div>
            </form>
        </div>
        
    );
};

export default EmployeeForm;