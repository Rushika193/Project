if (typeof component === "undefined") {
    var component = {};
}
if (typeof component.dynamic_cmp_list === "undefined") {
    component.dynamic_cmp_list = {
        settingDOMs: {},
        styleDOMs: {},
        responsiveDOMs: {},
    };
}
var list_component = {
    template: {
        componentname: "dynamic",
        category: "advance",
        icon: "fa fa-th-list",
        row: false,
        hidden: false,
        collection: false,
        bucket: false,
        type: "dynamic_post",
        inherits: 'dynamic_cmp_list',
        defaultdata: "",
        beforedrop: function ($appendedParent, $appendLayer, dropped) {
            component["dynamic_cmp_list"].beforedrop($appendedParent, $appendLayer, dropped, this.componentname);
        },
        afterdrop: function ($parent, $layer, dropped) {
            component["dynamic_cmp_list"].afterdrop($parent, $layer, dropped, this.componentname);
        },
        settingDOMs: component["dynamic_cmp_list"].settingDOMs,
        styleDOMs: component["dynamic_cmp_list"].styleDOMs,
        responsiveDOMs: component["dynamic_cmp_list"].responsiveDOMs,
        binddata: function ($layer, apiResponse) {
            component["dynamic_cmp_list"].binddata($layer, apiResponse);
        },
        binddataerror: function ($parent, response) {
            component["dynamic_cmp_list"].binddataerror($parent, response);
        },
        removeedit: function ($editDOM) {
            component["dynamic_cmp_list"].removeedit($editDOM, this.componentname);
        },
        remove: function ($cloneDOM) {
            component["dynamic_cmp_list"].remove($cloneDOM, this.componentname);
        },
        view: {
            view: function (param) {
                component["dynamic_cmp_list"].view.view(param);
            }
        }
    }
};