

document.querySelector("#MyForm").addEventListener("submit", (ev) => {
    ev.preventDefault()

    let radius = parseFloat(document.querySelector("#radius").value)
    let volume = (4/3) * Math.PI * Math.pow(radius, 3)

    document.querySelector("#volume").value = volume
})