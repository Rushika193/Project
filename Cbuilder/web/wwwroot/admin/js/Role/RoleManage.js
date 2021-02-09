$(function () {
    var RoleManager = {
        Init: function () {
            let $this = this;
            $this.AccordionInit();
            $this.Events();
        },       
        Events: function () {
            let $this = this;
            $("#actionList").find(".roleAction").on("change", function () {
                var actions = $(".roleAction").map(function () {
                    let $this = $(this);
                    if ($this.is(":checked")) {
                        return $this.val();
                    }
                }).get().join(',');
                $("#RoleViewModel_SelectedPageActions").val(actions);
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
                    }
                    else {
                        $this.removeClass("active-acc");
                        $thisContent.hide(50);
                        }
                }
            });
            this.UIEvents();
        },
        UIEvents: function () {
            let $PageWrap = $("div.accordion");
            $("div.accActionWrap").each(function () {
                let $this = $(this);
                let $thisActions = $this.find("input[name='SelectedPagesActions']");
                if ($thisActions.not(":checked").length === 0) {
                    $this.prev("div.accHeader").find("input[name='ActionGrp']").prop("checked", true);
                }
            });
            $PageWrap.each(function () {                
                let $this = $(this);
                let $thisActions = $this.find("input[name='SelectedPagesActions']");
                if ($thisActions.not(":checked").length === 0) {
                    $this.prev("div.accHeader").find("input[name='Pages']").prop("checked", true);
                }
            });
            $("input[name='Pages']").off("change").on("change", function () {
                let $this = $(this);
                let $thisActions = $this.parents('.accHeader').next('.accGrpWrap').find("input[name='ActionGrp']");
                if ($this.is(":checked"))
                    $thisActions.prop("checked", true);
                else
                    $thisActions.prop("checked", false);

                $thisActions.trigger("change");
            });
            $("input[name='ActionGrp']").off("change").on("change", function () {
                let $this = $(this);
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
                let $thisActions = $thisPageWrap.find("input[name='SelectedPagesActions']");
                if ($thisActions.not(":checked").length === 0)
                    $thisAccWrap.find("input[name='ActionGrp']").prop("checked", true);
                else
                    $thisAccWrap.find("input[name='ActionGrp']").prop("checked", false);

                let $accordWrap = $thisPageWrap.parent(".accGrpWrap");
                let $acccordAction = $accordWrap.find("input[name='SelectedPagesActions']");
                if ($acccordAction.not(":checked").length === 0)
                    $accordWrap.prev(".accHeader").find("input[name='Pages']").prop("checked", true);
                else
                    $accordWrap.prev(".accHeader").find("input[name='Pages']").prop("checked", false);
            });
        },

    }
    RoleManager.Init();
});