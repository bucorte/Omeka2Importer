(function ($) {
    var activeElement = null;
    
    $(document).ready(function() {
        $('tr.element').click(function(e) {
            if (activeElement !== null) {
                activeElement.removeClass('active');
            }
            
            activeElement = $(e.target).closest('tr.element');
            activeElement.addClass('active');
        });
        
        $('li.selector-child').on('click', function(e){
            e.stopPropagation();
            //looks like a stopPropagation on the selector-parent forces
            //me to bind the event lower down the DOM, then work back
            //up to the li
            var targetLi = $(e.target).closest('li.selector-child');
            if (activeElement == null) {
                alert("Select an element at the left before choosing a property.");
            } else {
                //first, check if the property is already added
                var hasMapping = activeElement.find('ul.mappings li[data-property-id="' + targetLi.data('property-id') + '"]');
                if (hasMapping.length === 0) {
                    var elementId = activeElement.data('element-id');
                    var newInput = $('<input type="hidden" name="element-property[' + elementId + '][]" ></input>');
                    newInput.val(targetLi.data('property-id'));
                    activeElement.find('td.mapping').append(newInput);
                    activeElement.find('ul.mappings').append('<li data-property-id="' + targetLi.data('property-id') + '">' + targetLi.data('child-search') + '</li>');
                } else {
                    alert('Element is already mapped');
                }
            }
        });
    });
})(jQuery);
