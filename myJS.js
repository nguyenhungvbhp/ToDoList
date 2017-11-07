/*HÀm lưu mảng giá trị vào local storage*/
function saveIntoLocalStorage(arr) {
    localStorage.setItem("data", JSON.stringify(arr));
}

/*Hàm lấy dữ liệu dạng JSON tử local storage*/
function getDataFromLocalStorage() {
    var jsonArray = localStorage.getItem("data");
    var arrData = JSON.parse(jsonArray);

    if(arrData == null) arrData = [];
    return arrData;
}

/*Show into table*/
function showIntoTable() {
    var arr = getDataFromLocalStorage();

    if(arr == null) return;
    arr.forEach(function (element, index) {
       var date = standardTime(element.time)

        var result = converTime(date);
       var arrTime = element.time.split(" ");

        document.write("<tr style='height: 100%;'>")
        document.write('<td class="text-center" style="vertical-align: middle">' + arrTime[1] + '<br>' + arrTime[0] + '</td>');
        document.write('<td>' + '<p class="text-primary text-uppercase" data-toggle="collapse" data-target="#demo' + index +  '">' +element.task +
            '&nbsp;&nbsp;&nbsp;<span class="label label-danger" style=" text-transform: lowercase">' +  result+'</span>' + '</p>' + ' <p class="small text-justify collapse" id="demo'  + index  +'" >'+element.content + '</p>' + '</td>');
        if (element.level == "High") {
            document.write(' <td class="text-center" style="vertical-align: middle"><h4><span class="label label-danger">High</span></h4> </td>');
        } else if (element.level == "Small") {
            document.write('<td class="text-center" style="vertical-align: middle"><h6><span class="label label-default">Small</span></h6></td>');
        } else {
            document.write('<td class="text-center" style="vertical-align: middle"><h5><span class="label label-info">Medium</span></h5></td>');
        }
        document.write('<td class="text-center" style="vertical-align: middle">');
        document.write('<button type="button" class="btn btn-primary button1"><span class="glyphicon glyphicon-edit"></span>&nbsp;Edit</button>');
        document.write('<button type="button" class="btn btn-danger button1"><span class="glyphicon glyphicon-remove"></span>&nbsp;Delete</button>');
        document.write('</td>');
        document.write("</tr>")
    });
}



/*Hàm thêm task khi click button*/
function addTask() {
    var task = document.getElementById('task').value;
    var content = document.getElementById('content').value;
    var time =  $("#ngaydukien").find("input").val();
    var levels = document.getElementById('sel2');
    var level = levels.options[levels.selectedIndex].text;

    var task = {
        "task": task,
        "content": content,
        "time": time,
        "level": level
    };

    var arr = getDataFromLocalStorage();
    arr.push(task);

    saveIntoLocalStorage(arr);
}

/*Ham xoa het task*/
function clearAllTask() {
    localStorage.clear();
}

/*Hàm chuyển đổi thời gian */
function converTime(date) {
    var ms1 = date.getTime() / 1000;/*Lấy thời gian của việc cần làm*/
    var cd = new Date();
    var delta = ms1 -  cd.getTime()/1000;
    var  result = "";

    if(delta < 0) {
        return "Xóa";
    }

    if(delta < (60 * 60)) {
        return "Còn " + Math.floor(delta / 60) + " phút";
    }

    if(delta < (24 * 60 * 60)) {
        return "Còn " + Math.floor(delta / (60 * 60)) + " giờ";
    }

    if(delta < (4 * 60 * 60)) {
        return"Còn " + Math.floor(delta/ (24 * 60 * 60)) + " giờ";
    }


    return result;
}


$(function () {
    $('#datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
    });

    $('#datetimepicker1').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    $('#datetimepicker2').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#datetimepicker00').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
    });

});




/*26/10/2017 09:32:00*/
/*HÀm chuẩn hóa thời gian và trả về dạng Date*/
function standardTime(time) {

    var d = time.split(" ");
    var date = d[0].split("/");
    var t = d[1].split(":");
    var standard = new Date(date[2], date[1] - 1, date[0], t[0], t[1]);
    return standard;
}


$('#thongkelevel').change(function() {
    var val = $("#thongkelevel option:selected").text();
    var table, tr, td, i;
    input = document.getElementById("serach-title");
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        var l = "All";
        if (td) {
            var level = td.innerHTML;
            if(level.search("High") > -1) {
                l = "High";
            }else if (level.search("Medium") > -1){
                l = "Medium";
            } else if(level.search("Small") > -1){
                l = "Small";
            }
            console.log(td.innerHTML);
            if (l == val) {
                tr[i].style.display = "";
            } else {

                tr[i].style.display = "none";
                if(val == "All") {
                    tr[i].style.display = "";
                }
            }
        }
    }
});

/*Tìm kiếm theo tiêu đê*/
function serachTitle() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("serach-title");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




