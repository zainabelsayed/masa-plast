const counters = document.querySelectorAll('.counter')
const speed = 500
const mapDiv= document.querySelector('.mapDiv')
counters.forEach(counter=>{
    document.addEventListener('scroll', ()=>{
        if (window.scrollY- 196 >= counter.getBoundingClientRect().top) {
            console.log('I have been reached');
            updateCount()
          }
    });
    function updateCount(){
        const target = +counter.getAttribute('data-target')
        const count = +counter.innerText
        const inc = (target / speed)

        if(count < target){
            counter.innerText = (count + inc).toFixed(4)
            setTimeout(updateCount,3)
        }else{
            counter.innerText = target
        }
    }
})



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
const updateUI = async() => {// updating the ui with the new data from user and api
    const request = await fetch('/all')
    try{
        const msg=document.getElementById('msg').value
        msg.innerText='لقد تم إرسال الرسالة بنجاح.'
        console.log(msg)
    }catch(error){
        console.log('errors',error)
    }
}
