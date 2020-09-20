$(function () {
    load();
    //输入数据并存储
    $("#title").on("keyup", function (e) {
        if ($(this).val() != "") {
            if (e.keyCode === 13) {
                var local = getData();
                local.push({
                    title: $(this).val(),
                    done: false
                });
                $(this).val("");
                saveData(local);
                load();
            };
        }
    });
    //删除数据
    $("ol,ul").on("click", "li a", function () {
        var index = $(this).attr("index");
        var local = getData();
        local.splice(index, 1);
        saveData(local);
        load();
    })
    //勾选
    $("ul,ol").on("change", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("index");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    })

    //读取本地存储数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveData(local) {
        localStorage.setItem("todolist", JSON.stringify(local));
    }

    //渲染页面
    function load() {
        var data = getData();
        $("ol,ul").empty();
        $.each(data, function (i, ele) {
            if (data[i].done == true) {
                $("ul").prepend($("<li>" + "<input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;' index=" + i + " ></a></li>"));
            } else {
                $("ol").prepend($("<li>" + "<input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' index=" + i + " ></a></li>"));
            }
        });
        var olength = $("ol").children("li").length;
        var ulength = $("ul").children("li").length;
        $("#todocount").html(olength);
        $("#donecount").html(ulength);
    }
})