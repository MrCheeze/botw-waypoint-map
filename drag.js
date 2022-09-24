addEventListener('DOMContentLoaded', (event) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const ele = document.getElementById('container');
    ele.scrollTop = 100;
    ele.scrollLeft = 150;

    const mouseDownHandler = function (e) {
        if (e.target.tagName !== "IMG") return
        pos = {
            // The current scroll
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };
        
        // Change the cursor and prevent user from selecting the text
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function (e) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    document.addEventListener('mousedown', mouseDownHandler)
});
