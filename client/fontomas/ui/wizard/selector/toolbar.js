/*global window, nodeca, jQuery, Handlebars, Backbone, $, _*/

"use strict";

function tranferEvents($a, $b, events) {
  $a.on(events.join(' '), $b.trigger);
}


module.exports = Backbone.View.extend({
  el: "#selector-toolbar",

  events: {
    "click [data-glyph-size]": "onChangeGlyphSize",
    "change #local-files":     "onChangeLocalFiles"
  },


  initialize: function () {
    _.bindAll(this);

    // render icon size buttons
    $('#glyph-size')
      .html(nodeca.client.fontomas.render('icon-size', {
        buttons: nodeca.client.fontomas.config.preview_glyph_sizes
      }))
      .find("button:last")
        .addClass("active");

    // transfer click event to hidden files input
    this.$('#browse-local-files').on('click', $('#local-files').trigger);
  },


  onChangeGlyphSize: function (event) {
    /*jshint bitwise:false*/
    event.preventDefault();
    this.trigger("change:glyph-size", ~~$(event.target).data('glyph-size'));
  },


  // fired when hidden file input was changed (user selected files)
  onChangeLocalFiles: function (event) {
    event.preventDefault();
    this.trigger("change:local-files", event.target.files);
  }
});
