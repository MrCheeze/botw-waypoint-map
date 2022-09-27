var panzoomInstance;

addEventListener('DOMContentLoaded', () => {
    panzoomInstance = panzoom(document.querySelector('#container'), {
        minZoom: 0.5,
        maxZoom: 2.5,

        // Prevent moving the map when clicking a waypoint on desktop
        beforeMouseDown: function (e) {
            if (e.target?.className?.includes("waypoint")) return true;
            return false; // tells the library to not preventDefault.
        },

        // Prevent dragging when clicking a waypoint on mobile
        onTouch: function (e) {
            if (e.target?.className?.includes("waypoint")) return false;
            return true; // tells the library to not preventDefault.
        }
    })
})
