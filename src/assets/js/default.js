$(function () {
    $(".panel_hdr").children("strong").click(function () {
        $(this).parent().next().toggle("blind");
    });

    $("a").click(function () {
        if ($(this).attr("href") != "#") {
            console.log("You clicked the '" + $(this).attr("title") + "' link...");
        }
        else {
            return false;
        }
    });

    $(".suggest_entry").click(function (e) {
        alert("This feature is not currently implemented...");
    });

    $(".count").each(function() {
        var qty = $(this).parent().next().children("app-link").children("ul").children("a.list-group-item").length;

        if(qty === 0) {
            $(this).parent().attr("title", "No links found");
        } else {
            $(this).parent().attr("title", "(" + qty + (qty > 1 ? " links found)" : " link found)"));
        }
    });

    $(".fancy_txt_area").click(function () {
        // $(".fancydlg").click(function() {

        // if($("#enablefrmdlg").is(":checked") == true) {
        var _currTitle = $(this).attr("href"); // $(this).parent().children("div").attr("id");

        // Create the dialog...
        var dlg = GetDialog(_currTitle);

        // Create the contents of the dialog...
        $("#txt_src").val($(this).attr("id"));

        var myDict = $(this).val().split(",");

        var _dict = BuildDictionary($(this));

        var tblFrm = BuildTable(_dict);

        $("#other_detail_vals").html(tblFrm);

        $("#txt_src").val($(this).attr("id"));

        dlg.dialog("open");
        // }
    });

    function BuildTable(dict) {
        var tblFrm = "<table border='0' cellspacing='0' cellpadding='4'>";

        $.each(dict, function (key, value) {
            tblFrm = tblFrm + "<tr class='kvp'>";
            tblFrm = tblFrm + "<td class='item'>" + key + ": </td>";
            tblFrm = tblFrm + "<td class='val'><input type='text' class='val' value='" + value + "' size='20'></input></td>";
            tblFrm = tblFrm + "<td class='rem'> - </td>";
            tblFrm = tblFrm + "</tr>";
        });

        tblFrm = tblFrm + "<tr class='kvp'>";
        tblFrm = tblFrm + "<td class='new_item'><input type='text' class='item' value='' size='10'></input></td>";
        tblFrm = tblFrm + "<td class='new_val'><input type='text' class='val' value='' size='20'></input></td>";
        tblFrm = tblFrm + "<td class='add'> </td>";
        tblFrm = tblFrm + "</tr>";
        tblFrm = tblFrm + "</table>";

        return tblFrm
    }

    function SaveDlgValues() {
        console.log("Starting save...");

        var _newVals = "";

        $("#other_detail_vals").find(".kvp").each(function (i) {
            if ($(this).hasClass("rem_item") == false) {
                $(this).children("td").each(function () {
                    if ($(this).attr("class") == "new_item") {
                        if ($(this).children(".item").val() != "") {
                            _newVals = _newVals + $(this).children(".item").val() + "=";
                        }
                    }
                    else if ($(this).attr("class") == "item") {
                        _newVals = _newVals + $(this).text().replace(": ", "") + "=";
                    }
                    else if ($(this).attr("class") == "new_val") {
                        if ($(this).children(".val").val() != "") {
                            _newVals = _newVals + $(this).children(".val").val() + ",\n";
                        }
                    }
                    else if ($(this).attr("class") == "val") {
                        _newVals = _newVals + $(this).children(".val").val() + ",\n";
                    }
                });
            }
        });

        _newVals = _newVals.substring(0, _newVals.lastIndexOf(',')).replace("undefined", "");

        console.log("New Values: " + _newVals);

        $("#other_detail_vals").html("");

        $("#" + $("#txt_src").val()).val(_newVals);
    }

    function GetDialog(title) {
        var dlg = $('#dialog').dialog({
            autoOpen: false,
            width: 300,
            resizable: false,
            title: "Details - " + title + "'s",
            modal: true,
            buttons: {
                "Update": function () {
                    SaveDlgValues();
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $("#other_detail_vals").html("");
                    $(this).dialog("close");
                }
            }
        });

        return dlg;
    }

    function BuildDictionary(obj) {
        var _deftDict = "Username,Stuff".split(","); // obj.parent().children("input[type='hidden']").val().split(",");
        var _currDict = obj.val().split(",");

        // Create the dictionary object...
        var dict = {};

        for (var i = 0; i < _deftDict.length; i++) {
            if (_deftDict[i] != "") {
                dict[_deftDict[i]] = "";
            }
        }

        if ((obj.val() != "") && (obj != undefined)) {
            // Populate the dictionary with the current values...
            for (var i = 0; i < _currDict.length; i++) {
                var _currKey = _currDict[i].split("=")[0];
                var _currVal = _currDict[i].split("=")[1];

                if ((_currKey != "") && (_currVal == undefined)) {
                    _currVal = "";
                }

                dict[_currKey.replace("\n", "")] = _currVal.replace("\n", "");
            }
        }

        return dict;
    }
});
