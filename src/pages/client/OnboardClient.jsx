import React, { useState } from 'react';
import axios from 'axios';

export default function OnboardClient() {
  const [form, setForm] = useState({
    email: '',
    organization: '',
    userRequest: {
      name: '',
      username: '',
      password: '',
      clientId: '',
      role: '',
      isFromClientAdmin: true
    }
  });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/client', form);
      alert('Client onboarded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to onboard client');
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Organization" onChange={e => setForm({ ...form, organization: e.target.value })} />
      <input placeholder="Name" onChange={e => setForm({ ...form, userRequest: { ...form.userRequest, name: e.target.value } })} />
      <input placeholder="Username" onChange={e => setForm({ ...form, userRequest: { ...form.userRequest, username: e.target.value } })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, userRequest: { ...form.userRequest, password: e.target.value } })} />
      <input placeholder="Client ID" onChange={e => setForm({ ...form, userRequest: { ...form.userRequest, clientId: e.target.value } })} />
      <input placeholder="Role" onChange={e => setForm({ ...form, userRequest: { ...form.userRequest, role: e.target.value } })} />
      <button onClick={handleSubmit}>Onboard Client</button>
    </div>
  );
}
