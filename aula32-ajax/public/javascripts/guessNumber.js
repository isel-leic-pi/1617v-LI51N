window.onload = function() {
    const txtNumber = document.getElementById('txtNumber')
    const divGuessResult = document.getElementById('divGuessResult')
    let viewGuessResult
    request('get', '/partials/guessResult.hbs', null, (err, data) => {
        if(err) throw err
        else viewGuessResult = Handlebars.compile(data)
    })
    

    document.getElementById('btTry').addEventListener('click', () => {
        const nr = txtNumber.value
        if(isNaN(nr)) divGuessResult.innerHTML = viewGuessResult({
            alertType: 'alert-danger',
            alertMsg: 'Please insert a valid number!'
        })
        else if(nr.length > 1)   divGuessResult.innerHTML = viewGuessResult({
            alertType: 'alert-danger',
            alertMsg: 'Please insert 1 digit number!'
        })
        else request('GET', '/guess/' + nr, null, (err, data) => {
            if(err) return alert(err)
            divGuessResult.innerHTML = data 
        })
    })

    function request(verb, uri, body, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open(verb, uri)
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                if(xhr.status == 200)
                    cb(null, xhr.responseText)
                else {
                    cb(new Error(xhr.status + ' ' + xhr.responseText))
                }
            }
        }
        xhr.send(body)
    }
}