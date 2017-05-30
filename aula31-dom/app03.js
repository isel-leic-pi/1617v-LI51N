 window.onload = () => {
    const btAdd = document.querySelector('#btAdd')
    btAdd.addEventListener('click', sayHello)
    btAdd.addEventListener('click', changeColor)
    btAdd.addEventListener('click', addCoreWeb)

    function sayHello() {
        console.log('Hello...')
    }
    function changeColor(ev) {
        const btAdd = ev.target
        const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
        btAdd.style.backgroundColor = rndCol;
    }
    function addCoreWeb(){
        const ulCoreWeb = document.querySelector('#ulCoreWeb')
        const txtConcept = document.querySelector('#txtConcept')
        /*
        const txt = document.createTextNode(txtConcept.value)
        const li = document.createElement('li')
        li.appendChild(txt)
        ulCoreWeb.appendChild(li)
        */
        const li = '<li>' + txtConcept.value + '</li>'
        ulCoreWeb.innerHTML += li
    }
    function random(number) {
        return Math.floor(Math.random()*number);
    }
}