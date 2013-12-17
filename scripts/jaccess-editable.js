(function ($, undefined) {
    $.fn.getCursorPosition = function () {
        var el = $(this).get(0);
        var pos = 0;
        if ("selectionStart" in el) pos = el.selectionStart;
        else if ("selection" in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart("character", -el.value.length);
            pos = Sel.text.length - SelLength
        }
        return pos
    }
})(jQuery);
var cellpos = -1;
var rowpos = -1;
var origcon = "\u00a9";
var clhan = function (e1) {
    var registeredtable = "." + jQuery(e1.target).closest("table").attr("class");
    var tmp = jQuery(e1.target).index() + parseInt(jQuery(e1.target).parent().attr("inc"));
    if (tmp != cellpos && !isNaN(tmp) || cellpos < 0) {
        var isnew = "";
        var isnew1 = "";
        var OriginalContent = jQuery(e1.target).text();
        isnew = jQuery(e1.target).parent().prop("id");
        isnew1 = jQuery(registeredtable + " .cellEditing").parent().prop("id");
        var className = jQuery(e1.target).parent().attr("class").split(" ");
        var className_ = "";
        for (var i = 0; i <
            className.length; i += 1)
            if (className[i].indexOf("runme-") >= 0) className_ = className[i].substring(6);
        var dropcontent = jQuery(registeredtable + " .drop-ind option:selected").text();
        var dropid = jQuery(registeredtable + " .drop-ind").val();
        jQuery(registeredtable + " .drop-ind").parent().attr("id", dropid);
        jQuery(registeredtable + " .drop-ind").parent().on("click", clhan);
        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
        jQuery(registeredtable + " .del-icon").removeClass("del-icon");
        jQuery(registeredtable +
            " .cell-click").unbind("click");
        var newContent = jQuery(registeredtable + " .cellEditing").children().val();
        if (!jQuery(registeredtable + " .cellEditing").hasClass("drop"))
            if (origcon != newContent && origcon != "\u00a9") jQuery(registeredtable + " .cellEditing").parent().addClass("edited");
        var trid = jQuery(registeredtable + " .cellEditing").parent().index();
        if (jQuery(registeredtable + " .cellEditing").parent().hasClass("edited") && parseInt(jQuery(e1.target).parent().attr("inc")) != rowpos) {
            var obce = "." + jQuery(registeredtable +
                " .cellEditing").closest("table").attr("class") + " tr:eq(" + trid + ")";
            jQuery(registeredtable + " .cellEditing").html(newContent);
            var status = window[className_](obce, isnew1, true);
            if (status) {
                validationprocess(obce);
                return
            } else validationprocesstrue(obce)
        }
        cellpos = jQuery(e1.target).index() + parseInt(jQuery(e1.target).parent().attr("inc"));
        rowpos = parseInt(jQuery(e1.target).parent().attr("inc"));
        origcon = OriginalContent;
        jQuery(registeredtable + " .cellEditing").html(newContent);
        jQuery(registeredtable + " .cellEditing").removeClass("cellEditing");
        jQuery(e1.target).addClass("cellEditing");
        if (jQuery(e1.target).hasClass("drop")) {
            var OtionValue = jQuery(e1.target).attr("id");
            var className = jQuery(e1.target).attr("class").split(" ");
            for (var i = 0; i < className.length; i += 1)
                if (className[i].indexOf("drop-") >= 0) {
                    window[className[i].substring(5)](e1.target, OtionValue);
                    jQuery(registeredtable + " .drop-ind").on("change", function () {
                        jQuery(this).parent().parent().addClass("edited")
                    });
                    jQuery(e1.target).parent().not(":last-child").find("td:eq(0)").addClass("del-icon");
                    bindevents(registeredtable)
                }
            jQuery(registeredtable + " .drop-ind").keydown(function (e) {
                var dropcontent = jQuery(registeredtable + " .drop-ind option:selected").text();
                var dropid = jQuery(registeredtable + " .drop-ind").val();
                jQuery(registeredtable + " .drop-ind").parent().attr("id", dropid);
                jQuery(registeredtable + " .drop-ind").parent().on("click", clhan);
                if (OtionValue != dropid) jQuery(e1.target).parent().addClass("edited");
                if (e.keyCode === 37) {
                    var this_ = jQuery(registeredtable + " .drop-ind").parent().prev();
                    jQuery(registeredtable +
                        " .drop-ind").parent().html(dropcontent);
                    this_.trigger("click")
                } else if (e.keyCode === 39 || e.keyCode === 9) {
                    var this_ = jQuery(registeredtable + " .drop-ind").parent().next();
                    jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
                    this_.trigger("click");
                    e.preventDefault()
                } else if (e.keyCode === 38) jQuery(e1.target).parent().addClass("edited");
                else if (e.keyCode === 40) jQuery(e1.target).parent().addClass("edited");
                else if (e.keyCode === 13) {
                    var trid = jQuery(registeredtable + " .cellEditing").parent().index();
                    var tdid =
                        jQuery(registeredtable + " .cellEditing").index();
                    var obce = "." + jQuery(registeredtable + " .cellEditing").closest("table").attr("class") + " tr:eq(" + trid + ")";
                    if (jQuery(e1.target).parent().hasClass("edited")) {
                        var this_ = jQuery(registeredtable + " .drop-ind").parent().parent().next().find("td:eq(" + tdid + ")");
                        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
                        var status = window[className_](obce, isnew, true);
                        if (status) {
                            validationprocess(obce);
                            return
                        } else validationprocesstrue(obce);
                        this_.trigger("click")
                    } else {
                        var this_ =
                            jQuery(registeredtable + " .drop-ind").parent().parent().next().find("td:eq(" + tdid + ")");
                        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
                        this_.trigger("click")
                    }
                }
            })
        } else {
            jQuery(e1.target).html("<input type='text' class='date-ind' value='" + OriginalContent + "' />");
            if (jQuery(e1.target).hasClass("date")) jQuery(function () {
                jQuery(registeredtable + " .date-ind").datepicker({
                    showOn: "focus",
                    buttonText: "clickme"
                }).change(function () {
                    var newContent = jQuery(this).val();
                    jQuery(registeredtable + " .date-ind").parent().parent().addClass("edited");
                    jQuery(registeredtable + " .date-ind").focus()
                })
            });
            jQuery(e1.target).children().focus();
            jQuery(e1.target).parent().not(":last-child").find("td:eq(0)").addClass("del-icon");
            bindevents(registeredtable);
            jQuery(e1.target).children().keydown(function (e) {
                var newContent = jQuery(this).val();
                var trid = jQuery(e1.target).parent().index();
                var obce = "." + jQuery(e1.target).closest("table").attr("class") + " tr:eq(" + trid + ")";
                if (!(OriginalContent == newContent)) jQuery(e1.target).parent().addClass("edited");
                if (e.keyCode ===
                    13 || e.keyCode === 40) {
                    if (jQuery(e1.target).parent().hasClass("edited")) {
                        jQuery(e1.target).html(newContent);
                        var status = window[className_](obce, isnew, true);
                        if (status) {
                            validationprocess(obce);
                            return
                        } else {
                            validationprocesstrue(obce);
                            jQuery(e1.target).parent().next().find("td").eq(jQuery(e1.target).index()).trigger("click")
                        }
                    } else jQuery(e1.target).parent().next().find("td").eq(jQuery(e1.target).index()).trigger("click");
                    e.preventDefault()
                } else if (e.keyCode === 38)
                    if (jQuery(e1.target).parent().hasClass("edited")) {
                        jQuery(e1.target).html(newContent);
                        var status = window[className_](obce, isnew, true);
                        if (status) {
                            validationprocess(obce);
                            return
                        } else validationprocesstrue(obce)
                    } else jQuery(e1.target).parent().prev().find("td").eq(jQuery(e1.target).index()).trigger("click");
                else if (e.keyCode === 37) {
                    var len = jQuery(registeredtable + " .date-ind").val().length;
                    if (jQuery(registeredtable + " .date-ind").getCursorPosition() == 0) {
                        if (!jQuery(registeredtable + " .date-ind").parent().prev().hasClass("cell-click")) jQuery(registeredtable + " .date-ind").parent().prev().trigger("click");
                        jQuery(".ui-datepicker").remove()
                    }
                } else if (e.keyCode === 39) {
                    var len = jQuery(registeredtable + " .date-ind").val().length;
                    if (jQuery(registeredtable + " .date-ind").getCursorPosition() == len) {
                        jQuery(registeredtable + " .date-ind").parent().next().trigger("click");
                        jQuery(".ui-datepicker").remove()
                    }
                } else if (e.keyCode === 9) {
                    jQuery(registeredtable + " .date-ind").parent().next().trigger("click");
                    jQuery(".ui-datepicker").remove();
                    e.preventDefault()
                }
            })
        }
    }
};
var validationprocess = function (o) {
    var registeredtable = "." + jQuery(o).closest("table").attr("class");
    jQuery(registeredtable + " .del-icon").removeClass("del-icon");
    jQuery(registeredtable + " .cell-click").unbind("click");
    jQuery(o).not(":last-child").find("td:eq(0)").addClass("del-icon");
    bindevents(registeredtable);
    jQuery(o).find("td:gt(0)").addClass("val-wrong");
    jQuery(o).find("td:eq(1)").trigger("click")
};
var validationprocesstrue = function (o) {
    var registeredtable = "." + jQuery(o).closest("table").attr("class");
    jQuery(registeredtable + " .val-wrong").removeClass("val-wrong");
    jQuery(o).removeClass("edited")
};
var bindevents = function (v) {
    jQuery(v + " .cell-click").on("click", function () {
        if (jQuery(this).hasClass("del-icon")) {
            var className = jQuery(this).parent().attr("class").split(" ");
            var className_ = "";
            for (var i = 0; i < className.length; i += 1)
                if (className[i].indexOf("runme-") >= 0) className_ = className[i].substring(6);
            if (confirm("Are you sure?")) var status = window[className_](jQuery(this).parent(), "vot", false);
            else;
        } else jQuery(v + " .del-icon").removeClass("del-icon");
        var newContent = jQuery(v + " .cellEditing").children().val();
        if (origcon != newContent && (origcon != "\u00a9" && !jQuery(this).parent().hasClass("edited"))) jQuery(".cellEditing").parent().addClass("edited");
        if (jQuery(v + " .cellEditing").parent().hasClass("edited")) return;
        else {
            jQuery(v + " .cellEditing").html(newContent);
            jQuery(v + " .cellEditing").removeClass("cellEditing");
            jQuery(this).addClass("del-icon")
        }
        jQuery(this).focus()
    })
};
var messagebox = function (p, v) {
    jQuery(p).find("td:eq(0) span").html(v);
    jQuery(p).find("td:eq(0) span").addClass("active");
    jQuery(p).find("td:eq(0) span").fadeOut(1E3, function () {
        jQuery(p).find("td:eq(0) span").removeClass("active");
        jQuery(p).find("td:eq(0) span").remove();
        jQuery(p).find("td:eq(0)").append("<span></span>")
    })
};
var thisisfortestingpurposesyeah = "<input type='button' value='Toogle Validation' onclick='boolvaltest()'/><div class='valresult'>Validation Wrong</div>";
var TESTVAL_DEV = true;
var boolvaltest = function () {
    if (TESTVAL_DEV) {
        TESTVAL_DEV = false;
        jQuery(".valresult").html("Validation Valid")
    } else {
        TESTVAL_DEV = true;
        jQuery(".valresult").html("Validation Wrong")
    }
    console.clear()
};