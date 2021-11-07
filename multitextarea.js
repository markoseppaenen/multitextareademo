function MultiTextarea() {

	var that = this;

	var earliercursorposition;
	var textareaindexinuse = 1;
	var contents;
	var newlinesbetweens;
	var earliercontentlength;
	var currentcursorposition;

	var cursormovestonexttextarea = false;
	var cursormovestoprevioustextarea = false;

	var maxcols;
	var maxrows;
	var mincols;
	var minrows;
	var availablecols;
	var availablerows;
	var textareacolumnsetamount;
	var textarearowsetamount;
	var widthpixelspercolumnset;
	var heightpixelsperrowset;

	var textareanameprefix;
	var hiddenclipboardtextarea;

	var resizeeventcanstart = false;
	var resizeeventstarted = false;
	var earlierresizetextareawidth;
	var earlierresizetextareaheight;

	var textarearesizeobserver;

	this.getTextareaColumnsetAmount = function() {
		return textareacolumnsetamount;
	};

	this.getTextareaRowsetAmount = function() {
		return textarearowsetamount;
	};

	this.setTextareaColumnsetAmount = function(amount) {
		textareacolumnsetamount = amount;
	};

	this.setTextareaRowsetAmount = function(amount) {
		textarearowsetamount = amount;
	};

	this.getWidthpixelsPerColumnset = function() {
		return widthpixelspercolumnset;
	}

	this.getHeightpixelsPerRowset = function() {
		return heightpixelsperrowset;
	}

	this.setWidthpixelsPerColumnset = function(pixels) {
		widthpixelspercolumnset;
	}

	this.setHeightpixelsPerRowset = function(pixels) {
		heightpixelsperrowset;
	}

	this.getEarlierResizeTextareaWidth = function() {
		return earlierresizetextareawidth;
	};

	this.setEarlierResizeTextareaWidth = function(width) {
		earlierresizetextareawidth = width;
	};

	this.getEarlierResizeTextareaHeight = function() {
		return earlierresizetextareaheight;
	};

	this.setEarlierResizeTextareaHeight = function(height) {
		earlierresizetextareaheight = height;
	};

	this.getAvailableRows = function() {
		return availablerows;
	};

	this.getAvailableCols = function() {
		return availablecols;
	};

	this.resetContents = function() {
		contents = new Array();
	};

	this.getContents = function() {
		return contents;
	};

	this.getNewlinesBetweens = function() {
		return newlinesbetweens;
	};

	this.resetNewlinesBetweens = function() {
		newlinesbetweens = new Set();
	};

	this.setCursorMovesToNextTextarea = function(doesit) {
		cursormovestonexttextarea = doesit;
	};

	this.getCursorMovesToNextTextarea = function() {
		return cursormovestonexttextarea;
	};

	this.setCursorMovesToPreviousTextarea = function(doesit) {
		cursormovestoprevioustextarea = doesit;
	};

	this.getCursorMovesToPreviousTextarea = function() {
		return cursormovestoprevioustextarea;
	};

	this.setEarlierCursorPosition = function(cursorposition) {
		earliercursorposition = cursorposition;
	};

	this.getEarlierCursorPosition = function() {
		return earliercursorposition;
	};

	this.setCurrentCursorPosition = function(cursorposition) {
		currentcursorposition = cursorposition;
	};

	this.getCurrentCursorPosition = function() {
		return currentcursorposition;
	};

	this.setTextareaIndexInUse = function(index) {
		textareaindexinuse = index;
	};

	this.getTextareaIndexInUse = function() {
		return textareaindexinuse;
	};

	this.increaseTextareaIndexInUse = function() {
		textareaindexinuse++;
	};

	this.decreaseTextareaIndexInUse = function() {
		textareaindexinuse--;
	};

	this.setEarlierContentLength = function(length) {
		earliercontentlength = length;
	};

	this.getEarlierContentLength = function() {
		return earliercontentlength;
	};

	this.setOptions = function(options) {

		maxcols = options.maxcols;
		mincols = options.mincols;
		maxrows = options.maxrows;
		minrows = options.minrows;
		availablecols = options.availablecols;
		availablerows = options.availablerows;
		earlierresizetextareawidth = options.initialtextareawidth;
		earlierresizetextareaheight = options.initialtextareaheight;
		textarearesizecolumnsetamount = options.textarearesizecolumnsetamount;
		textarearesizerowsetamount = options.textarearesizerowsetamount;
		widthpixelspercolumnset = options.widthpixelspercolumnset;
		heightpixelsperrowset = options.heightpixelsperrowset;
		textareanameprefix = options.textareanameprefix;
		hiddenclipboardtextarea = options.hiddenclipboardtextarea;

	};

	this.lessenCols = function() {
		if (availablecols >= mincols) {
			availablecols -= that.getTextareaColumnsetAmount();
			that.setEarlierResizeTextareaWidth($("textarea[name=" + textareanameprefix + "1]").width()
					- that.getWidthpixelsPerColumnset());
			$("textarea[name*=" + textareanameprefix + "]").width(that.getEarlierResizeTextareaWidth());
			that.letItHaveIt();
			// setUpKeyUpChecks();
			// $("textarea[name=" + textareanameprefix + "1]").trigger("keyup");
		}
	};

	this.morenCols = function() {
		if (availablecols <= maxcols) {
			availablecols += that.getTextareaColumnsetAmount();
			that.setEarlierResizeTextareaWidth($("textarea[name=" + textareanameprefix + "1]").width()
					+ that.getWidthpixelsPerColumnset());
			$("textarea[name*=" + textareanameprefix + "]").width(that.getEarlierResizeTextareaWidth());
			that.letItHaveIt();
			// setUpKeyUpChecks();
			// $("textarea[name=" + textareanameprefix + "1]").trigger("keyup");
		}
	};

	this.lessenRows = function() {
		if (availablerows >= minrows) {
			availablerows -= that.getTextareaRowsetAmount();
			that.setEarlierResizeTextareaHeight($("textarea[name=" + textareanameprefix + "1]").height()
					- that.getHeightpixelsPerRowset());
			$("textarea[name*=" + textareanameprefix + "]").height(that.getEarlierResizeTextareaHeight());
			that.letItHaveIt();
			// setUpKeyUpChecks();
			// $("textarea[name=" + textareanameprefix + "1]").trigger("keyup");
		}
	};

	this.morenRows = function() {
		if (availablerows <= maxrows) {
			availablerows += that.getTextareaRowsetAmount();
			that.setEarlierResizeTextareaHeight($("textarea[name=" + textareanameprefix + "1]").height()
					+ that.getHeightpixelsPerRowset());
			$("textarea[name*=" + textareanameprefix + "]").height(that.getEarlierResizeTextareaHeight());
			that.letItHaveIt();
			// setUpKeyUpChecks();
			// $("textarea[name=" + textareanameprefix + "1]").trigger("keyup");
		}
	};

	this.letItHaveIt = function() {
		if (textarearesizeobserver == null) {
			that.setUpTextareaObserver();
		}
		that.setUpKeyUpChecks();
		that.setUpResizingTextareas();
		$("textarea[name=" + textareanameprefix + "1]").trigger("keyup");
		$("textarea[name=" + textareanameprefix + "1]").attr("rows", availablerows).attr("cols", availablecols);
		$("textarea[name*=" + textareanameprefix + "]").blur();
	};

	this.doFirstResize = function() {
		resizeeventstarted = true;
		$("textarea[name=" + textareanameprefix + "1]").trigger("mouseup");
	};
	
	this.copyAllToClipboard = function() {

		var str = "";
		for (i = 0; i < that.getContents().length; i++) {
			str += that.getContents()[i];
			if (that.getNewlinesBetweens().has(i + 1)) {
				str += "\n";
			}
		}

		$("#" + hiddenclipboardtextarea).val(str);
		$("#" + hiddenclipboardtextarea).get(0).select();
		document.execCommand("copy");

	};

	this.resetTextareas = function() {
		$("textarea[name*=" + "writings_inputfield_writingtextarea" + "]").not(":first").remove()
		$("textarea[name='writings_inputfield_writingtextarea1']").val("");
		// $(".areawrapper").empty().html(
		// "<textarea name=\"writings_inputfield_writingtextarea1\"
		// contextmenu=\"copyall\"></textarea>");
	}
	
	// https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/caretPositionFromPoint
	// https://stackoverflow.com/questions/11191136/set-a-selection-range-from-a-to-b-in-absolute-position
	// https://stackoverflow.com/questions/2444430/how-to-get-a-word-under-cursor-using-javascript/3710561#3710561

	this.setUpTextareaObserver = function() {

		textarearesizeobserver = new ResizeObserver(function(entries) {
			entries.forEach(function(entry) {

				var cr = entry.contentRect;

				if (resizeeventcanstart && !resizeeventstarted && that.getEarlierResizeTextareaWidth() != null
						&& that.getEarlierResizeTextareaHeight() != null) {
					if (that.getEarlierResizeTextareaWidth() != cr.width
							|| that.getEarlierResizeTextareaHeight() != cr.height) {
						resizeeventstarted = true;
					}
				}

				that.setEarlierResizeTextareaWidth(cr.width);
				that.setEarlierResizeTextareaHeight(cr.height);

				// console.log(earliertextarea1width + "," +
				// earliertextarea1height);

			});
		});

		textarearesizeobserver.observe($("textarea[name=" + textareanameprefix + "1]").get(0));

	};

	this.setUpResizingTextareas = function() {

		$("textarea[name=" + textareanameprefix + "1]").off("mousedown");
		$("textarea[name=" + textareanameprefix + "1]").off("mousemove");
		$("textarea[name=" + textareanameprefix + "1]").off("mouseup");

		$("textarea[name=" + textareanameprefix + "1]").mousedown(function(e) {
			resizeeventcanstart = true;
		});

		$("textarea[name=" + textareanameprefix + "1]").mousemove(function(e) {

			if (resizeeventstarted) {
				var actuallywishedwidth = $(this).width() - ($(this).width() % that.getWidthpixelsPerColumnset());
				var actuallywishedheight = $(this).height() - ($(this).height() % that.getHeightpixelsPerRowset());
				$("textarea[name*=" + textareanameprefix + "]").width(actuallywishedwidth);
				$("textarea[name*=" + textareanameprefix + "]").height(actuallywishedheight);
			}

		});

		$("textarea[name=" + textareanameprefix + "1]").mouseup(
				function(e) {

					if (resizeeventstarted) {
						resizeeventstarted = false;
						var actuallywishedwidth = $(this).width()
								- ($(this).width() % that.getWidthpixelsPerColumnset());
						var actuallywishedheight = $(this).height()
								- ($(this).height() % that.getHeightpixelsPerRowset());
						availablecols = actuallywishedwidth / that.getWidthpixelsPerColumnset()
								* textarearesizecolumnsetamount;
						availablerows = actuallywishedheight / that.getHeightpixelsPerRowset()
								* textarearesizerowsetamount - 2;
						that.letItHaveIt();
						$("textarea[name*=" + textareanameprefix + "]").width(actuallywishedwidth);
						$("textarea[name*=" + textareanameprefix + "]").height(actuallywishedheight);
					}

					resizeeventcanstart = false;

				});

	};

	this.setUpKeyUpChecks = function() {

		$("textarea[name*=" + textareanameprefix + "]").off("click");
		$("textarea[name*=" + textareanameprefix + "]").off("keyup");
		$("textarea[name*=" + textareanameprefix + "]").click(function() {
			that.checkCursor(this);
		});
		$("textarea[name*=" + textareanameprefix + "]").keyup(
				function(e) {
					if (e.ctrlKey && e.key == "ArrowUp") {
						that.replaceWithEarlierLine(that.getNewlineIndexesAroundAlltextCursorPosition(that
								.getAlltextCursorPosition()));
					} else if (e.ctrlKey && e.key == "ArrowDown") {
						that.replaceWithLatterLine(that.getNewlineIndexesAroundAlltextCursorPosition(that
								.getAlltextCursorPosition()));
					} else if (!that.wasItArrowKey(e.key, this)) {
						// var currenttextarea = $("textarea[name=textarea" +
						// that.getTextareaIndexInUse() + "]");
						that.setEarlierCursorPosition($(this).get(0).selectionStart);
						if (e.key == null || (e.key != null && e.key.length == 1) || e.which == 8 || e.which == 46
								|| e.which == 13) {
							var pressedkeytype;
							if (e.key == "Backspace") {
								pressedkeytype = "backspacing";
							} else if (e.key == "Delete") {
								pressedkeytype = "deleting";
							} else if (e.key == "Enter") {
								pressedkeytype = "enterkey";
							} else {
								pressedkeytype = "adding";
							}
							that.setCurrentCursorPosition($(this).get(0).selectionStart);
							that.checkChrs(pressedkeytype);
						}
					}
				});

	};

	this.checkChrs = function(pressedkeytype) {

		var allchrs = that.gatherAllChars(pressedkeytype);

		that.resetContents();
		that.resetNewlinesBetweens();

		that.buildContents(pressedkeytype, allchrs);
		that.fillTextareas();

		that.adjustCursorPosition(pressedkeytype);

		that.setUpKeyUpChecks();

	};

	this.checkCursor = function(textarea) {
		that.setTextareaIndexInUse($(textarea).attr("name").substr(textareanameprefix.length, 1) * 1.0);
		that.setEarlierCursorPosition($(textarea).get(0).selectionStart);
		that.setCurrentCursorPosition($(textarea).get(0).selectionStart);
	};

	this.wasItArrowKey = function(key, textarea) {

		var cursorposition = $(textarea).get(0).selectionStart;
		var contentlength = $(textarea).val().length;

		if (key == "ArrowUp") {
			that.moveCursorToTextarea("above");
		} else if (key == "ArrowDown") {
			that.moveCursorToTextarea("below");
		} else if (key == "ArrowRight") {
			if (contentlength == cursorposition && that.getEarlierCursorPosition() != cursorposition - 1) {
				// cursor was at the very end of the textarea, when ArrowRight
				// was pressed
				that.moveCursorToTextarea("next");
			} else {
				that.setEarlierCursorPosition(cursorposition);
			}
		} else if (key == "ArrowLeft") {
			if (cursorposition == 0 && that.getEarlierCursorPosition() != 1) {
				// cursor was at the very beginning of the textarea, when
				// ArrowLeft was pressed
				that.moveCursorToTextarea("previous");
			} else {
				that.setEarlierCursorPosition(cursorposition);
			}
		}

	};

	this.moveCursorToTextarea = function(towhere) {

		var fromtextarea = $("textarea[name=" + textareanameprefix + that.getTextareaIndexInUse() + "]");

		if (towhere == "above") {
			//
		} else if (towhere == "below") {
			//
		} else if (towhere == "next") {
			var totextarea = $("textarea[name=" + textareanameprefix + (that.getTextareaIndexInUse() + 1) + "]");
			totextarea.get(0).selectionStart = 0;
			totextarea.get(0).selectionEnd = 0;
			that.increaseTextareaIndexInUse();
			totextarea.get(0).focus();
			that.setEarlierCursorPosition(0);
		} else if (towhere == "previous") {
			var totextarea = $("textarea[name=" + textareanameprefix + (that.getTextareaIndexInUse() - 1) + "]");
			totextarea.get(0).selectionStart = totextarea.val().length;
			totextarea.get(0).selectionEnd = totextarea.val().length;
			that.decreaseTextareaIndexInUse();
			totextarea.get(0).focus();
			that.setEarlierCursorPosition(totextarea.val().length);
		}

	};
	
	this.getAlltextCursorPosition = function() {

		var alltextcursorposition = 0;
		for (var i = 0; i < textareaindexinuse - 1; i++) {
			alltextcursorposition += contents[i].length;
		}
		alltextcursorposition += earliercursorposition;

		return alltextcursorposition;

	};

	this.getNewlineIndexesAroundAlltextCursorPosition = function(alltextcursorposition) {

		var newlineindexes = new Object();

		var allchars = that.gatherAllChars();
		var evenearliernewline = 0;
		var earliernewline = 0;
		var latternewline;
		var evenlatternewline;
		var alltextcursorpositionpassed = false;

		for (var i = 0; i < allchars.length; i++) {

			if (!alltextcursorpositionpassed && allchars[i] == "\n") {
				evenearliernewline = earliernewline;
				earliernewline = i;
			} else if (!alltextcursorpositionpassed && i + 1 >= alltextcursorposition) {
				alltextcursorpositionpassed = true;
			} else if (alltextcursorpositionpassed && latternewline == null && allchars[i] == "\n") {
				latternewline = i;
			} else if (alltextcursorpositionpassed && evenlatternewline == null && allchars[i] == "\n") {
				evenlatternewline = i;
			}

		}

		if (latternewline == null) {
			latternewline = allchars.length;
		}

		if (evenlatternewline == null) {
			evenlatternewline = allchars.length;
		}

		newlineindexes.evenearliernewline = evenearliernewline;
		newlineindexes.earliernewline = earliernewline;
		newlineindexes.latternewline = latternewline;
		newlineindexes.evenlatternewline = evenlatternewline;

		return newlineindexes;

	};

	this.replaceWithEarlierLine = function(newlineindexes) {

		if (newlineindexes.earliernewline != 0) {

			var allchrs = that.gatherAllChars();
			var changedcontent = "";

			var evenearliernewline = newlineindexes.evenearliernewline != 0 ? newlineindexes.evenearliernewline + 1 : 0;

			var currentline = allchrs.substr(newlineindexes.earliernewline + 1, newlineindexes.latternewline
					- newlineindexes.earliernewline - 1);
			var earlierline = allchrs.substr(evenearliernewline, newlineindexes.earliernewline
					- newlineindexes.evenearliernewline - 1);

			changedcontent += allchrs.substr(0, evenearliernewline);
			changedcontent += currentline + "\n";
			changedcontent += earlierline;
			changedcontent += allchrs.substr(newlineindexes.latternewline);

			that.resetContents();
			that.resetNewlinesBetweens();

			that.buildContents("nokey", changedcontent);
			that.fillTextareas();

			var movedlinetextareaindex = 0;
			var chrcount = 0;

			for (var i = 0; i < contents.length; i++) {
				movedlinetextareaindex++;
				chrcount += contents[i].length;
				if (chrcount > newlineindexes.evenearliernewline) {
					var textarea = $("textarea[name=" + textareanameprefix + movedlinetextareaindex + "]");
					textarea.get(0).focus();
					var cursorposition = evenearliernewline;
					for (var j = 0; j < i; j++) {
						cursorposition = cursorposition - contents[j].length;
					}
					earliercursorposition = cursorposition;
					currentcursorposition = cursorposition;
					textarea.get(0).selectionStart = cursorposition;
					textarea.get(0).selectionEnd = cursorposition;
					textareaindexinuse = movedlinetextareaindex;
					break;
				}
			}

		}

	};

	this.replaceWithLatterLine = function(newlineindexes) {

		var allchrs = that.gatherAllChars();
		var changedcontent = "";

		if (allchrs.length != newlineindexes.latternewline) {

			var earliernewline = newlineindexes.earliernewline != 0 ? newlineindexes.earliernewline + 1 : 0;

			var currentline = allchrs.substr(earliernewline, newlineindexes.latternewline
					- newlineindexes.earliernewline - 1);
			var latterline = allchrs.substr(newlineindexes.latternewline + 1, newlineindexes.evenlatternewline
					- newlineindexes.latternewline - 1);

			changedcontent += allchrs.substr(0, earliernewline);
			changedcontent += latterline + "\n";
			changedcontent += currentline;
			changedcontent += allchrs.substr(newlineindexes.evenlatternewline);

			that.resetContents();
			that.resetNewlinesBetweens();

			that.buildContents("nokey", changedcontent);
			that.fillTextareas();

			var movedlinetextareaindex = 0;
			var chrcount = 0;

			for (var i = 0; i < contents.length; i++) {
				movedlinetextareaindex++;
				chrcount += contents[i].length;
				if (chrcount > newlineindexes.latternewline) {
					var textarea = $("textarea[name=" + textareanameprefix + movedlinetextareaindex + "]");
					textarea.get(0).focus();
					var cursorposition = newlineindexes.evenlatternewline - currentline.length;
					if (newlineindexes.earliernewline == 0) {
						cursorposition--;
					}
					for (var j = 0; j < i; j++) {
						cursorposition = cursorposition - contents[j].length;
					}
					earliercursorposition = cursorposition;
					currentcursorposition = cursorposition;
					textarea.get(0).selectionStart = cursorposition;
					textarea.get(0).selectionEnd = cursorposition;
					textareaindexinuse = movedlinetextareaindex;
					break;
				}
			}

		}

	};

	this.gatherAllChars = function(pressedkeytype) {

		var allchrs = "";
		var editedtextarea = $("textarea[name=" + textareanameprefix + that.getTextareaIndexInUse() + "]");

		for (i = 1; i < $("textarea[name*=" + textareanameprefix + "]").length + 1; i++) {
			if (that.getTextareaIndexInUse() + 1 == i && pressedkeytype == "deleting"
					&& editedtextarea.get(0).selectionStart == editedtextarea.val().length
					&& editedtextarea.val().length == that.getContents()[i - 2].length) {
				if (newlinesbetweens.has(that.getTextareaIndexInUse() - 1)) {
					// newlinesbetweens.delete(textareainuse - 1);
					allchrs = allchrs.substr(0, allchrs.length - 1);
					allchrs += $("textarea[name=" + textareanameprefix + i + "]").val();
				} else {
					var partialcontent = $("textarea[name=" + textareanameprefix + i + "]").val();
					allchrs += partialcontent.substring(1, partialcontent.length);
				}
			} else {
				allchrs += $("textarea[name=" + textareanameprefix + i + "]").val();
				// if (textareainuse != i && pressedkeytype != "deleting" &&
				// editedtextarea.get(0).selectionStart !=
				// editedtextarea.val().length) {
				// }
				// editedtextarea.val().length == contents[i-1].length
			}
			if (newlinesbetweens != null && newlinesbetweens.has(i - 1)) {
				allchrs += "\n";
			}
			if (that.getTextareaIndexInUse() - 1 == i && pressedkeytype == "backspacing"
					&& editedtextarea.get(0).selectionStart == 0 && that.getEarlierCursorPosition() == 0) {
				that.setEarlierContentLength(that.getContents()[i - 1].length);
				var chrtodelete = allchrs.substr(allchrs.length - 1, 1);
				// if (chrtodelete == "
				// newlinesbetweens.delete(textareainuse - 1 - 1);
				// backspacedeletednewline = true;
				allchrs = allchrs.substr(0, allchrs.length - 1);
			}

		}

		return allchrs;

	};

	this.buildContents = function(pressedkeytype, allchrs) {

		var checkedcontent = "";
		var rowinuse = 1;
		var havetochangecontentholder = false;
		var backspacedeletednewline = false;
		var editedtextarea = $("textarea[name=" + textareanameprefix + that.getTextareaIndexInUse() + "]");
		// var invisiblecharacterappeared = false;
		var newlineappeared = false;
		var i;

		// &#8196;

		// determine if more or less textareas are needed
		for (i = 0; i < allchrs.length; i++) {
			var chrbunch = "";
			var j;
			for (j = 0; j < availablecols; j++) {
				var chr = allchrs.substr(i + j, 1);
				// if (allchrs.substr(i + j, 1) == "\u2004") {
				// chrbunch += chr;
				// invisiblecharacterappeared = true;
				// break;
				if (chr != "\n") {
					chrbunch += chr;
				} else if (chr == "\n") {
					if (rowinuse == availablerows) {
						havetochangecontentholder = true;
						if (pressedkeytype == "deleting"
								&& editedtextarea.val().length == that.getEarlierCursorPosition() == editedtextarea
										.get(0).selectionStart) {
							//
						} else {
							chrbunch += "\n";
						}
					} else {
						chrbunch += "\n";
					}
					newlineappeared = true;
					break;
				}
			}
			if (j == availablecols && allchrs.substr(i + j, 1) == "\n") {
				chrbunch += "\n";
				i++;
			}
			checkedcontent += chrbunch;
			if (newlineappeared) {
				i = i + j;
				newlineappeared = false;
				rowinuse++;
				// else if (invisiblecharacterappeared) {
				// i = i + j;
				// invisiblecharacterappeared = false;
			} else {
				i = i + j - 1;
				rowinuse++;
			}
			if (havetochangecontentholder || rowinuse > availablerows) {
				if (checkedcontent.substr(checkedcontent.length - 1, 1) == "\n") {
					newlinesbetweens.add(that.getContents().length);
					checkedcontent = checkedcontent.substr(0, checkedcontent.lastIndexOf("\n"));
				}
				if ((pressedkeytype == "adding" || pressedkeytype == "enterkey")
						&& editedtextarea.get(0).selectionStart > checkedcontent.length) {
					that.setCursorMovesToNextTextarea(true);
				} else if (pressedkeytype == "backspacing" && editedtextarea.get(0).selectionStart == 0
						&& that.getEarlierCursorPosition() == 0) {
					// backspacedeletednewline == false
					that.setCursorMovesToPreviousTextarea(true);
				}
				that.getContents().push(checkedcontent);
				checkedcontent = "";
				rowinuse = 1;
				havetochangecontentholder = false;
			}
		}

		if (checkedcontent.length > 0) {
			that.getContents().push(checkedcontent);
			if (pressedkeytype == "backspacing" && editedtextarea.get(0).selectionStart == 0
					&& that.getEarlierCursorPosition() == 0) {
				// backspacedeletednewline == false
				that.setCursorMovesToPreviousTextarea(true);
			}
		}

		if (pressedkeytype == "enterkey" && that.getNewlinesBetweens().has(that.getTextareaIndexInUse() - 1)
				&& that.getContents().length == that.getTextareaIndexInUse()) {
			that.getContents().push("");
		}

	};

	this.fillTextareas = function() {

		var loopcount = Math.max($("textarea[name*=" + textareanameprefix + "]").length, that.getContents().length);
		for (i = 1; i < loopcount + 1; i++) {
			var textarea = $("textarea[name=" + textareanameprefix + i + "]");
			if (textarea.length != 0 && that.getContents()[i - 1] != null) {
				textarea.val(that.getContents()[i - 1]);
				textarea.width(that.getEarlierResizeTextareaWidth());
				textarea.height(that.getEarlierResizeTextareaHeight());
				textarea.attr("rows", that.getAvailableRows());
				textarea.attr("columns", that.getAvailableCols());
			} else if (textarea.length != 0 && that.getContents()[i - 1] == null) {
				if (loopcount == 1 && that.getContents()[0] == null) {
					that.setTextareaIndexInUse(1);
					that.setCurrentCursorPosition(0);
				} else {
					textarea.remove();
				}
			} else if (textarea.length == 0 && that.getContents()[i - 1] != null) {
				$(".areawrapper").append(
						"<textarea name=\"" + textareanameprefix + i + "\" rows=\"" + that.getAvailableRows()
								+ "\" columns=\"" + that.getAvailableCols() + "\" contextmenu=\"copyall\"></textarea>");
				var textarea = $("textarea[name=" + textareanameprefix + i + "]");
				textarea.val(that.getContents()[i - 1]);
				textarea.width(that.getEarlierResizeTextareaWidth());
				textarea.height(that.getEarlierResizeTextareaHeight());
			}
		}

	};

	this.adjustCursorPosition = function(pressedkeytype) {

		if (that.getCursorMovesToNextTextarea()) {
			var textarea = $("textarea[name=" + textareanameprefix + (that.getTextareaIndexInUse() + 1) + "]");
			if (pressedkeytype == "enterkey") {
				textarea.get(0).selectionStart = 0;
				textarea.get(0).selectionEnd = 0;
				that.setEarlierCursorPosition(0);
			} else {
				textarea.get(0).selectionStart = 1;
				textarea.get(0).selectionEnd = 1;
				that.setEarlierCursorPosition(1);
			}
			that.increaseTextareaIndexInUse();
			textarea.get(0).focus();
			that.setCursorMovesToNextTextarea(false);
		} else if (that.getCursorMovesToPreviousTextarea()) {
			var textarea = $("textarea[name=" + textareanameprefix + (that.getTextareaIndexInUse() - 1) + "]");
			// textarea.get(0).selectionStart = textarea.val().length - 1;
			// textarea.get(0).selectionEnd = textarea.val().length - 1;
			textarea.get(0).selectionStart = that.getEarlierContentLength();
			textarea.get(0).selectionEnd = that.getEarlierContentLength();
			that.setEarlierCursorPosition(that.getEarlierContentLength());
			that.decreaseTextareaIndexInUse();
			textarea.get(0).focus();
			// earliercursorposition = textarea.val().length - 1;
			setCursorMovesToPreviousTextarea(false);
		} else {
			if (that.getTextareaIndexInUse() > $("textarea[name*=" + textareanameprefix + "]").length) {
				var textarea = $("textarea[name=" + textareanameprefix + (that.getTextareaIndexInUse() - 1) + "]");
				textarea.get(0).selectionStart = textarea.val().length;
				textarea.get(0).selectionEnd = textarea.val().length;
				that.setEarlierCursorPosition(textarea.val().length);
				that.decreaseTextareaIndexInUse();
				textarea.get(0).focus();
			} else {
				var textarea = $("textarea[name=" + textareanameprefix + that.getTextareaIndexInUse() + "]");
				textarea.get(0).selectionStart = that.getCurrentCursorPosition();
				textarea.get(0).selectionEnd = that.getCurrentCursorPosition();
				that.setEarlierCursorPosition(that.getCurrentCursorPosition());
			}
		}

	};

}
