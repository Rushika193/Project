$(function () {
    var ActionServiceManager = {
        Init: function () {
            let $this = this;     
            $this.AccordionInit();
            $this.Events();
        },      
        Events: function () {
            let $this = this;
            $("#actionList").find(".serviceAction").on("change", function () {
                var actions = $(".serviceAction").map(function () {
                    let $this = $(this);
                    if ($this.is(":checked")) {
                        return $this.val();
                    }
                }).get().join(',');
                $("#PageAction_SelectedService").val(actions);
            });
        },
        AccordionInit: function () {
            $(".accHeader").off("click").on("click", function (e) {
                let $this = $(this);
                let $thisContent = $this.next(".accContents");
                let $thisPageWrap = $this.closest(".accPagesWrap");
                let $thisGrpWrap = $this.closest(".accGrpWrap");
                let $thisIcon = $this.find(".openAcc>i");
                let isAccArea = false;
                if ($this.parent().hasClass("accArea"))
                    isAccArea = true;
                if (!$(e.target).hasClass("ds-grd-chk") && !$(e.target).hasClass("sfCheckboxlabel") && !$(e.target).hasClass("gdchkbx")) {
                    if ($thisContent.is(":hidden")) {
                        if (isAccArea) {
                            $(".accHeader").removeClass("active-acc");
                            $(".accContents").hide(50);
                            $this.addClass("active-acc");
                        }
                        else {
                            if ($this.parent().hasClass("accPagesWrap")) {
                                $thisPageWrap.find(".accContents").hide(50);
                            }
                        }
                        $thisContent.show(50);
                        //$(".openAcc>i").removeClass("fa fa-plus").addClass("fa fa-minus");
                        //$thisIcon.removeClass("fa fa-plus").addClass("fa fa-minus");
                    }
                    else {
                        $this.removeClass("active-acc");
                        $thisContent.hide(50);
                        //$(".openAcc>i").removeClass("fa fa-minus").addClass("fa fa-plus");
                        //$thisIcon.removeClass("fa fa-minus").addClass("fa fa-plus");
                    }
                }
            });
            this.UIEvents();
        },
        UIEvents: function () {
            let $PageWrap = $("div.accordion");
            $PageWrap.each(function () {
                let $this = $(this);
                let $thisActions = $this.find("input[name='SelectedPagesActions']");
                if ($thisActions.not(":checked").length === 0) {
                    $this.find("input[name='Pages']").prop("checked", true);
                    $this.find("input[name='ActionGrp']").prop("checked", true);
                }
            });
            $("input[name='Pages']").off("change").on("change", function () {
                let $this = $(this);
                // let $thisPage = $this.closest(".accordion");
                let $thisActions = $this.parents('.accHeader').next('.accGrpWrap').find("input[name='ActionGrp']");
                if ($this.is(":checked"))
                    $thisActions.prop("checked", true);
                else
                    $thisActions.prop("checked", false);

                $thisActions.trigger("change");
            });
            $("input[name='ActionGrp']").off("change").on("change", function () {
                let $this = $(this);
                // let $thisPage = $this.closest(".accordion");
                let $thisActions = $this.parents('.accHeader').next('.accActionWrap').find("input[name='SelectedPagesActions']");
                if ($this.is(":checked"))
                    $thisActions.prop("checked", true);
                else
                    $thisActions.prop("checked", false);
                $thisActions.trigger("change");

            });
            $("input[name='SelectedPagesActions']").off("change").on("change", function () {
                let $this = $(this);
                let $thisPageWrap = $this.parents(".accActionWrap");
                let $thisAccWrap = $thisPageWrap.prev(".accHeader");
                let $thisActions = $thisAccWrap.find("input[name='SelectedPagesActions']");
                if ($thisActions.not(":checked").length === 0)
                    $thisAccWrap.prop("checked", true);
                else
                    $thisAccWrap.prop("checked", false);
            });
        },     
       
    }
    ActionServiceManager.Init();
});