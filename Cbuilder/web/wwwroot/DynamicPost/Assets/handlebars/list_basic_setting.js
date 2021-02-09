(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list_basic_setting'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "﻿<div id='cmpListBasicSet'>\r\n    <div id='itemSetting'></div>\r\n    <div id='itemPerRow'></div>\r\n    <div class='Dn' id='postDetailPageLink'>\r\n        <div class=\"field-row stElWrap col50-50\">\r\n            <label class=\"fCol\">Choose detail page</label>\r\n            <span class=\"select__box fCol\">\r\n                <select id=\"postDetailPageList\">\r\n                    <option value=\"\">Select</option>\r\n                </select>\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();