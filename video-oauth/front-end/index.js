import axios from "axios";
import qs from "query-string"; 


function redirectToGithub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
        response_type: 'code',
        scope: 'user',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URL,
        state: 'test-t5'        
    }
    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
}

window.onload = async () => {
    document.querySelector(".login").addEventListener("click", redirectToGithub);

    const { code } = qs.parseUrl(window.location.href).query;
    if(code) {
        try{
            const response =  await axios.post(`${process.env.BACKEND_URL}/login`, { code });
            const user = response.data;
            alert("Você está logado!");
            console.log(user);         
        } catch (err) {
            alert("ops, deu erro!");
            console.log("err", err);
        }
    }
}