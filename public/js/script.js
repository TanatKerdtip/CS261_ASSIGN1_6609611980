function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginBox = document.getElementById('loginBox');

    if (!username || !password) {
        errorMessage.textContent = "Please fill out both username and password.";
        errorMessage.style.color = "red";
        loginBox.style.display = "none";
        return;
    }
    if (username.length !== 10) {
        errorMessage.textContent = 'Username must have 10 digits.';
        loginBox.style.display = "none";
        return;
    } else {
        errorMessage.textContent = ""; 
    }

    const requestBody = {
        UserName: username, 
        PassWord: password  
    };

    // Fetch API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Application-Key": "",
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if ( data.displayname_th && data.displayname_en && data.email && data.department && data.faculty) {
            loginBox.innerHTML = `
                <p><strong>Name (EN):</strong> ${data.displayname_en}</p>
                <p><strong>ชื่อ (ภาษาไทย):</strong> ${data.displayname_th}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Faculty:</strong> ${data.faculty}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>StudentID:</strong> ${data.username}</p>
            `;
        } else {
            loginBox.innerHTML = `<p>Login successful, but some information is missing from the response.</p>`;
        }

        loginBox.style.display = "block"; 
    })
    .catch(error => {
        console.error('Error:', error);
        loginBox.innerHTML = `<p>Login Failed: ${error.message}</p>`;
        loginBox.style.display = "block";
    });
}
