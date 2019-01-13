(function () {
    var $togglers = $('[uk-toggle]');

    $togglers.each(function () {
        var $toggler = $(this);
        var $target = '';
        var str = $toggler.attr('uk-toggle')||$toggler.attr('href');
        if (str.indexOf('target:') === -1)
        {
            $target = $(str);
        }
        else {
            var reg = /target:.+\;/i;
            var telem = str.match(reg);
            if(telem !== null) $target = $(telem[0].substring('target:'.length, telem[0].length - 1));
        }

            var activeClassName = 'tm-toggle-active';

            $target.on({
                'shown': function () {
                    $toggler.addClass(activeClassName);
                    $toggler.text('закрыть фильтр');
                },
                'hidden': function () {
                    $toggler.removeClass(activeClassName);
                    $toggler.text('фильтр');

                }
            });

    });

})();