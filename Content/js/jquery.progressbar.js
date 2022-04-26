(function($) {
    $.fn.progressbar = function (options) {     
    var opts = $.extend({ }, options);
    return this.each(function() {
      var $this = $(this);
      var $ul = $('<ul>').attr('class', 'progressbar');
      var currentIdx = -1
      var present = 0;
      $.each(opts.steps, function (index, value) {
          
          var $li = $('<li>').text('');       
          present = present + (100 / opts.steps.length);
          if (opts.steps.length-1 == index)
          {
              present = 100;
          }
          present = Math.trunc(present);       
        $li.css('width', (100 / opts.steps.length) + '%');
        $li.addClass('with-tooltip');        
        $li.attr('id', 'Progressli' + index + opts.idCounter);
        $li.attr('title', value.replace('@', '').replace('~', '') + ' ' + present + '%');       
        if(value.indexOf('@') > -1) {
            $li.addClass('current');
            $li.text(value.replace('@', '').replace('~', ''));
          currentIdx = index;
        }
        if(value.indexOf('~') > -1) {
          $li.addClass('fail');
        }
        $ul.append($li);
      });
      for(var i = 0; i < currentIdx; i++) {
          $($ul.find('li')[i]).addClass('done');
      }
      $this.append($ul);
    });
  };
})(jQuery);