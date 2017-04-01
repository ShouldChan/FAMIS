﻿//========================全局数据======================================//
var CurrentList = new Array();
var ID_DATAGRID_TABLE = "datagrid_borrow";
var ID_USER_INPUT = "user_borrow";
var ID_DEPARTMENT_INPUT = "department_borrow";
//初始化处理 防止二重加载
var flag_load_BM = false;
var id_borrow_current = -1;
//========================全局数据======================================//




//====================================================================//
function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}
//====================================================================//

//=======================初始化加载信息===================================//
$(function () {

    loadInitData();
});



//绑定数据
function bindData(id_borrow)
{
    id_borrow_current = id_borrow;
    $.ajax({
        url: "/Borrow/Handler_Borrow_Get",
        type: 'POST',
        data: {
            "id": id_borrow
        },
        beforeSend: ajaxLoading,
        success: function (data) {
            ajaxLoadEnd();
            if (data) {

                $("#DJH_add").val(data.serialNum);
                $("#reason_Borrow").val(data.reason_Borrow);
                $("#note_Borrow").val(data.note_Borrow);


                var date1 = dateString(data.date_borrow);
                $("#date_borrow").datebox("setValue", date1);
                var date2 = dateString(data.date_return);
                $("#date_return").datebox("setValue", date2);

                //////绑定人员
                $("#department_borrow").combotree("setValue", data.department_borrow);
                $("#department_borrow").combotree("setText", data.departmentName_borrow);
                $("#user_borrow").combobox("setValue", data.user_borrow);
                $("#user_borrow").combobox("setText", data.userName_borrow);
                id_borrow = data.ID;
                CurrentList = data.assetList;
                LoadInitData_datagrid();


                $("#department_borrow").combotree('disable');
                $("#user_borrow").combobox('disable');
                $("#date_borrow").datebox('disable');
                $('#date_borrow').datebox({
                    disabled: true,
                    editable: false
                });
                $("#date_return").datebox('disable');
                $('#date_return').datebox({
                    disabled: true,
                    editable: false
                });

            } else {
               $.messager.alert('警告', "系统正忙，请稍后继续！", 'warning');
            }


        }
    });
}

function loadInitData() {
    load_Department(ID_DEPARTMENT_INPUT, ID_USER_INPUT);
    //LoadInitData_datagrid();
}

function load_Department(ID_department_INPUT,ID_User_INP) {
    $('#' + ID_department_INPUT).combotree
     ({
         url: '/Dict/load_SZBM',
         valueField: 'id',
         textField: 'nameText',
         required: true,
         method: 'POST',
         editable: false,
         onSelect: function (node) {
             if (flag_load_BM == false) {
                 return;
             }
             load_SYRY(ID_User_INP,node.id);
         }, //全部折叠
         onLoadSuccess: function (node, data) {
             flag_load_BM = true;
             id_BBM = $('#' + ID_department_INPUT).combotree('getValue');
             id_UUSER = $('#' + ID_User_INP).combobox('getValue');
             load_SYRY(ID_User_INP,id_BBM);
             $('#' + ID_User_INP).combobox('setValue', id_UUSER);
             $('#' + ID_department_INPUT).combotree('tree').tree("collapseAll");

         }
     });

}






function load_SYRY(ID_USER_INP,id_dep) {
    $("#" + ID_USER_INP).combobox({
        valueField: 'id',
        method: 'POST',
        textField: 'name',
        url: '/Dict/load_User_add?id_DP=' + id_dep,
        onSelect: function (rec) {
            $('#' + ID_USER_INP).combobox('setValue', rec.id);
            $('#' + ID_USER_INP).combobox('setText', rec.name);
        }
    });
}


