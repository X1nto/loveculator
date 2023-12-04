document.addEventListener('DOMContentLoaded', () => {
    const person1birth = document.getElementById("birth-date1")
    const person2birth = document.getElementById("birth-date2")

    document.getElementById("calculate").addEventListener('click', () => {
        // console.log(calculateZodiac(person1birth))
        const dateNow = new Date(Date.now())
        console.log(dateNow)
        const difference = Math.abs(dateNow - person1birth.valueAsDate)
        const years = Math.round(difference / (1000 * 60 * 60 * 24 * 365.25))
        console.log(years)
        const whoPedophile = whoPedophile()
    })
})

function whoPedophile(person1age, person2age) {
    if (getMinAge(person1age) < person2age) {
        return "person1"
    } else if (getMinAge(person2age < person1age)) {
        return "person2"
    } else {
        return null
    }
}

function getMinAge(age) {
    return Math.round((age / 2) + 7)
}

function calculateZodiac(date) {
    const dateObj = date.valueAsDate
    const month = dateObj.getMonth()
    const day = dateObj.getDate();
    switch (month) {
        case 0:  return day >= 20 ? "aquarius" : "capricorn"
        case 1:  return day >= 19 ? "pisces" : "aquarius"
        case 2:  return day >= 21 ? "aries" : "pisces"
        case 3:  return day >= 20 ? "taurus" : "pisces"
        case 4:  return day >= 21 ? "gemini" : "taurus"
        case 5:  return day >= 21 ? "cancer" : "gemini"
        case 6:  return day >= 23 ? "leo" : "cancer"
        case 7:  return day >= 23 ? "virgo" : "leo"
        case 8:  return day >= 23 ? "libra" : "virgo"
        case 9:  return day >= 23 ? "scorpio" : "libra"
        case 10: return day >= 22 ? "sagittarius" : "scorpio"
        case 11: return day >= 22 ? "capricorn" : "sagittarius"
    }
}