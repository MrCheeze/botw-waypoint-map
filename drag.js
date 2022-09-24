addEventListener('DOMContentLoaded', (event) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const container = document.getElementById('container');
    container.scrollTop = 100;
    container.scrollLeft = 150;

    const mouseDownHandler = function (e) {
        if (e.target.tagName !== "IMG") return
        pos = {
            left: container.scrollLeft,
            top: container.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };
        
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        const draggedX = e.clientX - pos.x;
        const draggedY = e.clientY - pos.y;

        container.scrollTop = pos.top - draggedY;
        container.scrollLeft = pos.left - draggedX;
    };

    const mouseUpHandler = function (e) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        container.style.cursor = 'grab';
        container.style.removeProperty('user-select');
    };

    document.addEventListener('mousedown', mouseDownHandler)
});