function LoadInitData_datagrid() {

    var _list = "";
    for (var i = 0; i < CurrentList.length; i++) {
        if (i == 0) {
            _list = CurrentList[i] + "";
        } else {
            _list = _list + "_" + CurrentList[i];
        }
    }

    $('#' + ID_DATAGRID_TABLE).datagrid({
        url: '/Borrow/Load_SelectedAsset?selectedIDs=' + _list + "&id_borrow=" + id_borrow_current,
        method: 'POST', //默认是post,不允许对静态文件访问
        width: 'auto',
        height: '300px',
        iconCls: 'icon-save',
        dataType: "json",
        fitColumns: true,
        pagePosition: 'top',
        rownumbers: true, //是否加行号 
        pagination: true, //是否显式分页 
        pageSize: 15, //页容量，必须和pageList对应起来，否则会报错 
        pageNumber: 1, //默认显示第几页 
        pageList: [15, 30, 45],//分页中下拉选项的数值 
        columns: [[
            { field: 'ID', checkbox: true, width: 50 },
            { field: 'department_loan', title: '借出部门', width: 50 },
            { field: 'user_loan', title: '借出人', width: 50 },
            { field: 'serial_number', title: '资产编号', width: 50 },
            { field: 'name_Asset', title: '资产名称', width: 50 },
            { field: 'type_Asset', title: '资产类型', width: 50 },
            { field: 'specification', title: '型号规范', width: 50 },
            { field: 'measurement', title: '计量单位', width: 50 },
            { field: 'amount', title: '数量', width: 50 },
            { field: 'value', title: '资产价值', width: 50 },
            { field: 'state_asset', title: '资产状态', width: 50 }
        ]],
        singleSelect: false, //允许选择多行
        selectOnCheck: true,//true勾选会选择行，false勾选不选择行, 1.3以后有此选项
        checkOnSelect: true //true选择行勾选，false选择行不勾选, 1.3以后有此选项
    });
    loadPageTool_Detail(ID_DATAGRID_TABLE);
}

function loadPageTool_Detail() {
    var pager = $('#' + ID_DATAGRID_TABLE).datagrid('getPager');	// get the pager of datagrid
    pager.pagination({
        buttons: [],
        beforePageText: '第',//页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    });
}


function removeSelect(removeList) {
    //alert(removeList);
    //var tmp = new Array();
    var fi = 0;
    for (var i = 0; i < removeList.length; i++) {
        var index = containAtIndex(CurrentList, removeList[i]);
        if (index != -1) {
            CurrentList.splice(index, 1);
        }
    }
    LoadInitData_datagrid();

}

function containAtIndex(list, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == value) {
            return i;
        }
    }
    return -1;
}


function updateCurrentList(addList) {
    var tmp = new Array();
    var fi = 0;
    for (var i = 0; i < CurrentList.length; i++) {
        tmp[i] = CurrentList[i];
        fi++;
    }
    for (var i = 0; i < addList.length; i++) {
        tmp[fi] = addList[i];
        fi++;
    }
    CurrentList = tmp;
    //alert(tmp.toString())
    LoadInitData_datagrid();
}


//==================================================================================//


//==============================================================获取表单数据===========================================================================//


function getListAseet_() {
    var _list = "";
    for (var i = 0; i < CurrentList.length; i++) {
        if (i == 0) {
            _list = CurrentList[i] + "";
        } else {
            _list = _list + "_" + CurrentList[i];
        }
    }
    return _list;
}


function dateString(date) {
    var pa = /.*\((.*)\)/;
    var unixtime = date.match(pa)[1].substring(0, 10);
    return getTime(unixtime);
}

function getTime(/** timestamp=0 **/) {
    var ts = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    t = ts ? new Date(ts * 1000) : new Date();
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    // 可根据需要在这里定义时间格式  
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
}
function openModelWindow(url, titleName) {
    var $winADD;
    $winADD = $('#modalwindow').window({
        title: titleName,
        width: 850,
        height: 650,
        top: (($(window).height() - 850) > 0 ? ($(window).height() - 850) : 200) * 0.5,
        left: (($(window).width() - 650) > 0 ? ($(window).width() - 650) : 100) * 0.5,
        shadow: true,
        modal: true,
        iconCls: 'icon-add',
        closed: true,
        minimizable: false,
        maximizable: false,
        collapsible: false,
        onClose: function () {

        }
    });
    $("#modalwindow").html("<iframe width='100%' height='99%'  frameborder='0' src='" + url + "'></iframe>");
    $winADD.window('open');
}
//采用jquery easyui loading css效果
function ajaxLoading() {
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
}
function ajaxLoadEnd() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

//==============================================================获取表单数据===========================================================================//
