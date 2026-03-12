async function testForgotPassword() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'aguinaldoarnaldo5@gmail.com' })
        });
        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Body:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testForgotPassword();
