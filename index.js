document.addEventListener('DOMContentLoaded', () => {
    const person1BirthdateElement = document.getElementById("birth-date1")
    const person2BirthdateElement = document.getElementById("birth-date2")

    const person1GenderElement = document.getElementById("gender1")
    const person2GenderElement = document.getElementById("gender2")

    const person1OrientationElement = document.getElementById("orientation1")
    const person2OrientationElement = document.getElementById("orientation2")

    const percentageBubbleElement = document.getElementById("percentage-bubble")
    const percentageElement = document.getElementById("percentage")

    const errorElement = document.getElementById("error")

    function showError(message) {
        errorElement.innerText = `Error: ${message}`
    }

    function showResult(result) {
        let resultStr;
        if (result >= 80) {
            resultStr = "good"
        } else if (result >= 60 && result < 80) {
            resultStr = "normal"
        } else {
            resultStr = "bad"
        }
        percentageBubbleElement.dataset.result = resultStr
        percentageElement.innerText = result + '%'
    }

    function hideResultAndError() {
        errorElement.innerText = ""
        percentageElement.innerText = ""
        percentageBubbleElement.removeAttribute('data-result')
    }

    for (const fields of document.getElementsByClassName("person-fields")) {
        for (const field of fields.children) {
            field.addEventListener("change", hideResultAndError)
        }
    }

    document.getElementById("calculate").addEventListener('click', () => {
        const person1birth = person1BirthdateElement.valueAsDate
        const person2birth = person2BirthdateElement.valueAsDate

        const person1Gender = person1GenderElement.value
        const person2Gender = person2GenderElement.value

        const person1Orientation = person1OrientationElement.value
        const person2Orientation = person2OrientationElement.value

        if (person1birth === null || person2birth === null) {
            showError("missing birth dates!")
            return
        }

        const person1age = getAge(person1birth)
        const person2age = getAge(person2birth)

        if (person1age < 13 || person2age < 13) {
            showError("the minimum allowed age is 13!")
            return
        }
        
        const whoPedophile = getPedophile(person1age, person2age)
        if (whoPedophile !== null) {
            showError("the age gap is too big!")
            return
        }

        const areCompatible = areGendersCompatible(person1Gender, person1Orientation, person2Gender, person2Orientation)
        if (!areCompatible) {
            showError("incompatible genders!")
            return
        }

        const zodiacCompatibility = getZodiacCompatibility(person1birth, person2birth);
        console.log(zodiacCompatibility)

        showResult(zodiacCompatibility)
    })
})

function getPedophile(person1age, person2age) {
    console.table({"person1": person1age, "person2": person2age})
    
    if (person2age < getMinAge(person1age)) {
        return "person1"
    }
    
    if (person1age < getMinAge(person2age)) {
        return "person2"
    }
    
    return null
}

function getAge(personBirthdate) {
    const currentDate = new Date(Date.now())
    const difference = Math.abs(currentDate - personBirthdate)
    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
}

function getMinAge(age) {
    return Math.round((age / 2) + 7)
}

function areGendersCompatible(person1Gender, person1Orientation, person2Gender, person2Orientation) {
    if (person1Orientation === "asexual" || person2Orientation === "asexual") {
        return false
    }

    if (person1Gender === person2Gender) {
        return person1Orientation !== "heterosexual" && person2Orientation !== "heterosexual"
    }

    if (person1Gender !== person2Gender) {
        return person1Orientation !== "homosexual" && person2Orientation !== "homosexual"
    }

    return true
}

const zodiacCompatibility = {
    "aries": {
        "aries": 70,
        "taurus": 60,
        "gemini": 80,
        "cancer": 80,
        "leo": 90,
        "virgo": 85,
        "libra": 65,
        "scorpio": 50,
        "sagittarius": 90,
        "capricorn": 55,
        "aquarius": 95,
        "pisces": 75,
    },
    "taurus": {
        "taurus": 90,
        "gemini": 70,
        "cancer": 95,
        "leo": 55,
        "virgo": 85,
        "libra": 80,
        "scorpio": 90,
        "sagittarius": 45,
        "capricorn": 90,
        "aquarius": 75,
        "pisces": 95,
    },
    "gemini": {
        "gemini": 80,
        "cancer": 70,
        "leo": 80,
        "virgo": 80,
        "libra": 90,
        "scorpio": 90,
        "sagittarius": 45,
        "capricorn": 80,
        "aquarius": 95,
        "pisces": 45,
    },
    "cancer": {
        "cancer": 90,
        "leo": 70,
        "virgo": 85,
        "libra": 75,
        "scorpio": 90,
        "sagittarius": 60,
        "capricorn": 80,
        "aquarius": 90,
        "pisces": 95,
    },
    "leo": {
        "leo": 85,
        "virgo": 70,
        "libra": 90,
        "scorpio": 60,
        "sagittarius": 95,
        "capricorn": 70,
        "aquarius": 85,
        "pisces": 80,
    },
    "virgo": {
        "virgo": 85,
        "libra": 75,
        "scorpio": 70,
        "sagittarius": 70,
        "capricorn": 95,
        "aquarius": 75,
        "pisces": 75,
    },
    "libra": {
        "libra": 75,
        "scorpio": 50,
        "sagittarius": 80,
        "capricorn": 65,
        "aquarius": 90,
        "pisces": 80,
    },
    "scorpio": {
        "scorpio": 80,
        "sagittarius": 85,
        "capricorn": 90,
        "aquarius": 90,
        "pisces": 95,
    },
    "sagittarius": {
        "sagittarius": 90,
        "capricorn": 80,
        "aquarius": 60,
        "pisces": 70,
    },
    "capricorn": {
        "capricorn": 80,
        "aquarius": 70,
        "pisces": 80,
    },
    "aquarius": {
        "aquarius": 90,
        "pisces": 70,
    },
    "pisces": {
        "pisces": 90,
    },
}

function getZodiacCompatibility(person1Birthdate, person2Birthdate) {
    const person1Zodiac = getZodiac(person1Birthdate)
    const person2Zodiac = getZodiac(person2Birthdate)

    console.table({"person1": person1Zodiac, "person2": person2Zodiac})

    return zodiacCompatibility[person1Zodiac][person2Zodiac] || zodiacCompatibility[person2Zodiac][person1Zodiac]
}

function getZodiac(personBirthdate) {
    const month = personBirthdate.getMonth()
    const day = personBirthdate.getDate();
    switch (month) {
        case 0:  return day >= 20 ? "aquarius" : "capricorn"
        case 1:  return day >= 19 ? "pisces" : "aquarius"
        case 2:  return day >= 21 ? "aries" : "pisces"
        case 3:  return day >= 20 ? "taurus" : "aries"
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