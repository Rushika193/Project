var WebEditorHelper;
function ReloadPage() {
	return true;
	//window.onbeforeunload = function (e) {
	//    return easyMessageList.reloadpage;
	//};
}

(function () {

	EasyLibrary.ReadDOM = function (fileName, Cache) {
		var oRequest = new XMLHttpRequest();
		try {
			var URL = '';
			var postFix = '';
			if (typeof Cache !== 'undefined' || !Cache)
				postFix = '?t=' + Math.random() * 100;
			if (typeof ComponentHtmlPath !== 'undefined')
				URL = `${SageFrameHostURL}${ComponentHtmlPath}/${fileName}.html${postFix}`;
			else
				URL = `${SageFrameHostURL}${CallerModulePath}component/html/${fileName}.html${postFix}`;
			oRequest.open("GET", URL, false);
			//oRequest.setRequestHeader("User-Agent", navigator.userAgent);
			oRequest.send(null);
		}
		catch (message) { console.log(message); }
		if (oRequest.status === 200)
			return this.RemoveSpaceFromDOM(oRequest.responseText);
		else
			console.error("Error executing XMLHttpRequest call!");
	};
	EasyLibrary.GetPageArray = function () {
		var pageArray = new Array();
		CurrentPortalPages.forEach(function (v, i) {
			pageArray.push({ id: v.PageID, name: v.PageName });
		});
		return pageArray;
	};
	EasyLibrary.GetPageOption = function () {
		var pgOpt = '';
		CurrentPortalPages.forEach(function (v, i) {
			pgOpt += '<option value="' + v.PageID + '">' + v.PageName + '</option>';
		});
		return pgOpt;
	};
	$('body').addClass('wb-exists device');
	$('.btnDeviceViewOpen').off().on('click', function () {
		let $this = $(this);
		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$('.divShLayer').remove();
			$('#divAdminWebEditor').removeClass('devicePreview');
			$('#viewPorts').addClass('Dn');
			$('#viewPorts .desktop').trigger('click');
			$('body').removeClass('wb-preview');
		} else {
			$('body').addClass('wb-preview');
			$this.addClass('active');
			$('body').append('<div class="divShLayer"></div>');
			$('#viewPorts').removeClass('Dn');
			$('#divAdminWebEditor').addClass('devicePreview');
		}
		$('#viewPorts .tablet.changePort').trigger('click');
		$('#viewPorts .desktop.changePort').trigger('click');
	});
	$(document).on('click', '.divShLayer', function () {
		$('.btnDeviceViewOpen').trigger('click');
	});

	WebEditorHelper = {

		GetData: function () {
			var WebHtmlData = {
				EditorDOM: '',
				ViewDOM: '',
				PreviewDOM: '',
				ComponentsUsed: ''
			};
			var $editHtml = $('#divWebEditArea');
			var $cloneDOM = $('#WebBuilderWrapperClone');
			$cloneDOM.html($editHtml.html());


			$cloneDOM.find('.carries-options').remove();
			$cloneDOM.find('.carrier-open-option').remove();
			$cloneDOM.find('.ui-droppable').each(function () {
				$(this).removeClass('ui-droppable');
			});
			$cloneDOM.find('.ui-sortable').each(function () {
				$(this).removeClass('ui-sortable');
			});

			// For cbuilder setting options.
			$cloneDOM.find('.SetHdlr').remove();
			$cloneDOM.find('.proLoader').remove();
			$cloneDOM.find('.column-data-empty').remove();


			//remove contententeditable
			$cloneDOM.find('[contenteditable="true"]').removeAttr('contenteditable');
			$cloneDOM.find('.editor-component').removeClass('ui-sortable').removeClass('ui-droppable').attr('data-id','0');
			$cloneDOM.find('.editor-col').removeClass('ui-sortable');
			$cloneDOM.find('.editor-col').removeClass('ui-droppable');


			// //if (!EnableEditorRow) {
			//     $cloneDOM.find('.editor-component').removeAttr('data-type').removeClass('editor-component'); 
			//     $cloneDOM.find('.editor-col').removeClass('editor-col');
			//     $cloneDOM.find('.editor-col').removeAttr('data-type');
			//// }
			$cloneDOM.find('.actEle').removeClass('actEle');
			$cloneDOM.find('.grpStng').removeClass('grpStng');

			$cloneDOM.find('.divRichText').removeClass('divRichText').addClass('aDvdivRichText');
			$cloneDOM.find('.activeOption').removeClass('activeOption');
			$cloneDOM.find('.resizebar').remove();
			$cloneDOM.find('.noElement').remove();
			$cloneDOM.find('.pagelink.active-page').removeClass('active-page');

			//to be remove at last
			$('.editor-col').each(function () {
				var $this = $(this);
				$this.removeAttr('data-width');
				$('.editor-col').css({ 'width': '' });
			});

			$cloneDOM.find('.anchorpage').each(function () {
				var $this = $(this);
				var href = $this.attr('href');
				href = WebManagement.ReturnHref(href);
				$this.attr('href', href);
			});

			$editHtml.find('.copyData').removeClass('readyCopy');
			$editHtml.find('.pasteData').removeClass('activePaste');

			WebHtmlData.PreviewDOM = $('<div/>').text($('#WebBuilderWrapperClone').html()).html();

			let UsedComp = [];
			$editHtml.find('.editor-component,.editor-col,.cRow').each(function () {
				let compName = $(this).attr('data-type');
				if (UsedComp.indexOf(compName) < 0 && typeof (compName) !== "undefined" && compName !== '') {
					UsedComp.push(compName);
					if (typeof component[compName] !== 'undefined') {
						var v = component[compName];
						if (typeof v.remove !== "undefined")
							v.remove($cloneDOM);
						if (typeof v.inherits !== "undefined" && UsedComp.indexOf(v.inherits) < 0) {
							UsedComp.push(v.inherits);
						}
						if (typeof v.dependent !== "undefined") {
							v.dependent.split(',').forEach(function (comp, i) {
								if (comp !== "" && UsedComp.indexOf(comp) < 0)
									UsedComp.push(comp);
							});
						}
					}
				}
			});
			WebHtmlData.ComponentsUsed = UsedComp.join(',');

			WebHtmlData.EditorDOM = $('<div/>').text($editHtml.html()).html().replace(/\>\s+\</g, '><').trim();

			if ($cloneDOM.find('.webEditorCol').html() === '')
				WebHtmlData.ViewDOM = '';
			else if (EnableEditorRow) {
				WebHtmlData.ViewDOM = $('<div/>').text($('#WebBuilderWrapperClone').html()).html();
			}
			else
				WebHtmlData.ViewDOM = $('<div/>').text($('#WebBuilderWrapperClone  .webEditorCol')[0].outerHTML).html().replace(/\>\s+\</g, '><').trim();
			$('#WebBuilderDataFrameDom').html('');
			$('#WebBuilderWrapperClone').html('');
			WebHtmlData.ViewDOM = WebHtmlData.ViewDOM.replaceAll(SageFrameHostURL, '');
			WebHtmlData.EditorDOM = WebHtmlData.EditorDOM.replaceAll(SageFrameHostURL, '');

			return WebHtmlData;
		},
		SetEditDOM: function (EditDom) {
			//   EditDom = $.parseHTML(EditDom);
			EditDom = EditDom.replaceAll('{#HostURL#}', '');
			$('#divWebEditArea').html(EditDom);
			$('#divWebEditArea').html($('#divWebEditArea').html());
			$('.actEle').removeClass('actEle');
			$('#divWebEditArea .editor-component,.editor-col,.cRow').each(function () {
				let $thiscomp = $(this);
				SettingEvents($thiscomp);
				let compName = $thiscomp.attr('data-type');
				if (typeof component[compName] !== 'undefined') {
					if (typeof component[compName].pageload !== 'undefined' && typeof component[compName].pageload === 'function') {
						component[compName].pageload();
					} else if (typeof component[compName].afterdrop !== 'undefined' && typeof component[compName].afterdrop === 'function') {
						component[compName].afterdrop($thiscomp, $thiscomp, false);
					}

				}
			});
			DraggableSortable();
			$('.holder-bucket').remove();
			$('.sortComponent').removeClass('Dn');
			$('.SetHdlr.no-drag').each(function () {
				let $this = $(this);
				if ($this.find('.sortComponent').length > 0) {
					$this.removeClass('no-drag');
				}
			});
			// for responsive slider and complex component resize event.
			$('#viewPorts .tablet.changePort').trigger('click');
			$('#viewPorts .desktop.changePort').trigger('click');
		},
		ClearEditor: function () {
			let EmptyEditor;
			if (EnableEditorRow) {
				EmptyEditor = `<div class="editor-componentWrapper cRow-sort clearfix ui-sortable ui-droppable"><div class="noElement"><span class="startnew">Drag a row here</span></div></div>`
			} else {
				EmptyEditor = `<div class="editor-componentWrapper clearfix ui-sortable ui-droppable">
                    <div class="cRow TxAl-c" data-type="row">                    
                        <div class="cGrid ">
                            <div class="webEditorCol editor-col cCol ui-state-default sfFixed  ui-sortable ui-droppable mMt-0 mMb-0 mPt-0 mPr-0 mPb-0 mPl-0 mTxAl-n mTxAl-o mDib tDib tMt-0 tMb-0 tPt-0 tPr-0 tPb-0 tPl-0 tTxAl-n tTxAl-o Pt-0 Pr-0 Pb-0 Pl-0 TxAl-n TxAl-o sfCol_100 tsfCol_100 msfCol_100" data-type="column">
                                <div class="SetHdlr">
                                    <span class="stng">
                                        <i class="cb-stng"></i>
                                        <ul class="setDrp no_txt">
                                            <li class="com-settings" data-type="column"><span class="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li>
                                            <li class="s-style" data-type="column"><span class="text-wrp">Style</span><i class="cb-stl" title="Styles"></i></li>
                                        </ul>
                                    </span>
                                </div>
                                <div class="column-data-empty">
                                    <h4>This is Column</h4>
                                    <p>Drag and drop Components here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
			}
			$('#divWebEditArea').html(EmptyEditor);
			$('.Layout.components-list').removeClass('activeAccordion');
			$('#divWebEditArea .editor-component,.editor-col').each(function () {
				let $thiscomp = $(this);
				SettingEvents($thiscomp);
				let compName = $thiscomp.attr('data-type');
				if (typeof component[compName] !== 'undefined') {
					if (typeof component[compName].pageload !== 'undefined' && typeof component[compName].pageload === 'function') {
						component[compName].pageload();
					} else if (typeof component[compName].afterdrop !== 'undefined' && typeof component[compName].afterdrop === 'function') {
						component[compName].afterdrop($thiscomp, $thiscomp, false);
					}
				}
			});
			DraggableSortable();

		},
		HasData: function () {
			if ($('.webEditorCol .column-data-empty').length > 0 || $('.webEditorCol .editor-component').length <= 0) {
				return false;
			}
			else {
				return true;
			}
		}
	}

	$.fn.hideElement = function () {
		let $this = $(this);
		let DAlfa = DeviceAlpha();
		$this.removeClass(DAlfa + 'Db');
		$this.removeClass(DAlfa + 'Dib');
		$this.addClass(DAlfa + 'Dn');
	}
	$.fn.showElement = function (isBlock) {
		let $this = $(this);
		let DAlfa = DeviceAlpha();
		$this.removeClass(DAlfa + 'Dn');
		if (isBlock)
			DAlfa = DAlfa + 'Db'
		else
			DAlfa = DAlfa + 'Dib'
		$this.addClass(DAlfa);
	}
})();
function SaveEditorsComponents(moduleName) {
	if (IsEditorOnDevMode) {
		let compval = new Array();
		$.each(component, function (i, v) {
			if (typeof (v.IsBasic) === "undefined" || v.IsBasic===false)
				compval.push({ ComponentName: v.componentname, ComponentValue: JSONStringify(v) });
		});
		var servicePath = SageFrameHostURL + "dashboard/minieditor/";
		if (typeof ComponentServicePath !== 'undefined') {
			servicePath = ComponentServicePath;
		}
		var config = {
			async: true,
			url: servicePath,
			method: 'POST',
			data: {
				comp: compval,
				module: moduleName
			},
			ajaxSuccess: function (data) {
				console.log('Component updated successfully.')
			},
		};
		SecureAjaxCall.Call(config);
	}
};