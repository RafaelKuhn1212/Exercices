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

function signUp(){

  fetch("http://127.0.0.1:3000/auth/signup",{
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
                  
                alert(data.message);
                
              }else{
                  alert(data.message);
              }
  
          }).catch((err) => {
            alert("Erro ao se cadastrar");
          })
  
    return false;
  }