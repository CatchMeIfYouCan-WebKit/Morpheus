(function ($) {
  var _saveIcon = 'plugins/custom/save.svg';
  var _cancelIcon = 'plugins/custom/cancel.svg';

  // extend menu
  $.extend(true, $.fn.wPaint.menus.main.items, {
    save: {
      icon: 'generic',
      title: 'Save Image',
      img: _saveIcon,
      index: 0,
      callback: function () {
        this.options.saveImg.apply(this, [this.getImage()]);
      }
    },
    cancel: {
      icon: 'generic',
      title: 'Cancel',
      img: _cancelIcon,
      index: 0,
      callback: function () {
        this.options.cancel.apply(this, []);
      }
    },
  });

  // extend defaults
  $.extend($.fn.wPaint.defaults, {
    saveImg: null,   // callback triggerd on image save
    cancel:null,
  });

  // extend functions
  $.fn.wPaint.extend({
    _showFileModal: function (type, images) {
      var _this = this,
          $content = $('<div></div>'),
          $img = null;

      function appendContent(type, image) {
        function imgClick(e) {

          // just in case to not draw on canvas
          e.stopPropagation();
          if (type === 'fg') { _this.setImage(image); }
          else if (type === 'bg') { _this.setBg(image, null, null, true); }
        }

        $img.on('click', imgClick);
      }

      for (var i = 0, ii = images.length; i < ii; i++) {
        $img = $('<img class="wPaint-modal-img"/>').attr('src', images[i]);
        $img = $('<div class="wPaint-modal-img-holder"></div>').append($img);

        (appendContent)(type, images[i]);

        $content.append($img);
      }

      this._showModal($content);
    }
  });
})(jQuery);