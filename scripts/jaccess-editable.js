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
        var self__ = this;
        var indicator = true;
        var d = {};
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
        //////////////pre load table structure/////////////////////////////
        
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
                self.append(table_header.parent())
                    .append(table.parent())
                    .addClass("pre-load");
                
            }
        } else console.log("Please load settings");

        //////////////////////public/////////////////////////////////////////////
        var load = function (data) {
           
            if (options) {
                    if (data) {
                        var data = data[options.table];
                        item = [];
                        var count = 1;
                        for (var i = 0; i < data.RowCount; i++) {
                            item.push("<tr id='" + (options.columns[0].id ? data[options.columns[0].id][i] : "") + "'><td>" + count + "</td>");
                            for (var j = 0; j < options.columns.length; j++) {
                                item.push("<td " + (options.columns[j].mask ? "data-map='" + data[options.columns[j].map][i] + "'" : "") +
                                     (options.columns[j].extra ? " data-extra='" + data[options.columns[j].extra][i] + "'" : "") +
                                    ">" +
                                    (options.columns[j].mask ? data[options.columns[j].mask][i]
                                    : data[options.columns[j].map][i]) +
                                    "</td>");
                            }
                            item.push("</tr>");
                            count++;
                        }

                        item.push("<tr class='lasttr'><td>*</td>");
                        for (var j = 0; j < options.columns.length; j++) {
                            item.push("<td></td>");
                        }
                        item.push("</tr>");
                        table.find("tr:gt(0)").remove();
                        table.find("tr:first").after(item.join(""));
                        table.off("click", "td");
                        table.on("click", "td", handler);
                        table.parent().parent().off("click", ".tbl-header-sort");
                        table.parent().parent().on("click", ".tbl-header-sort", handler);

                        $(".datagrid-con").scroll(function () {
                            $(".datagrid").scrollLeft($(this).scrollLeft());
                        });
                    }

                    else { console.log("No data was loaded;"); }

               }
               else { console.log("Please load settings;"); }
        }

        ///////////////////////collect data/////////////////////////////////////////////////

        var CollectData = function (t) {
            t.find('td').each(function (index) {
                var self = $(this);
                if (index > 0) {
                    d["d" + index] = {
                        e: self.hasClass("edited-td"),
                        i: index,
                        m: (self.data("map") ? self.data("map") : null),
                        v: self.text(),
                        ex: (self.data("extra") ? self.data("extra") : null)
                    };
                }
            });
            d["p"] = (t.attr("id") ? t.attr("id") : null);
            d["n"] = t.hasClass("lasttr");
            d["t"] = t.parent().parent().attr("id");
            console.log(d);
        }
        ///////////////////////handler/////////////////////////////////////////
        var handler = function () {
            
            var self_ = $(this),
                index_td = self_.index(),
                index_tr = self_.parent().index(),
                tmp = index_td + index_tr * 50,
                text = self_.text(),
                newContent = table.find(".cellEditing").children().val(),
                optionValue = self_.data("map"),
                lastdrop = table.find(".drop-ind option:selected").text(),
                lastdropid = table.find(".drop-ind option:selected").val();
            
                
            
            if (self_.hasClass("tbl-header-sort"))//sort
            {
                console.log("header is clicked");
                return;
            }


            if (index_tr == 0) return; //header row
            if (index_td == 0)//header column
            {
                table.find(".cellEditing")
                        .text(newContent)
                        .removeClass("cellEditing");
                table.find(".drop-ind")
                            .parent()
                            .data("map", lastdropid)
                            .text(lastdrop);

                if (table.find("tr:last").index() != index_tr)
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
                    indicator = true;
                    table.find(".cellEditing")
                        .text(newContent)
                        .removeClass("cellEditing");

                    table.find(".drop-ind")
                            .parent()
                            .data("map", lastdropid)
                            .text(lastdrop);
                    
                    if (options.columns[index_td - 1].type == "text" || options.columns[index_td - 1].type == "note") {
                        self_.addClass("cellEditing")
                             .html("<input type='text' value='" + text + "' />")
                             .children()
                             .focus()
                            .on("keydown", function (e) {
                                textkey(e);
                                setTimeout(function () {
                                    changed(text, e);
                                }, 1);
                            });
                    }

                    if (options.columns[index_td - 1].type == "date") {
                        self_.addClass("cellEditing")
                             .html("<input type='text' value='" + text + "' />")
                             .children()
                             .datepicker()
                             .focus()
                          .on("keydown", function (e) {
                              textkey(e);
                              setTimeout(function () {
                                  changed(text, e);
                              }, 1);
                          });
                        $('div.ui-datepicker').css({ fontSize: '10px' });
                    }


                    if (options.columns[index_td - 1].type == "drop") {
                        var jd = [];
                        jd.push("<select style='width:inherit;' class='drop-ind'><option value='-1'></option>");
                        if (options.columns[index_td - 1].drop) {
                            for (var i = 0; i < options.columns[index_td - 1].drop.RowCount; i++) {
                                jd.push(
                                       "<option value = '" + options.columns[index_td - 1].drop.key[i] + "' >" + options.columns[index_td - 1].drop.value[i] + "</option>"
                                       );
                            } jd.push("</select>");
                            self_.html(jd.join(""))
                                .children()
                                .val((optionValue ? optionValue : -1))
                                .focus()
                                .on("keydown", function (e) {
                                    dropkey(e);
                                })
                            .on("change", function (e) {
                                $(this).parent().attr("data-map", $(this).val());
                                indicator = false;
                                changed(optionValue, e);
                            });
                        }
                    }
                    cellpos = index_td + index_tr * 50;
                }
                //return;
                /////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////
                if (table.find("tr").hasClass("edited-tr")) {
                    var editedtr = table.find(".edited-tr");
                    if (indicator) CollectData(editedtr);
                }
                if (indicator) table.find(".edited-tr").removeClass("edited-tr");
                /////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////

            }
            else  //uneditable
            {
                table.find(".cellEditing")
                        .text(newContent)
                        .removeClass("cellEditing");

                table.find(".drop-ind")
                            .parent()
                            .data("map", lastdropid)
                            .text(lastdrop);

                console.log("uneditable");
               // return;
            }

        }
        ///////////////////////////////////////////////////////////////
        var changed = function (t, e) {
            var self = $(e.target);
            if (t != self.val()) {
                self.parent().addClass("edited-td");
                self.parent().parent().addClass("edited-tr");
            }
        }
        ///////////////////drop handler//////////////////////////////////
        var dropkey = function (e) {
            var self_ = $(e.target),
                self_td = self_.parent(),
                self_td_i = self_td.index(),
                self_tr = self_td.parent(),
                optionValue = self_.val(),
                optionText = self_.text();
            $('.ui-datepicker').remove();

            if (e.keyCode === 37) {//left
                e.preventDefault();
                    if (self_td_i != 1) {
                        var cur = self_td.prev();
                        if (options.columns[cur.index() - 1].edit) {
                            cur.trigger("click");
                        }
                        else {
                            while (!options.columns[cur.index() - 1].edit) {
                                cur = cur.prev();
                                if (options.columns[cur.index() - 1].edit) {
                                    cur.trigger("click");
                                    return;
                                }
                            }
                        } return;
                    }
            }

            if (e.keyCode === 39) {   //right 
                e.preventDefault();
                if (self_td_i != options.columns.length) {
                    var cur = self_td.next();
                    if (options.columns[cur.index() - 1].edit) {
                        cur.trigger("click");
                    }
                    else {
                        while (!options.columns[cur.index() - 1].edit) {
                            cur = cur.next();
                            if (options.columns[cur.index() - 1].edit) {
                                cur.trigger("click");
                                return;
                            }
                        }
                    } return;
                }
            }
            if (e.keyCode === 40 || e.keyCode === 13) {   //down and enter
                e.preventDefault();
                self_tr
                    .next()
                    .find('td')
                    .eq(self_td_i)
                    .trigger("click");
                return;
            }
            if (e.keyCode === 38) {   //up 
                e.preventDefault();
                self_tr
                    .prev()
                    .find('td')
                    .eq(self_td_i)
                    .trigger("click");
                return;
            }

            if (e.keyCode === 27) {  //escape
                self_tr.find("td:first").trigger("click");
            }

            if (e.keyCode == 9) {  //tab
                e.preventDefault();
                if (self_td_i != options.columns.length) {
                    var cur = self_td.next();
                    if (options.columns[cur.index() - 1].edit)
                        cur.trigger("click");
                    else {
                        while (!options.columns[cur.index() - 1].edit) {
                            cur = cur.next();
                            if (options.columns[cur.index() - 1].edit)
                            { cur.trigger("click"); return; }
                        } return;
                    }

                }
            }

        }    
        ////////////////////key handler///////////////////////////////////
        var textkey = function (e) {
            var self_ = $(e.target),
                self_td = self_.parent(),
                self_td_i = self_td.index(),
                text = self_.val(),
                self_tr = self_td.parent(),
                len = text.length;

            $('.ui-datepicker').remove();
            if (e.keyCode === 40 || e.keyCode === 13) {   //down and enter
                self_tr
                    .next()
                    .find('td')
                    .eq(self_td_i)
                    .trigger("click");
                return;
            }
            if (e.keyCode === 38) {   //up 
                self_tr
                    .prev()
                    .find('td')
                    .eq(self_td_i)
                    .trigger("click");
                return;
            }
            if (e.keyCode === 39)    //right 
                if (self_.getCursorPosition() == len)
                    if (self_td_i != options.columns.length) {
                        var cur = self_td.next();
                        if (options.columns[cur.index() - 1].edit) {
                            cur.trigger("click");
                        }
                        else {
                            while (!options.columns[cur.index() - 1].edit) {
                                cur = cur.next();
                                if (options.columns[cur.index() - 1].edit) {
                                    cur.trigger("click");
                                    return;
                                }
                            }
                        } return;
                    }

            if (e.keyCode === 37) {  //left
                if (self_.getCursorPosition() == 0)
                    if (self_td_i != 1) {
                        var cur = self_td.prev();
                        if (options.columns[cur.index() - 1].edit) {
                            cur.trigger("click");
                        }
                        else {
                            while (!options.columns[cur.index() - 1].edit) {
                                cur = cur.prev();
                                if (options.columns[cur.index() - 1].edit) {
                                    cur.trigger("click");
                                    return;
                                }
                            }
                        } return;
                    }
            }

            if (e.keyCode === 27) {  //escape
                self_tr.find("td:first").trigger("click");
            }

            if (e.keyCode == 9) {  //tab
                e.preventDefault();
                if (self_td_i != options.columns.length) {
                    var cur = self_td.next();
                    if (options.columns[cur.index() - 1].edit)
                        cur.trigger("click");
                    else {
                        while (!options.columns[cur.index() - 1].edit) {
                            cur = cur.next();
                            if (options.columns[cur.index() - 1].edit)
                            { cur.trigger("click"); return; }
                        } return;
                    }

                }
            }

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








