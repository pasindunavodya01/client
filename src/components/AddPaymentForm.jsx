import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPaymentForm = () => {
  const [formData, setFormData] = useState({
    admission_number: '',
    course_id: '',
    amount_due: '',
    amount_paid: '',
    payment_type: 'full',
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for dropdown
    axios.get('http://localhost:5000/api/courses') // <-- Correct route
      .then(res => {
        setCourses(res.data);
        console.log('Courses loaded:', res.data); // Add this line
      })
      .catch(err => console.error('Error loading courses:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/payments/add', formData)
      .then(res => {
        alert('Payment added successfully');
        setFormData({
          admission_number: '',
          course_id: '',
          amount_due: '',
          amount_paid: '',
          payment_type: 'full',
        });
      })
      .catch(err => {
        console.error('Error adding payment:', err);
        alert('Error adding payment');
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#b30d0d]">Add Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="admission_number" 
          value={formData.admission_number} 
          onChange={handleChange} 
          placeholder="Admission Number" 
          className="w-full px-4 py-2 border rounded-lg"
          required 
        />
        
        <select 
          name="course_id" 
          value={formData.course_id} 
          onChange={handleChange} 
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name} - ₹{course.amount}
            </option>
          ))}
        </select>

        <input 
          name="amount_due" 
          type="number" 
          value={formData.amount_due} 
          onChange={handleChange} 
          placeholder="Amount Due" 
          className="w-full px-4 py-2 border rounded-lg"
          required 
        />
        
        <input 
          name="amount_paid" 
          type="number" 
          value={formData.amount_paid} 
          onChange={handleChange} 
          placeholder="Amount Paid" 
          className="w-full px-4 py-2 border rounded-lg"
          required 
        />

        <select 
          name="payment_type" 
          value={formData.payment_type} 
          onChange={handleChange} 
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="full">Full Payment</option>
          <option value="half">Half Payment</option>
        </select>

        <button 
          type="submit"
          className="w-full bg-firebrick text-white py-2 rounded-lg hover:bg-deepRed"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default AddPaymentForm;
