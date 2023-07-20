let date = new Date()
let hour = date.getHours()
let background = document.querySelector('.background-container')


updateBackground()

function updateBackground() {

    let backgroundContainer = document.querySelector('.background-container')

    if(hour >= 0 && hour < 12) {
        background.style.backgroundImage = 'url(assets/images/dia.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, bom dia!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.20)')
    } else if (hour >= 12 && hour < 17) {
        background.style.backgroundImage = 'url(assets/images/tarde.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, boa tarde!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.0)')
    } else if(hour >= 17 && hour < 18 ) {
        background.style.backgroundImage = 'url(assets/images/finaltarde.jpg)'
        let titulo = document.querySelector('.header h1')
        titulo.innerHTML = 'Finalzinho de tarde...'
        titulo.style.fontSize = '45px'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.40)')
    } else {
        background.style.backgroundImage = 'url(assets/images/noite.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, boa noite!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.60)')
    }
}

setTimeout(()=>{
    document.querySelector('.loadingContainer').style.display = 'none'
    document.querySelector('.container').style.display = 'flex'
},1300)

setTimeout(()=>{
    document.querySelector('.header h3').style.display = 'flex'
},700)


async function searching() {
    let input = document.querySelector('#searchInput').value
    
    

    if( input !== ''){
        cleanInfo()
        showLoading('flex')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`

        let results = await fetch(url)
        let json = await results.json()

        console.log(json)

        if(json.cod === 200) {
            showInfo({
               name: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempIcon: json.weather[0].icon,
               wind: json.wind.speed,
               windAngle: json.wind.deg,
               feelsLike: json.main.feels_like,
               tempMax: json.main.temp_max,
               tempMin: json.main.temp_min,
            })
        } else {
            cleanInfo()
            showLoading('none')
            showWarning('<em>*Não encontramos essa localização.</em>')
        }
    }
}


document.querySelector('.lupa').addEventListener('click', ()=>{
    searching()
})

document.addEventListener('keyup', (event)=>{
    if(event.code === 'Enter'){
        searching()
    }
})



function cleanInfo() {
    showWarning('')
    document.querySelector('.results').style.display = 'none'

}

function showInfo(json) {
   showLoading('none')
   showWarning(' ')

   document.querySelector('.results').style.display = 'flex'
   document.querySelector('.city').innerHTML = `${json.name} - ${json.country}`
   document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`
   document.querySelector('.ventoInfo').innerHTML = `${json.wind.toFixed(1)} <span>km/h</span>`
   document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
   document.querySelector('.wind-position').style.transform = `rotate(${json.windAngle}deg)`
   document.querySelector('.feels-like-info').innerHTML = `${json.feelsLike.toFixed(0)}<sup>ºC</sup>`
   document.querySelector('.temp-max-info').innerHTML = `${json.tempMax.toFixed(0)}<sup>ºC</sup>`
   document.querySelector('.temp-min-info').innerHTML = `${json.tempMin.toFixed(0)}<sup>ºC</sup>`
}

function showLoading(on) {
    document.querySelector('.loading').style.display = on
}

function showWarning(msg) {
    document.querySelector('.aviso h1').style.display = 'flex'
    document.querySelector('.aviso h1').innerHTML = msg
}




