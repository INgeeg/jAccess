﻿(function ($, undefined) {

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
        if (options) {
        var height = options.height,
        width = options.width,
        item = [],
        table_total = 20,
        id = this.attr("id");

        for (var i = 0; i < options.columns.length; i++) {
            table_total += options.columns[i].width << 0;
        }
        var header_last = options.columns[options.columns.length - 1].width + Math.abs(width - table_total);
        /////////////////////////
        
            if (!this.hasClass("pre-load")) {
                var wrapper_header = $("<div/>").addClass("datagrid").css({ width: width });
                var wrapper = $("<div/>").addClass("datagrid-con").css({ width: width, height: height });
                var table_header = $("<table />").css({ width: table_total });
                item = ["<tr><td style='width:20px;'></td>"];
                for (var i = 0; i < options.columns.length; i++) {
                    if (i == options.columns.length - 1)
                        item.push("<td style='width:" +header_last + "px;'>" + options.columns[i].header + "</td>");
                    else
                        item.push("<td style='width:" + options.columns[i].width + "px;'>" + options.columns[i].header + "</td>");
                } item.push("</tr>"); table_header.append(item.join("")).wrapAll(wrapper_header);

                table = $("<table />", { id: id + "-jtable" }).css({ width: table_total });
                item = ["<tr><td style='width:20px;'></td>"];
                var count = 1;
                for (var i = 0; i < options.columns.length; i++) {
                   // table.find("td:nth-child(" + (count++) + ")").css({ "text-align": (options.columns[i].align ? options.columns[i].align : "left") });
                    item.push("<td style='width:" + options.columns[i].width + "px;'></td>");
                } item.push("</tr>"); table.append(item.join("")).wrapAll(wrapper);

                table_header.parent().append(table.parent());
                this.append(table_header.parent());
                this.append(table.parent());
                this.addClass("pre-load");
            }
        } else console.log("Please load settings");

        var handler = function () {
            var self = $(this),
                index_td = self.index(),
                index_tr = self.parent().index();
            if (index_tr == 0) return; //header row
            if (index_td == 0)//header column
            {
                console.log("pops");
                return;
            }

            if (options.columns[index_td - 1].edit) //editable td
            {
                console.log("this is editable");
            }
            else
            {
                console.log("uneditable");
            }


        }

        return {
            load: function (data) {
                if (options) {
                    if (data) {
                        var data = data[options.table];
                        item = [];
                        var count = 1;
                        for (var i = 0; i < data.RowCount; i++) {
                            item.push("<tr id='" + (options.columns[0].id ? data[options.columns[0].id][i]: "") + "'><td>" + count + "</td>");
                            for (var j = 0; j < options.columns.length; j++) {
                                item.push("<td data-map='" + (options.columns[j].mask ? data[options.columns[j].map][i] : "") + "'>" +
                                    (options.columns[j].mask ? data[options.columns[j].mask][i]
                                    : data[options.columns[j].map][i]) +
                                    "</td>");
                            }
                            item.push("</tr>");
                            count++;
                        }
                        table.find("tr:first").after(item.join(""));
                        table.on("click", "td", handler);
                    }
                    else { console.log("No data was loaded;"); }
                } else { console.log("Please load settings;"); }
            }
        };
    }
        
    

    //$.fn.jaccess.load = function (options) {
    //    //var cellpos = -1,
    //    //    rowpos = -1,
    //    //    origcon = "©";// content of previous cell
    //    //var handler = function (e) {

    //    //};
    //    console.log($options);// content of previous cell

    //    //return this.text(options.data);
    //};

}(jQuery));








