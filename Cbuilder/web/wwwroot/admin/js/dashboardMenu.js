//javascript




(function () {
    "use strict";
    let DM = {
        init: function () {
            this.Event();
            let activeLink = document.querySelector(`.side-nav-link.links[href='${window.location.href}']`);
            if (activeLink !== null) {
                if (activeLink.closest(".sub-menu") === null) {
                    activeLink.parentElement.classList["add"]("active");
                } else {
                    activeLink.closest(".isChildLink").classList["add"]("active");
                }
            }
        },
        Event: function () {
            let obj = this;
            let parent = document.getElementsByClassName("sidebar_links")[0];
            obj.ShowHideChild(parent);
            obj.ToogleSidebar();
        },
        ShowHideChild: function (parent) {
            let childParents = parent.querySelectorAll(".has-child");
            let isClicked;
            childParents.forEach(function (parent, index) {
                parent.onclick = () => {
                    childParents.forEach(function (p, i) {
                        isClicked = index === i;
                        if (isClicked) {
                            p.classList["toggle"]('show-child');
                            parent.classList.contains("show-child") ? parent.getElementsByClassName("sub-menu")[0].classList.add('show') : parent.getElementsByClassName("sub-menu")[0].classList.remove('show');
                        } else {
                            p.classList["remove"]('show-child');
                        }
                    });
                };
            });
        },
        ToogleSidebar: function () {
            document.getElementById('toggleMenu').addEventListener("click", function () {
                var bdy = document.getElementById('body');
                bdy.classList["toggle"]('is-open');


                let ajaxConfig = {
                    url: '/Dashboard/SideMenu/ToogleSidebar',
                    data: JSON.stringify({
                        Value: $('body').hasClass('is-open') ? "true" : "false"
                    }),
                    success: function (result) {
                    },
                    error: function (jqXHR) {
                    },
                    complete: function (jqXHR, status) {
                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);
            });
        }
    };
    function DashboardMenu() { }
    DashboardMenu.prototype.initialize = function () {
        DM.init();
    };
    new DashboardMenu().initialize();
})();