/*

inspiration: 
https://dribbble.com/shots/2292415-Daily-UI-001-Day-001-Sign-Up

*/

function onload(){
    fetch("http://localhost:3000/auth",{
        method: "GET",
        body: JSON.stringify({
            token: localStorage.getItem("token")
        }),
    }).then(async (response) => {
        const data = await response.json();
        
        if(data.valid == true){
            localStorage.removeItem("token");
            window.location.href = '/frontend/index.html'
        }

    }).catch((err) => {
    })
}

function login(){

fetch("http://127.0.0.1:3000/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                        
            },
            body: JSON.stringify({
                username:document.getElementById('user').value,
                password:document.getElementById('pass').value
            })
        }).then(async (response) => {

            const data = await response.json();

            if(response.status == 200){
                
              localStorage.setItem('token', data.token);
              window.location.href = "/frontend/index.html";

            }else{
                alert(data.message);
            }

        }).catch((err) => {
            alert("Erro ao logar");
        })

  return false;
}