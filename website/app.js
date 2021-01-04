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

const formEvent = form.addEventListener("submit",(event)=>{
    event.preventDefault()
    sendEmail()
})

function sendEmail(name, email, message) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    };
  
    return fetch("https://masa-plast-arabic.herokuapp.com/contact", options)
      .then(res => res.json())
      .then(res => {
        console.log("here is the response: ", res);
      })
      .catch(err => {
        console.error("here is the error: ", err);
      });
  }
