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
    const name = form.getElementsByTagName('input')[0].value
    const email = form.getElementsByTagName('input')[1].value
    const telephone = form.getElementsByTagName('input')[2].value
    const message = form.getElementsByTagName('textarea')[0].value
    console.log(name,email,telephone,message)
    sendEmail(name,email,telephone,message)
})

function sendEmail(name, email,telephone, message) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        telephone:telephone,
        message: message
      })
    };
  
    return fetch("/contact", options)
      .then(res => res.json())
      .then(res => {
        console.log("here is the response: ", res);
      })
      .catch(err => {
        console.log("here is the error: ", err);
      });
  }
