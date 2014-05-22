(function ($, undefined) {

    $.fn.getCursorPosition = function () {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    };

    $.fn.jaccess = function (options) {
        if(options){
            return this.text(options.data);
        }
    };

    $.fn.jaccess.load = function (options) {
        var cellpos = -1,
            rowpos = -1,
            origcon = "©";// content of previous cell
        var handler = function (e) {

        };
        console.log(options);// content of previous cell
        //return this.text(options.data);
    };

}(jQuery));





var data =
	    {
	        "LoadStatus": {
	            "ColCount": 5, "RowCount": 6,
	            "Shortname": ["APP-04", "APP-05", "APP-06", "ACC-06", "REG-06", "6C"], "Person": [14794, 14794, 14794, 14794, 14794, 14794], "Date": ["08/15/2011", "01/29/2012", "01/29/2013", "03/26/2013", "04/10/2013", "08/21/2013"], "Status": [504, 505, 506, 606, 626, 63], "Note": ["",
        "", "",
        "", "",
        ""]
	        },
	        "LoadDrop":
                {
                    "ColCount": 2, "RowCount": 153, "Shortname":
                      ["PR K-12", "PR 6-12", "PR K-8", "PR 9-12", "PR 6-8", "PR K-5", "AP AS", "AP Disc", "AP OP/FN", "HS Couns", "Library", "Nurse", "Secrt", "Reg", "SPED C", "ESL/GT C", "Grade-5", "Grade-4", "Grade-3", "Grade-2", "Grade-1", "Kinder", "Math", "Eng", "Sci", "SS", "Comp", "LOTE", "Music", "Art", "PE", "SPED", "ESL", "Read Spe", "Aide", "SUB", "District", "Staff", "GR-KG", "GR-01", "GR-02", "GR-03", "GR-04", "4A", "4B", "4C", "4D", "GR-05", "5A", "5B", "5C", "5D", "GR-06", "6A", "6B", "6C", "6D", "6E", "6F", "GR-07", "7A", "7B", "7C", "7D", "GR-08", "8A", "8B", "8C", "8D", "WD-KG", "WD-01", "WD-02", "WD-03", "WD-04", "WD-05", "WD-06", "WD-07", "WD-08", "WD-09", "W2008-09", "W2009-10", "W2010-11", "W2011-12", "W2012-13", "G2007", "G2008", "G2009", "G2010", "G2011", "G2012", "G2013", "G2014", "C2013", "TEMP", "NEW", "APP-KG", "APP-01", "APP-02", "APP-03", "APP-04", "APP-05", "APP-06", "APP-07", "APP-08", "ACC-KG", "ACC-01", "ACC-02", "ACC-03", "ACC-04", "ACC-05", "ACC-06", "ACC-07", "ACC-08", "REG-KG", "REG-01", "REG-02", "REG-03", "REG-04", "REG-05", "REG-06", "REG-07", "REG-08", "TRS-KG", "TRS-01", "TRS-02", "TRS-03", "TRS-04", "TRS-05", "TRS-06", "TRS-07", "TRS-08", "WL-KG", "WL-01", "WL-02", "WL-03", "WL-04", "WL-05", "WL-06", "WL-07", "WL-08", "R-Admin", "Old-2009", "Old-2010", "OLD-2011", "Old-2012", "Old-2013", "NA-07", "NA-08", "J-APP", "Hired", "Other", "Spous", "TRASH"], "ID": [-55, -54, -53, -52, -51, -50, -46, -45, -44, -43, -39, -38, -37, -36, -35, -34, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -7, -6, -5, -1, 0, 1, 10, 20, 30, 40, 41, 42, 43, 44, 50, 51, 52, 53, 54, 60, 61, 62, 63, 64, 65, 66, 70, 71, 72, 73, 74, 80, 81, 82, 83, 84, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 328, 329, 330, 331, 332, 347, 348, 349, 350, 351, 352, 353, 354, 373, 399, 401, 500, 501, 502, 503, 504, 505, 506, 507, 508, 600, 601, 602, 603, 604, 605, 606, 607, 608, 620, 621, 622, 623, 624, 625, 626, 627, 628, 700, 701, 702, 703, 704, 705, 706, 707, 708, 750, 751, 752, 753, 754, 755, 756, 757, 758, 800, 809, 810, 811, 812, 813, 827, 828, 900, 921, 950, 951, 1000]
                }
	    };


