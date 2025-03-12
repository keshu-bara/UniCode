import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
    let url = "http://127.0.0.1:8000/api/users/";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const postData = (e) => {
        e.preventDefault();
        let data = {
            name,
            email,
            phone
        }
        let response = fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setName('');
        setEmail('');
        setPhone('');
        console.log(response);
    }

  
    return (
      <div>
        <h1>About Page</h1>
        <br />
        <form
        onSubmit={postData}
          className="flex flex-col gap-4 p-4 border rounded-md shadow-md"
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
             placeholder="Enter Name"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            placeholder="Enter Email"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            name="phone"
            placeholder="Enter Phone"
            className="p-2 border rounded-md"
          />
          <button type="submit" className="border bg-amber-400 p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    );
};

export default About;