function generate_table(arr) {
    // var arr = getDataFromLocalStorage();
    var tbody = document.getElementsByTagName("tbody")[0];
    arr.forEach(function (element, index) {
        var date = standardTime(element.time);
        var result = converTime(date);
        var arrTime = element.time.split(" ");
        var row = document.createElement("tr");

        var cellDate = document.createElement("td");
        cellDate.setAttribute("class", "text-center");
        cellDate.setAttribute("style", "vertical-align: middle");
        var tagBr = document.createElement("br");
        var cellDateText1 = document.createTextNode(arrTime[1]);
        var cellDateText2 = document.createTextNode(arrTime[0]);
        cellDate.appendChild(cellDateText1);
        cellDate.appendChild(tagBr);
        cellDate.appendChild(cellDateText2);
        row.appendChild(cellDate);

        /*Tạo cell task*/
        var cellTask = document.createElement("td");
        var pTaskText = document.createTextNode(element.task );
        var space = document.createTextNode("\u00A0");

        var spanTime = document.createElement("span");
        var timeText = document.createTextNode(result);
        spanTime.appendChild(timeText);
        spanTime.setAttribute("class", "label label-danger");
        spanTime.setAttribute("style", "text-transform: lowercase");

        /*Tạo thẻ p chứ title trong task*/
        var pTitle = document.createElement("p");
        pTitle.setAttribute("class", "text-primary text-uppercase");
        pTitle.setAttribute("data-toggle", "collapse");
        pTitle.setAttribute("data-target", "#demo" + index);

        pTitle.appendChild(pTaskText);
        pTitle.appendChild(space);
        pTitle.appendChild(spanTime);

        /*Tạo thẻ p content nawmg trong task*/
        var pContent = document.createElement("p");
        pContent.setAttribute("class", "small text-justify collapse");
        pContent.setAttribute("id", "demo" + index);
        /*Tạo text nằm trong thẻ p content*/
        var pContentText = document.createTextNode(element.content);
        pContent.appendChild(pContentText);





        cellTask.appendChild(pTitle);
        cellTask.appendChild(pContent);
        row.appendChild(cellTask);


        var cellLevel = document.createElement("td");
        cellLevel.setAttribute("class", "text-center");
        cellLevel.setAttribute("style", "vertical-align: middle");

        var celLevelTextNode = document.createTextNode(element.level);
        if (element.level == "High") {
            var h4 = document.createElement("h4");
            cellLevel.appendChild(h4);
            var span = document.createElement("span");
            span.setAttribute("class","label label-danger");
            h4.appendChild(span);
            span.appendChild(celLevelTextNode);
        } else if (element.level == "Medium") {
            var h5 = document.createElement("h5");
            cellLevel.appendChild(h5);
            var span = document.createElement("span");
            span.setAttribute("class","label label-info");
            h5.appendChild(span);
            span.appendChild(celLevelTextNode);
        }else {
            var h6 = document.createElement("h5");
            cellLevel.appendChild(h6);
            var span = document.createElement("span");
            span.setAttribute("class","label label-default");
            h6.appendChild(span);
            span.appendChild(celLevelTextNode);
        }
        // cellLevel.appendChild(celLevelTextNode);
        row.appendChild(cellLevel);


        /*Tạo cell chứa 2 button*/
        var tdAction = document.createElement("td");
        tdAction.setAttribute("class", "text-center");
        tdAction.setAttribute("style", "vertical-align: middle");

        var buttonEdit = document.createElement("button");
        buttonEdit.setAttribute("class", "btn btn-primary button1");
        tdAction.appendChild(buttonEdit);
        var spanButtonEdit = document.createElement("span");
        spanButtonEdit.setAttribute("class","glyphicon glyphicon-edit" );
        buttonEdit.appendChild(spanButtonEdit);
        var textEdit = document.createTextNode(" Edit");
        spanButtonEdit.appendChild(textEdit);


        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("class", "btn btn-danger button1");
        tdAction.appendChild(buttonDelete);
        var spanButtonDelete = document.createElement("span");
        spanButtonDelete.setAttribute("class","glyphicon glyphicon-remove-circle" );
        buttonDelete.appendChild(spanButtonDelete);
        var textDelete = document.createTextNode(" Delete");
        spanButtonDelete.appendChild(textDelete);

        row.appendChild(tdAction);


        tbody.appendChild(row);

    });

}


function ngayBatDau() {
    var x = document.getElementById('ngayketthuc').style.display;
    if(x == "none") {
        document.getElementById('ngayketthuc').style.display = "block";
    }else {
        document.getElementById('ngayketthuc').style.display = "none";
    }
}

$(window).bind("load", function() {
    generate_table(getDataFromLocalStorage());

});


function refreshPage() {
    // location.reload();
    console.log("sssss");
    generate_table(filterTime());
}

function listFromDate() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("from");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/*Hàm chuẩn hóa thời gian //*/
function standardTimeFromTo(timeString) {
    var arr = timeString.split("/");
    var date = new Date(arr[2], arr[1], arr[0]);
    var ms = date.getTime();
    return ms;
}

/*Hàm tính độ cheenl lệch giữa 2 khoảng thời gian*/
function thuocKhoangThoiGian(time) {
    var fromString = document.getElementById('datetimepicker1').value;
    var from = standardTimeFromTo(fromString);
    var toString = document.getElementById('datetimepicker2').value;
    var to = standardTimeFromTo(toString);

    console.log(to);
    console.log(from);

    var t = standardTime(time).getTime();
    if(t >= from && t <= to) {
        return true;
    }
    return false;
}

/*Hàm lọc trong 1 khoảng thời gian*/
function filterTime() {
    // var arr = getDataFromLocalStorage().filter(function (element) {
    //     return thuocKhoangThoiGian(element.time);
    // })
    var arr = [];
    getDataFromLocalStorage().forEach(function (element , index ) {
        console.log(standardTime(element.time).getTime());
       if(!thuocKhoangThoiGian(element.time)) {
           console.log("asss");
           arr.push(element);
       }
    });
    console.log(arr);

    return arr;
}