//var cellpos = -1;
//var rowpos = -1;
//var origcon = "©"; // content of previous cell
//var clhan = function (e1) {
//    var registeredtable = "." + jQuery(e1.target).closest("table").attr('class');
//    var tmp = jQuery(e1.target).index() + parseInt(jQuery(e1.target).parent().attr("inc"));  //fresh value
//    if ((tmp != cellpos && !isNaN(tmp)) || cellpos < 0) {  //prevent second click into the cell,compare non-fresh with fresh value
//        var isnew = "";
//        var isnew1 = "";
//        var OriginalContent = jQuery(e1.target).text();  // get td text value
//        isnew = jQuery(e1.target).parent().prop("id");
//        isnew1 = jQuery(registeredtable + " .cellEditing").parent().prop("id");


//        var className = jQuery(e1.target).parent().attr("class").split(' '); //get the function to run for update delete
//        var className_ = "";
//        for (var i = 0; i < className.length; i += 1) {
//            if (className[i].indexOf('runme-') >= 0) {
//                className_ = className[i].substring(6);

//            }
//        }

//        /////////////////new addition
//        //////////Clean Previous drop//////////// 
//        var dropcontent = jQuery(registeredtable + " .drop-ind option:selected").text(); // drop text value
//        var dropid = jQuery(registeredtable + " .drop-ind").val();  // drop id value
//        jQuery(registeredtable + " .drop-ind").parent().attr("id", dropid); //assign from select box to td

//        jQuery(registeredtable + " .drop-ind").parent().on('click', clhan); //bind click to td
//        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent); // assign value to td
//        ///////////////////////////////////////////

//        ///////////for previos//////
//        jQuery(registeredtable + ' .del-icon').removeClass("del-icon");
//        jQuery(registeredtable + ' .cell-click').unbind("click");
//        //console.log("copyright------------------" + origcon);
//        var newContent = jQuery(registeredtable + " .cellEditing").children().val();
//        if (!jQuery(registeredtable + " .cellEditing").hasClass("drop")) {
//            if (origcon != newContent && origcon != "©") { jQuery(registeredtable + " .cellEditing").parent().addClass("edited"); } //for mouse if sell previous cell is edited
//        }

//        var trid = jQuery(registeredtable + " .cellEditing").parent().index();

//        if (jQuery(registeredtable + " .cellEditing").parent().hasClass("edited") && parseInt(jQuery(e1.target).parent().attr("inc")) != rowpos) {

//            var obce = "." + jQuery(registeredtable + ' .cellEditing').closest("table").attr('class') + " tr:eq(" + trid + ")";
//            jQuery(registeredtable + " .cellEditing").html(newContent);
//            var status = window[className_](obce, isnew1, true); //used this instead of eval
//            if (status) { validationprocess(obce); return; }
//            else {
//                validationprocesstrue(obce);
//            }
//        }

//        cellpos = jQuery(e1.target).index() + parseInt(jQuery(e1.target).parent().attr("inc")); // non-fresh value of cell
//        rowpos = parseInt(jQuery(e1.target).parent().attr("inc")); // non-fresh value of cell row
//        origcon = OriginalContent;
//        jQuery(registeredtable + ' .cellEditing').html(newContent); // assign input value to td
//        jQuery(registeredtable + ' .cellEditing').removeClass("cellEditing"); //remove td editing css
//        ///////////////////////////

//        jQuery(e1.target).addClass("cellEditing");//new cell highlight

//        //////////////////////////////////////////////
//        //////////////////////drop/////////////////////////
//        ///////////////////////////////////////////////////
//        if (jQuery(e1.target).hasClass('drop'))  //this is for dropdown
//        {
//            var OtionValue = jQuery(e1.target).attr("id");

//            var className = jQuery(e1.target).attr("class").split(' ');
//            for (var i = 0; i < className.length; i += 1) {
//                if (className[i].indexOf('drop-') >= 0) {
//                    window[className[i].substring(5)](e1.target, OtionValue); //used this instead of eval
//                    jQuery(registeredtable + " .drop-ind").on("change", function () {
//                        jQuery(this).parent().parent().addClass("edited");
//                    });
//                    jQuery(e1.target).parent().not(":last-child").find('td:eq(0)').addClass("del-icon");
//                    bindevents(registeredtable);///////////////////maybe
//                }
//            }
//            jQuery(registeredtable + " .drop-ind").keydown(function (e) {
//                var dropcontent = jQuery(registeredtable + " .drop-ind option:selected").text();
//                var dropid = jQuery(registeredtable + " .drop-ind").val();
//                jQuery(registeredtable + " .drop-ind").parent().attr("id", dropid);
//                jQuery(registeredtable + " .drop-ind").parent().on('click', clhan);

//                if (OtionValue != dropid) {
//                    jQuery(e1.target).parent().addClass("edited");
//                } // add edited class to tr}

