let input = document.querySelector('.input_value')
//let inputValue = input.value
let button = document.querySelector('.button')
let city = document.querySelector('.name')
let degree = document.querySelector('.degree')
let description = document.querySelector('.description')
let icon = document.querySelector('.image')
let buttonLocation = document.querySelector('.buttonLocation')
let longitude
let latitude



buttonLocation.addEventListener('click', function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else{
    alert('Something wrong')
  }

})

function showPosition(position){
  latitude =  position.coords.latitude
  longitude =  position.coords.longitude
  
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=12b19b3fba214c198e5d94b32ec00003`)
  .then(pos=>pos.json())
  .then(posData=>{
    console.log(posData?.name)
    let cityName = posData?.name
    let temp = posData?.main?.temp
    let descValue = posData['weather']['0']['description']
    let iconsvg = posData['weather']['0']['icon']
    let iconSRC = `<img src='http://openweathermap.org/img/wn/${iconsvg}@2x.png'>`

    city.innerHTML= cityName
    degree.innerHTML=Math.round(temp-272.15)
    description.innerHTML=descValue
    icon.innerHTML=iconSRC
    
  })
  .catch(err => alert('Wrong City'))
}



button.addEventListener('click', function(){
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=df4eaa799dc0c37d3b3c8a65d64be622`)
  .then(ertek => ertek.json())
  .then(data => {console.log(data)
    let cityName = data.name
    let temp = data['main']['temp']
    let descValue = data['weather']['0']['description']
    let iconsvg = data['weather']['0']['icon']
    let iconSRC = `<img src='http://openweathermap.org/img/wn/${iconsvg}@2x.png'>`

    city.innerHTML= cityName
    degree.innerHTML=Math.round(temp-272.15)
    description.innerHTML=descValue
    icon.innerHTML=iconSRC
    input.value=""
   })

  .catch(err => alert('Wrong City'))
})
