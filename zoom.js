const zoomIncrement = 0.2;

const getZoom = () => +document.querySelector('#container').style.zoom || 1;
const setZoom = (zoom) => document.querySelector('#container').style.zoom = Math.max(zoom, zoomIncrement);

addEventListener('DOMContentLoaded', () => {
    document.querySelector("#zoom-in").onclick = () => setZoom(getZoom() + zoomIncrement);
    document.querySelector("#zoom-out").onclick = () => setZoom(getZoom() - zoomIncrement);
})

this.addEventListener('keypress', event => {
    if (event.key === "+" || event.key === "=") {
        setZoom(getZoom() + zoomIncrement)
    } else if (event.key === "-") {
        setZoom(getZoom() - zoomIncrement);
    }
})