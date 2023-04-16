const weatherForm = document.querySelector('form');
const searchElm = document.querySelector('input');
weatherForm.addEventListener('click', (e)=>{
    e.preventDefault();
    const location = searchElm.value ;
    fetch('http://localhost:3000/weather/address=' + location).then((response)=>{
        console.log(response)
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                console.log(data.location);
                console.log(data.forecast);

            }
        })
    })
})