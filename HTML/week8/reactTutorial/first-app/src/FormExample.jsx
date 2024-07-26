import React, { useState, UseState } from 'react';

const FormExample = () => {
 const [formData, setFormData] = useState({name: '', email: ''})   
 const [submitFormData, setSubmmitFormData] = useState();

 const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({...formData, [name]: value});
  // printf(e);
 }

 const onSubmitFormData = (e) => {
    e.preventDefault();
    setSubmmitFormData(formData);
    setFormData({name: '', email: ''});
    //printf("submit clicked")
 }

 return(
    <div>
        <h1>Form Example</h1>
        <form>
            <input 
            type="text"
            name='name'
            onChange={handleInputChange}
            value={formData.name}
            placeholder='Name'
            required />
            <input 
            type="email"
            name='email'
            placeholder='Email'
            onChange={handleInputChange}
            value={formData.email}
            required />
            <button type='submit' onClick={onSubmitFormData}>Submit</button>
        </form>
        {submitFormData && (
            <div>
                <h2>Submitted Data</h2>
                <p><strong>Name:</strong>{submitFormData.name}</p>
                <p><strong>Email:</strong>{submitFormData.email}</p>
            </div>
        )}
    </div>
 )
}

export default FormExample;