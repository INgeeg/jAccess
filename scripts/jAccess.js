jQuery(document).ready(function () {
    jQuery(".thisisfortestingpurposesyeahdiv").html(thisisfortestingpurposesyeah);
    jQuery("button").button();
    Handler();
});

var Handler = function () {
    query("Data/JSONData.json", function (result) {
        var json = JSON.parse(result);
        try {
            var json = JSON.parse(result);
            ll(json.LoadStatus);
            llsec(json.LoadDrop);
        }
            catch (e) {
            console.log(e + " --parse error");
        }
    });
}



var FunSt = function (e, n, ind) {  
    if (ind) { //insert,update
        var validationstatus = TESTVAL_DEV;
        //implementation for all kind of validations starts here...
        if (validationstatus) {
             
            messagebox(".status-tab tr:eq(0)", "Somthing fileds are wrong!!!!");
            return true; 
        }
        else {
            messagebox(".status-tab tr:eq(0)", "Update was succesfull!!!!");
            return false;
        }
    } 
    else { //delete
        messagebox(".status-tab tr:eq(0)", "Deletion was succesfull!!!!");
        return true; 
    }
}

var ll = function (json) {
    if (json) {
        var jd = [];
        for (var i = 0; i < json.RowCount; i++)
            jd.push(
                "<tr inc ='" + i + "' class='runme-FunSt'><td style='width:18px;' class='cell-click hasTooltip'><span></span></td><td style='width:58px;' class='edit date' orig-date='" + json.Date[i] + "'>" + json.Date[i] + "</td><td style='width:58px;' class ='edit drop drop-secFun' id='" + json.Status[i] + "'>" + json.Shortname[i] + "</td><td style='width:178px;' class='edit' >" + json.Note[i] + "</td></tr>"
                );
        jd.push("<tr inc='" + json.RowCount + "' id = 'new' class='runme-FunSt'><td style='width:18px;text-align:center' class='hasTooltip'>*<span></span></td><td style='width:58px;' class='edit date'></td><td  style='width:58px;' class ='edit drop drop-secFun'></td><td  style='width:178px;' class='edit'></td></tr>");
        jQuery(".status-tab").html(jd.join(""));
        jQuery(".status-tab .edit").on('click', clhan);  //edit
    }
}
var SectionStatusDropDown;
var llsec = function (json) {
    if (json) {
        SectionStatusDropDown = json;
    }
}
var secFun = function (e, v) { 
    var jd = [];
    jd.push("<select class='drop-ind'><option></option>");
    if (SectionStatusDropDown) {
        for (var i = 0; i < SectionStatusDropDown.RowCount; i++) {
            var selected = "";
            if (v == SectionStatusDropDown.ID[i])
                selected = "selected='selected'";
            jd.push(
                "<option value = '" + SectionStatusDropDown.ID[i] + "' " + selected + " >" + SectionStatusDropDown.Shortname[i] + "</option>"
                );
        }
        jd.push("</select>");
        jQuery(e).html(jd.join(""));
        jQuery(e).unbind("click");
        jQuery(".drop-ind").focus();
    }

}

//////////////////////Data Service///////////////////////////////

SerP = function (e) {
    this._baseURL = e
};
SerP.prototype = {
    _defaultErrorHandler: function (e, t, n) {
        alert(e.statusText)
    },
    WebMethod: function (e, t, n, r, i) {
        if (!t) t = {};
        if (!i) i = this._defaultErrorHandler;
        jQuery.ajax({
            type: "GET",
            async: r,
            url: this._baseURL + e,
            beforeSend: function (e) {
                e.setRequestHeader("Content-type", "application/json; charset=utf-8")
            },
            data: t,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: n,
            error: i,
            dataFilter: function (e) {
                return e.replace(/^\{"d":(.*)\}$/, "$1")
            }
        })
    }
};
var JQ = new SerP("/jAccess/");
function query(method, func) {
    JQ.WebMethod(method, "", func, false, Error);
}
function Error(r) {
    console.log(r + " ---Session Dead");
}
/////////////////////////////////////////////////////////////////////////////////////



