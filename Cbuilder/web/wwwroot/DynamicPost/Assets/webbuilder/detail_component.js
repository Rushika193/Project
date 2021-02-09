if (typeof component === "undefined") {
    var component = {};
}
if (typeof component.dynamic_cmp_detail === "undefined") {
    component.dynamic_cmp_detail = {
        settingDOMs: {},
        styleDOMs: {},
        responsiveDOMs: {},
    };
}
var detail_component = {
    template: {
        componentname: "dynamic",
        category: "advance",
        icon: "fa fa-file-text-o",
        row: false,
        hidden: false,
        collection: false,
        bucket: false,
        inherits: "dynamic_cmp_detail",
        type: "dynamic_post",
        defaultdata: "<div data-type='dynamic'><h2>Dynamic component</h2></div>",
        beforedrop: function ($appendedParent, $appendLayer, dropped) {
            component["dynamic_cmp_detail"].beforedrop($appendedParent, $appendLayer, dropped, this.componentname);
        },
        afterdrop: function ($appendedParent, $appendLayer, dropped) {
            component["dynamic_cmp_detail"].afterdrop($appendedParent, $appendLayer, dropped, this.componentname);
        },
        settingDOMs: component["dynamic_cmp_detail"].settingDOMs,
        styleDOMs: component["dynamic_cmp_detail"].styleDOMs,
        responsiveDOMs: component["dynamic_cmp_detail"].responsiveDOMs,
        binddata: function ($layer, apiResponse) {
            component["dynamic_cmp_detail"].binddata($layer, apiResponse);
        },
        binddataerror: function ($layer, response) {
            component["dynamic_cmp_detail"].binddataerror($layer, response);
        },
        removeedit: function ($editDOM) {
            component["dynamic_cmp_detail"].removeedit($editDOM, this.componentname);
        },
        remove: function ($cloneDOM) {
            component["dynamic_cmp_detail"].remove($cloneDOM, this.componentname);
        },
        view: {
            view: function (param) {
                component["dynamic_cmp_detail"].view.view(param);
            }
        }
    }
};