//                if (e.keyCode === 37) {//left
//                    var this_ = jQuery(registeredtable + " .drop-ind").parent().prev(); //trigger("click");
//                    jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
//                    this_.trigger("click");
//                }
//                else if (e.keyCode === 39 || e.keyCode === 9) { //right tab
//                    var this_ = jQuery(registeredtable + " .drop-ind").parent().next(); //trigger("click");
//                    jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
//                    this_.trigger("click");
//                    e.preventDefault();
//                }
//                else if (e.keyCode === 38) { jQuery(e1.target).parent().addClass("edited"); }//up no need
//                else if (e.keyCode === 40) { jQuery(e1.target).parent().addClass("edited"); }//down no need

//                else if (e.keyCode === 13) {//enter
//                    var trid = jQuery(registeredtable + " .cellEditing").parent().index();
//                    var tdid = jQuery(registeredtable + " .cellEditing").index();
//                    var obce = "." + jQuery(registeredtable + ' .cellEditing').closest("table").attr('class') + " tr:eq(" + trid + ")";
//                    if (jQuery(e1.target).parent().hasClass("edited")) {
//                        var this_ = jQuery(registeredtable + " .drop-ind").parent().parent().next().find('td:eq(' + tdid + ')');
//                        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
//                        var status = window[className_](obce, isnew, true); //used this instead of eval
//                        if (status) { validationprocess(obce); return; }
//                        else {
//                            validationprocesstrue(obce);

//                        }
//                        this_.trigger("click");
//                    }
//                    else {
//                        var this_ = jQuery(registeredtable + " .drop-ind").parent().parent().next().find('td:eq(' + tdid + ')');
//                        jQuery(registeredtable + " .drop-ind").parent().html(dropcontent);
//                        this_.trigger("click");
//                    }

//                }

//            });

//        }
//        else {

//            jQuery(e1.target).html("<input type='text' class='date-ind' value='" + OriginalContent + "' />"); // convert cell to input box
//            /////////////////new addition
//            //////////////////date editing///////////////////////////////////////////
//            if (jQuery(e1.target).hasClass('date'))  //this is for date
//            {
//                jQuery(function () {
//                    jQuery(registeredtable + ' .date-ind').datepicker({
//                        showOn: 'focus',
//                        buttonText: 'clickme'
//                    }).change(function () {
//                        var newContent = jQuery(this).val();
//                        jQuery(registeredtable + ' .date-ind').parent().parent().addClass("edited");
//                        jQuery(registeredtable + ' .date-ind').focus();
//                    })

//                });
//            }
//            /////////////////////////////////////////////////////////////////////



//            jQuery(e1.target).children().focus(); //focus on inputbox
//            jQuery(e1.target).parent().not(':last-child').find('td:eq(0)').addClass("del-icon");
//            bindevents(registeredtable); // --required




//            // get input value of new
//            jQuery(e1.target).children().keydown(function (e) {
//                var newContent = jQuery(this).val();
//                var trid = jQuery(e1.target).parent().index();
//                var obce = "." + jQuery(e1.target).closest("table").attr('class') + " tr:eq(" + trid + ")";
//                //indicarot of new row
//                if (!(OriginalContent == newContent)) {
//                    jQuery(e1.target).parent().addClass("edited"); // add edited class to tr
//                }
//                if (e.keyCode === 13 || e.keyCode === 40) {   //enter & down 
//                    if (jQuery(e1.target).parent().hasClass("edited")) {
//                        jQuery(e1.target).html(newContent); //update
//                        var status = window[className_](obce, isnew, true); //used this instead of eval
//                        if (status) { validationprocess(obce); return; }
//                        else {
//                            validationprocesstrue(obce);
//                            jQuery(e1.target).parent().next().find('td').eq(jQuery(e1.target).index()).trigger("click");
//                        }
//                    }
//                    else {
//                        jQuery(e1.target).parent().next().find('td').eq(jQuery(e1.target).index()).trigger("click");
//                    }
//                    e.preventDefault();
//                }

//                else if (e.keyCode === 38) {  //up arrow
//                    if (jQuery(e1.target).parent().hasClass("edited")) {
//                        jQuery(e1.target).html(newContent); //update
//                        var status = window[className_](obce, isnew, true); //used this instead of eval
//                        if (status) { validationprocess(obce); return; }
//                        else {
//                            validationprocesstrue(obce);
//                            jQuery(e1.target).parent().prev().find('td').eq(jQuery(e1.target).index()).trigger("click");
//                        }
//                    }
//                    else {
//                        jQuery(e1.target).parent().prev().find('td').eq(jQuery(e1.target).index()).trigger("click");
//                    }

