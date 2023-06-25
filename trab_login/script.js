function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
    
    fullName.textContent = data.fullName
    sub.textContent = data.sub
    given_name.textContent = data.given_name
    family_name.textContent = data.family_name
    email.textContent = data.email
    verifiedEmail.textContent = data.verifiedEmail
    picture.setAttribute("src", data.picture)
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "337146558167-1553oktp92a1oagq41jeislvuba3eilv.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),{ 
            theme: "outline", 
            size: "large",
            type:"standard",
            shape:"pill",
            theme:"filled_blue",
            text:"signin_with",           
            logo_alignment:"left",
            width:"300"
        }  
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
    }
