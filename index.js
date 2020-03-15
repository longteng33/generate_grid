var oBtn = document.getElementsByClassName("btn")[0];
var oInputRow = document.getElementById("row");
var oInputCol = document.getElementById("col");

var oTbody = document.getElementsByTagName("tbody")[0];
var oTable = document.getElementsByTagName("table")[0];
var colorArr = ["green", "red", "blue","goldenrod"];

oInputRow.oninput=oInputCol.oninput=function (){
    this.value=this.value.replace(/\D/g, '')
}
oInputRow.onchange=oInputCol.onchange=function(){
    var reg=/^([1-9][0-9]?|100)$/;
    if(!reg.test(this.value)){
        alert("请输入1-100的数字");
        this.value="";
    }
    
}
oBtn.onclick = function () {
    var rowNum = oInputRow.value;
    var colNum = oInputCol.value;


    oTbody.innerHTML = "";
    var arr = randomArr(rowNum * colNum);

    oTable.classList.add("active")
    for (var i = 0; i < rowNum; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < colNum; j++) {
            var td = document.createElement("td");
            td.innerText = arr.shift();
            coloring(i, j, td,row);
            row.appendChild(td);
        }
        oTbody.appendChild(row);

    }

}
// 获取第i行，第j列的td元素
function fetchTd(i, j) {
    
    var tr = oTbody.getElementsByTagName("tr");
    return tr[i].getElementsByTagName("td")[j]
}
// 着色
function coloring(i, j, ele,row) {
    do {
        var index = Math.floor(Math.random() * colorArr.length)
        ele.style.background = colorArr[index]
    } while (isColoring())

    // 着色条件
    function isColoring() {
        var top, left;
        if (i - 1 >= 0) {
            top = fetchTd(i - 1, j);
            if (top.style.background == ele.style.background) {
                return true;
            }
        }
        if (j - 1 >= 0) {
            left =row.getElementsByTagName("td")[j-1];
            if (left.style.background == ele.style.background) {
                return true;
            }
        }

        return false;
    }
}

// 生成数组
function randomArr(n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i]=i;
        
    }
    return intermingleArr(arr);

}

//打乱数组
function intermingleArr(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var x = Math.floor(Math.random() * (len));
        var arrx = arr[i];
        arr[i] = arr[x];
        arr[x] = arrx;
    }
    return arr;
}

