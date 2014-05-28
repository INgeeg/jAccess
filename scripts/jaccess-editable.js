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
        if (options) {
            var height = options.height,
            width = options.width,
            item = [],
            table_total = 20,
            id = this.attr("id"),
            cellpos = -1;

        for (var i = 0; i < options.columns.length; i++) {
            table_total += options.columns[i].width << 0;
        }
        var header_last = options.columns[options.columns.length - 1].width + Math.abs(width - table_total);
        /////////////////////////
        
        if (!this.hasClass("pre-load")) {
            var self = this;
                var wrapper_header = $("<div/>").addClass("datagrid").css({ width: width });
                var wrapper = $("<div/>").addClass("datagrid-con").css({ width: width, height: height });
                
                
                var table_header = $("<table />").css({ width: table_total });
                item = ["<tr><td style='width:20px;'></td>"];
                for (var i = 0; i < options.columns.length; i++) {
                    if (i == options.columns.length - 1)
                        item.push("<td style='width:" + header_last + "px;'  class='tbl-header-sort'>" + options.columns[i].header + "</td>");
                    else
                        item.push("<td style='width:" + options.columns[i].width + "px;' class='tbl-header-sort'>" + options.columns[i].header + "</td>");
                } item.push("</tr>"); table_header.append(item.join("")).wrapAll(wrapper_header);


                table = $("<table />", { id: id + "-jtable" }).css({ width: table_total });
                item = ["<tr><td style='width:20px;'></td>"];
                var count = 1;
                for (var i = 0; i < options.columns.length; i++) {
                   // table.find("td:nth-child(" + (count++) + ")").css({ "text-align": (options.columns[i].align ? options.columns[i].align : "left") });
                    item.push("<td style='width:" + options.columns[i].width + "px;'></td>");
                } item.push("</tr>"); table.append(item.join("")).wrapAll(wrapper);
                self.append(table_header.parent());
                self.append(table.parent());
                self.addClass("pre-load");
                
            }
        } else console.log("Please load settings");

        var handler = function () {
            var self_ = $(this),
                index_td = self_.index(),
                index_tr = self_.parent().index(),
                tmp = index_td + index_tr * 50,
                text = self_.text(),
                newContent = table.find(".cellEditing").children().val();
            if (self_.hasClass("tbl-header-sort"))//sort
            {
                console.log("header is clicked");
                return;
            }


            if (index_tr == 0) return; //header row
            if (index_td == 0)//header column
            {
                if (self_.parent().hasClass("selected-tr")) {
                    table.find("tr").removeClass("selected-tr");
                } else {
                    table.find("tr").removeClass("selected-tr");
                    self_.parent().addClass("selected-tr");
                }
                return;
            }

            if (options.columns[index_td - 1].edit) //editable td
            {
                table.find("tr").removeClass("selected-tr");
                if (cellpos != tmp) {
                    table.find(".cellEditing").text(newContent)
                    .removeClass("cellEditing");

                    if (options.columns[index_td - 1].type=="text") {
                        self_.addClass("cellEditing")
                             .html("<input type='text' value='" + text + "' />")
                             .children()
                             .focus();
                    }

                    cellpos = index_td + index_tr * 50;
                }
                
                return;
            }
            else
            {
                console.log("uneditable");
                return;
            }


        }

        var load = function (data) {
        if (options) {
            if (data) {
                var data = data[options.table];
                item = [];
                var count = 1;
                for (var i = 0; i < data.RowCount; i++) {
                    item.push("<tr id='" + (options.columns[0].id ? data[options.columns[0].id][i] : "") + "'><td>" + count + "</td>");
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
                table.parent().parent().on("click", ".tbl-header-sort", handler);
                //wrapper.on("scroll", function () {
                    //wrapper_header.scrollLeft($(this).scrollLeft());
                //});

                $(".datagrid-con").scroll(function () {
                 $(".datagrid").scrollLeft($(this).scrollLeft());
                });
            }
            else { console.log("No data was loaded;"); }
        } else { console.log("Please load settings;"); }
    }
        return {
            load: load
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








