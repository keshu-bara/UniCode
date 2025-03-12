import React, { useState } from 'react';
import { Form , useNavigate} from 'react-router';

const Register = () => {
    const navigate = useNavigate();
    let url = "http://192.168.1.114:8000/api/users/";
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        username: '',
        password: ''
    });

    const is_Valid = () => {
        return Object.values(formData).every(field => field.trim() != "");
    }
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        if(is_Valid()){
            let data = formData;
            console.log(data);
            let response = fetch(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response.status);

            setFormData({
                      email: "",
                      name: "",
                      username: "",
                      password: "",
            });
            
            navigate("/login");


        }
        else{
            return alert("Fill the necessay!")
        }
        


        
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-3xl font-bold italic text-center mb-6">campusLive</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;