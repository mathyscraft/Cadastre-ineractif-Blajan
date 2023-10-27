let path = document.getElementsByTagName("path")

function loadData(id) {
    document.getElementById("numero").innerHTML = id
    document.getElementById("nature").innerHTML = data[id].nature
    document.getElementById("proprietaire").innerHTML = data[id].nom.toUpperCase()+" "+data[id].prenom
    document.getElementById("profession").innerHTML = data[id].profession
}

for(i=0; i < path.length; i++) {
    path[i].setAttribute("opacity", "0")
    path[i].addEventListener("mouseenter", (e) => {
        let target = e.target
        if (target.getAttribute("opacity") !== "1") {
            target.setAttribute("fill", "#f1f1f1")
            target.setAttribute("opacity", "0.9")
        }
    })
    path[i].addEventListener("mouseleave", (e) => {
        let target = e.target
        if (target.getAttribute("opacity") !== "1") {
            target.setAttribute("fill", "#24ff00")
            target.setAttribute("opacity", "0")
        }
    })
    path[i].addEventListener("click", (e) => {
        let target = e.target
        for(i=0; i < path.length; i++) {
            path[i].setAttribute("opacity", "0")
        }
        target.setAttribute("fill", "#24ff00")
        target.setAttribute("opacity", "1")
        loadData(target.id)
    })
}


const map = document.getElementById("cadastral-map");

const panZoom = panzoom(map, {
    minZoom: 0.1,
    maxZoom: 3,
    bounds: true,
    boundsPadding: 0.2,
    // initialX: 1500,
    // initialY: 1500,
    initialZoom: 0.5
});


const datalistKeys = []
for (i in data) {
    const keys = ["nature", "nom", "prenom", "profession"]
    for (j in keys) {
        let datalist = document.getElementById("data-"+keys[j])
        if (datalistKeys.indexOf(data[i][keys[j]]) === -1) {
            let option = document.createElement('option')
            option.setAttribute("value", data[i][keys[j]])
            datalist.appendChild(option)
            datalistKeys.push(data[i][keys[j]])
        }
    }
}

function search() {
    for(i=0; i < path.length; i++) {
        path[i].setAttribute("opacity", "0")
    }
    document.getElementById("numero").innerHTML = ""
    document.getElementById("nature").innerHTML = ""
    document.getElementById("proprietaire").innerHTML = ""


    const searchKeys = {
        "nature": document.getElementById("search-nature").value,
        "nom": document.getElementById("search-nom").value,
        "prenom": document.getElementById("search-prenom").value,
        "profession": document.getElementById("search-profession").value
    }

    for (i in searchKeys) {
        if (searchKeys[i] === "") {
            delete searchKeys[i]
        }
    }
    console.log(searchKeys)
    for (i in data) {
        let correctKeys = true
        for (j in searchKeys) {
            if (data[i][j].toUpperCase() !== searchKeys[j].toUpperCase()) {
                correctKeys = false
            }
        }
        if (correctKeys) {
            document.getElementById(i).setAttribute('fill', "#24ff00")
            document.getElementById(i).setAttribute('opacity', "1")
        }
    }
}