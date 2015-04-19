/**
 * Drag & drop implemenation taken from code by l.m.orchard, a Mozilla developer, at the following page:
 * http://decafbad.com/2009/07/drag-and-drop/api-demos.html#feedback_image
 */
$(document).ready(function() {

    $('#newschool .dragme')
    
        // Set the element as draggable.
        .attr('draggable', 'true')

        // Handle the start of dragging to initialize.
        .bind('dragstart', function(ev) {
            var dt = ev.originalEvent.dataTransfer;
            dt.setData("Text", "Dropped in zone!");
            return true;
        })

        // Handle the end of dragging.
        .bind('dragend', function(ev) {
            $.log('#newschool .messages', 'Drag ended');
            return false;
        });

    $('#newschool .drophere')

        // Highlight on drag entering drop zone.
        .bind('dragenter', function(ev) {
            $(ev.target).addClass('dragover');
            return false;
        })

        // Un-highlight on drag leaving drop zone.
        .bind('dragleave', function(ev) {
            $(ev.target).removeClass('dragover');
            return false;
        })

        // Decide whether the thing dragged in is welcome.
        .bind('dragover', function(ev) {
            return false;
        })

        // Handle the final drop...
        .bind('drop', function(ev) {
            var dt = ev.originalEvent.dataTransfer;
            console.log(dt);
            (document.getElementById("imgname")).value = getName(dt.getData("Text"));
            return false;
        });

});
