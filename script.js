const carSelect = document.getElementById('car-select')
const carInfo = document.getElementById('car')
const price = document.getElementById('price')

const getData = async () => {
    try {
        const responseCars = await fetch('./db.json')

        return await responseCars.json()
    } catch (error) {
        throw new Error(error)
    }
}

const addOptions = () => {
    getData().then(data => {
        const cars = data['cars']

        cars.forEach((item, index) => {
            const option = document.createElement('option')

            option.value = index
            option.innerHTML = item.brand
            carSelect.append(option)
        })
    })
        .catch(error => console.log(error.message))
}

const printInfo = (car) => {
    carInfo.textContent = `Тачка: ${car.brand} ${car.model}`
    price.textContent = `Цена: ${car.price}$`
}

const getCar = () => {
    let selectedOption = carSelect.options[carSelect.selectedIndex]

    if (selectedOption.value !== '') {
        getData().then(data => {
            const cars = data['cars']
            const car = cars.find((item, index) => index === +selectedOption.value)

            printInfo(car)
        })
            .catch(error => console.log(error.message))
    } else {
        carInfo.textContent = ''
        price.textContent = 'Выберите тачку'
    }
}


addOptions()

carSelect.addEventListener('change', getCar)












