const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://bgmi-tournament-v1.onrender.com/auth/login', formData);
        
        // Check if the token is present in the response
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            navigate('/');
        } else {
            throw new Error('No token received');
        }
    } catch (error) {
        console.error('Error during login:', error); // Log the entire error object for inspection
        
        // Check if it's an error with the response
        if (error.response && error.response.data) {
            setError(error.response.data.message || 'An error occurred. Please try again.');
        } else {
            setError('Unable to login. Please check your credentials and try again.');
        }
    }
};
