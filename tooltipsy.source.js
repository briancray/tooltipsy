/* tooltipsy by Brian Cray
 * Lincensed under GPL2 - http://www.gnu.org/licenses/gpl-2.0.html
 * Option quick reference:
 *  - offset: Tooltipsy distance from mouse cursor as array [x, y]. Defaults to [10, 10]
 *  - id: DOM ID attached to tooltipsy instance. Defaults to "tooltipsy"
 *  - content: HTML or text content of tooltipsy. Defaults to "" (empty string), which pulls content from target element's title attribute
 *  - position: Position of tooltipsy relative to cursor - "Left", "right", or "auto". Defaults to "auto"
 *  - show: Function(event, element) to show the tooltip. Defaults to a show(100) effect
 *  - hide: Function(event, element) to hide the tooltip. Defaults to a fadeOut(100) effect
 * More information visit http://tooltipsy.com/
 */
 
(function($){
    $.tooltipsy = function(el, options){
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data("tooltipsy", base);

        base.init = function() {
            base.settings = $.extend({},$.tooltipsy.defaults, options);
            if($('#' + base.settings.id).length) {
                base.$tip = $('#' + base.settings.id);
            }
            else {
                base.$tip = $('<div id="' + base.settings.id + '">').appendTo('body').css({position: 'fixed', zIndex: '999'}).hide();
            }
        };

        base.init();
    };

    $.tooltipsy.defaults = {
        offset: [10, 10],
        id: 'tooltipsy',
        content: '',
        position: 'auto',
        show: function (e, $el) {
            $el.css('opacity', '1').show(100);
        },
        hide: function (e, $el) {
            $el.fadeOut(100);
        }
    };

    $.fn.tooltipsy = function(options) {
        return this.each(function() {
            new $.tooltipsy(this, options);
            var $thisel = $(this);
            var tooltipsy = $thisel.data('tooltipsy');
            $thisel.data('title', $thisel.attr('title')).attr('title', '');
            $thisel.bind('mouseenter', function (e) {
                var tip_position = [e.pageX - document.body.scrollLeft + tooltipsy.settings.offset[0], e.pageY - document.body.scrollTop + tooltipsy.settings.offset[1]];
                var tip_width = tooltipsy.$tip.stop().html(tooltipsy.settings.content != '' ? tooltipsy.settings.content : $thisel.data('title')).outerWidth();
                if(tooltipsy.settings.position == 'left' || (tooltipsy.settings.position == 'auto' && tip_position[0] + tip_width > $(window).width())) {
                    var tip_css = {top: tip_position[1] + 'px', right: $(window).width() - tip_position[0] + 'px', left: 'auto'};
                }
                else {
                    var tip_css = {top: tip_position[1] + 'px', left: tip_position[0] + 'px', right: 'auto'};
                }
                
                tooltipsy.$tip.css(tip_css);
                tooltipsy.settings.show(e, tooltipsy.$tip);
            }).bind('mouseleave', function (e) {
                tooltipsy.$tip.stop(true, true);
                tooltipsy.settings.hide(e, tooltipsy.$tip);
            });
        });
    };

})(jQuery);