//                }
//                else if (e.keyCode === 37) {  //left
//                    var len = jQuery(registeredtable + " .date-ind").val().length;
//                    if (jQuery(registeredtable + " .date-ind").getCursorPosition() == 0) {
//                        if (!jQuery(registeredtable + " .date-ind").parent().prev().hasClass("cell-click"))
//                            jQuery(registeredtable + " .date-ind").parent().prev().trigger("click");
//                        jQuery('.ui-datepicker').remove();
//                    }
//                }
//                else if (e.keyCode === 39) {  //right
//                    var len = jQuery(registeredtable + " .date-ind").val().length;
//                    if (jQuery(registeredtable + " .date-ind").getCursorPosition() == len) {
//                        jQuery(registeredtable + " .date-ind").parent().next().trigger("click");
//                        jQuery('.ui-datepicker').remove();
//                    }
//                }

//                else if (e.keyCode === 9) {  //tab
//                    jQuery(registeredtable + " .date-ind").parent().next().trigger("click");
//                    jQuery('.ui-datepicker').remove();
//                    e.preventDefault();
//                }


//            });


//        } //drop
//    }//prevent second click into the cell,compare non-fresh with fresh value
//}


//var validationprocess = function (o) {
//    var registeredtable = "." + jQuery(o).closest("table").attr('class');
//    jQuery(registeredtable + ' .del-icon').removeClass("del-icon");
//    jQuery(registeredtable + ' .cell-click').unbind("click");
//    jQuery(o).not(":last-child").find('td:eq(0)').addClass('del-icon');
//    bindevents(registeredtable); //


//    jQuery(o).find('td:gt(0)').addClass("val-wrong"); //to highloght with red borders
//    jQuery(o).find('td:eq(1)').trigger("click");
//}

//var validationprocesstrue = function (o) {
//    var registeredtable = "." + jQuery(o).closest("table").attr('class');
//    jQuery(registeredtable + " .val-wrong").removeClass("val-wrong");
//    jQuery(o).removeClass("edited");
//}


//var bindevents = function (v) {
//    jQuery(v + ' .cell-click').on('click', function () {
//        if (jQuery(this).hasClass("del-icon")) {
//            var className = jQuery(this).parent().attr("class").split(' ');
//            var className_ = "";
//            for (var i = 0; i < className.length; i += 1) {
//                if (className[i].indexOf('runme-') >= 0) {
//                    className_ = className[i].substring(6);
//                }
//            }
//            if (confirm('Are you sure?')) {
//                var status = window[className_](jQuery(this).parent(), 'vot', false); //used this instead of eval  : false is for removing row
//                //if (status) { console.log("deleted"); }

//            } else {
//                // Do nothing!
//            }
//        }
//        else {
//            jQuery(v + ' .del-icon').removeClass("del-icon");
//        }

//        //for previuos //// to be finished
//        var newContent = jQuery(v + " .cellEditing").children().val();
//        if (origcon != newContent && origcon != "©" && !jQuery(this).parent().hasClass("edited")) { jQuery(".cellEditing").parent().addClass("edited"); } //for mouse if sell previous cell is edited
//        if (jQuery(v + " .cellEditing").parent().hasClass("edited")) {
//            return;

//        } else {
//            jQuery(v + ' .cellEditing').html(newContent);
//            jQuery(v + ' .cellEditing').removeClass("cellEditing");
//            jQuery(this).addClass("del-icon");
//        }
//        /////////////////////////////////////////////////
//        jQuery(this).focus();
//    });

//}


//var messagebox = function (p, v, time) {
//    jQuery(p).find("td:eq(0) span").html(v);
//    jQuery(p).find("td:eq(0) span").addClass("active");
//    jQuery(p).find("td:eq(0) span").fadeOut(time, function () {
//        jQuery(p).find("td:eq(0) span").removeClass("active");
//        jQuery(p).find("td:eq(0) span").remove();
//        jQuery(p).find("td:eq(0)").append("<span></span>");
//    });
//}

//////////////////////Development Use///////////////////////////////////
///*
//<div class='thisisfortestingpurposesyeahdiv'></div>
//jQuery(".thisisfortestingpurposesyeahdiv").html(thisisfortestingpurposesyeah);
//*/
//var thisisfortestingpurposesyeah = "<input type='button' value='Toogle Validation' onclick='boolvaltest()'/><div class='valresult'>True - Wrong</div>";
//var testval = true;
//var boolvaltest = function () {
//    if (testval)
//    { testval = false; jQuery(".valresult").html("False  -- Valid"); }
//    else
//    { testval = true; jQuery(".valresult").html("True -- Wrong"); }
//    console.clear();
//}
//////////////////////////////////////////////////////////////////////////