console.log("Welcome to Online Dictionary")
// https://api.dictionaryapi.dev/api/v2/entries/en_US/hello

let searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click', searchButtonHandler)
let lang = ''
let search = document.getElementById('searchTxt')
let hindi = document.getElementById('hindi')
let english = document.getElementById('english')

function searchButtonHandler() {
    // console.log(english.checked)
    // console.log(hindi.checked)
    if (hindi.checked) {
        lang = "hi"
        // console.log("hindi")
    }
    else if (english.checked) {
        lang = "en_US"
        // console.log("english")
    }
    const xhr = new XMLHttpRequest()
    console.log(lang)
    let word = search.value
    console.log(word)

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`, true)
    // xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/hi/guru`, true)

    let tableBody = document.getElementById('tbody')
    xhr.onload = function () {
        console.log("Fetching Starts")
        tableBody.innerHTML = ''
        str = `<thead>
                    <tr>
                        <th style="text-align: center; padding: 12px; font-size: 22px; scope="col" font-family: 'PT Serif';">#</th>
                        <th style="text-align: center; padding: 12px; font-size: 22px; scope="col" font-family: 'PT Serif';">Word</th>
                        <th style="text-align: center; padding: 12px; font-size: 22px; scope="col" font-family: 'PT Serif';">Part of Speech</th>
                        <th style="text-align: center; padding: 12px; font-size: 22px; scope="col" font-family: 'PT Serif';">Definition</th>
                        <th style="text-align: center; padding: 12px; font-size: 22px; scope="col" font-family: 'PT Serif';" id="show">Examples</th>
                    </tr>
                </thead>`
        tableBody.innerHTML += str
        str = ''
        if (this.status === 200 && english.checked) {
            let show = document.getElementById("show")
            show.classList.remove(`none`)
            let data = JSON.parse(this.responseText)
            console.log(data)
            let str = ''
            let c = 0
            for (let k = 0; k < Array.from(data).length; k++) {
                console.log(data[k])
                console.log(data[k].word)
                console.log(data[k].meanings)
                console.log(Array.from(data[k].meanings))
                for (let i = 0; i < Array.from(data[k].meanings).length; i++) {
                    console.log(data[k].meanings[i].partOfSpeech)
                    for (let j = 0; j < Array.from(data[k].meanings[i].definitions).length; j++) {
                        console.log(data[k].meanings[i].definitions[j].definition)
                        console.log(data[k].meanings[i].definitions[j].example)
                        if (data[k].meanings[i].definitions[j].example === undefined) {
                            data[k].meanings[i].definitions[j].example = ''
                        }
                        str = `<tr>
                                <th scope="row">${c + 1}</th>
                                <td style="text-align: justify; font-size: 1rem; padding: 13px; font-family: ubuntu;" class="justify">${data[k].word}</td>
                                <td style="text-align: justify; font-size: 1rem; padding: 13px; font-family: ubuntu;" class="justify">${data[k].meanings[i].partOfSpeech}</td>
                                <td style="text-align: justify; font-size: 1rem; padding: 13px; font-family: ubuntu;" class="justify">${data[k].meanings[i].definitions[j].definition}</td>
                                <td style="text-align: justify; font-size: 1rem; padding: 13px; font-family: ubuntu;" class="justify">${data[k].meanings[i].definitions[j].example}</td>
                            </tr>`
                        c = c + 1
                        tableBody.innerHTML += str
                        search.value = ''
                    }

                }
                // console.log("Fetching End")
            }
        }
        else if (this.status === 200 && hindi.checked) {
            let show = document.getElementById("show")
            show.classList.add(`none`)
            let data = JSON.parse(this.responseText)
            console.log(data)
            let str = ''
            let c = 0
            for (let k = 0; k < Array.from(data).length; k++) {
                console.log(data[k])
                console.log(data[k].word)
                console.log(data[k].meanings)
                console.log(Array.from(data[k].meanings))
                for (let i = 0; i < Array.from(data[k].meanings).length; i++) {
                    console.log(data[k].meanings[i].partOfSpeech)
                    for (let j = 0; j < Array.from(data[k].meanings[i].definitions).length; j++) {
                        console.log(data[k].meanings[i].definitions[j].definition)
                        console.log(data[k].meanings[i].definitions[j].example)
                        if (data[k].meanings[i].definitions[j].example === undefined) {
                            data[k].meanings[i].definitions[j].example = ''
                        }
                        str = `<tr>
                                <th scope="row">${c + 1}</th>
                                <td style="text-align:justify;" class="justify">${data[k].word}</td>
                                <td style="text-align:justify;" class="justify">${data[k].meanings[i].partOfSpeech}</td>
                                <td style="text-align:justify;" class="justify">${data[k].meanings[i].definitions[j].definition}</td>
                            </tr>`
                        c = c + 1
                        tableBody.innerHTML += str
                        search.value = ''
                    }

                }
                // console.log("Fetching End")
            }
        }
        else {
            console.log("Some Error occurred")
            search.value = ''
        }
    }

    xhr.send()
}
