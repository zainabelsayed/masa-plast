const mapDiv= document.querySelector('.mapDiv')
const form = document.getElementById('contact-form')

//map
function initMap(){
    const masaPlast = { lat: 30.881190, lng: 29.583682 };
    const map = new google.maps.Map(document.getElementById('map'),{
        zoom:13,
        center:masaPlast,
    })
    const marker= new google.maps.Marker({
        position:masaPlast,
        map:map,
    })
}

const formEvent = document.addEventListener("submit",(event)=>{
    event.preventDefault()
    let mail = new FormData(form)
    sendingMail(mail)
})

const sendingMail= (mail) =>{
    fetch("https://masa-plast-arabic.herokuapp.com/contact",{
        method:"post",
        body:mail,
    }).then((response)=>{
        return response.json()
    })
}
