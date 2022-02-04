window.onload = function () {
  // 确认搜索框是否为空，开启表单提交
  enableSeach();
  // 功能区的点击效果
  addBarsMoverover();
  // 先刷新一个随机壁纸
  /* addScriptTag(
    "https://api.kodcloud.com/?wallpage/index&lang=zh-CN&callback=jQuery180039657500026183157_1641714936241"
  ); */
  disNotice();
  // 检查屏幕大小
  check();
  getTips();
};

function enableSeach() {
  var ipt = document.getElementById("input");
  var form = document.getElementsByTagName("form")[0];
  ipt.onchange = function () {
    if (this.value.trim() != "") form.removeAttribute("onsubmit");
    else form.setAttribute("onsubmit", "return false");
  };
}

function addBarsMoverover() {
  var barsBox = document.getElementById("barsBox");
  var functionBox = document.getElementById("functionBox");
  var navBox = document.getElementById("nav");
  var bars_1 = document.getElementById("bars_1");
  var bars_2 = document.getElementById("bars_2");
  var bars_3 = document.getElementById("bars_3");
  var navNotice = document.getElementById("navNotice");
  var refresh = document
    .getElementById("refresh")
    .getElementsByTagName("span")[0];
  var bg = document.getElementById("bg");
  var flag = 0;
  barsBox.onclick = function () {
    if (flag == 0) {
      bars_1.classList.add("bars_1Moverover");
      bars_2.classList.add("bars_2Moverover");
      bars_3.classList.add("bars_3Moverover");
      functionBox.classList.add("funcMove");
      navBox.classList.add("navWidth");
      navNotice.style.display = "block";

      flag = 1;
    } else {
      bars_1.classList.remove("bars_1Moverover");
      bars_2.classList.remove("bars_2Moverover");
      bars_3.classList.remove("bars_3Moverover");
      functionBox.classList.remove("funcMove");
      navBox.classList.remove("navWidth");
      navNotice.style.display = "none";
      flag = 0;
    }
    if (flag == 1) {
      bg.onclick = function () {
        bars_1.classList.remove("bars_1Moverover");
        bars_2.classList.remove("bars_2Moverover");
        bars_3.classList.remove("bars_3Moverover");
        functionBox.classList.remove("funcMove");
        navBox.classList.remove("navWidth");
        navNotice.style.display = "none";
        flag = 0;
      };
    }
  };

  refresh.addEventListener("click", function () {
    this.classList.add("fa-spin");
    // randomBg();
    addScriptTag(
      "https://api.kodcloud.com/?wallpage/index&lang=zh-CN&callback=jQuery180039657500026183157_1641714936241"
    );
  });
}
// function randomBg() {
//   var reqs = new XMLHttpRequest();
//   var url = "https://api.kodcloud.com/?wallpage/index&lang=zh-CN&callback=jQuery180039657500026183157_1641714936241&_=1641714966764";
//   reqs.onreadystatechange = function () {
//     if (reqs.readyState == 4 && reqs.status == 200) {
//       console.log('od');
//       var datUrl = reqs.responseText;
//     }
//     console.log(datUrl);
//   }
//   reqs.addHeader
//   reqs.open('get', url, true);
//   reqs.send();
// }

function addScriptTag(src) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

function jQuery180039657500026183157_1641714936241(data) {
  var url = JSON.stringify(data);
  var bg = document.getElementById("bg");
  bg.style.backgroundImage = "url(" + url + ")";
  if (url != "") {
    var refresh = document
      .getElementById("refresh")
      .getElementsByTagName("span")[0];
    setTimeout(function () {
      refresh.classList.remove("fa-spin");
    }, 650);
  }
  var scripts = document.getElementsByTagName("script");
  scripts[scripts.length - 1].remove();
}
function disNotice() {
  var notice = document.getElementById("notice");
  var dis = notice.getElementsByTagName("span")[0];
  dis.onclick = hidden;
}
function hidden() {
  var notice = document.getElementById("notice");
  notice.classList.add("removeAnimation");
  setTimeout(function () {
    notice.classList.remove("removeAnimation");
    notice.style.display = "none";
  }, 300);
}
// window.onresize = function () {
//   check();
//  }
function check() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  if (width < 720) {
    var notice = document.getElementById("notice");
    notice.style.display = "block";
  } else {
    hidden();
  }
}
function getTips() {
  var tipsBox = document.getElementById("tipsBox");
  var ipt = document.getElementById("input");
  var bg = document.getElementById("bg");
  bg.onclick = function () {
    tipsBox.style.display = "none";
  }
  ipt.oninput = function () {
    if (ipt.value.trim() != "") {
      var lis = "";
      getRequest(ipt.value, function (rep) {
        if (rep.s == "") {
          tipsBox.style.display = "none";
          return;
        }
        rep.s.forEach((element, index) => {
          lis += `<li data-index=${index}>${element}</li>`;
        });
        tipsBox.innerHTML = "";

        tipsBox.innerHTML = lis;
        tipsBox.style.display = "block";

        clickTips(tipsBox);
        moveTips(tipsBox);
      });
    } else tipsBox.style.display = "none";
  };
}
function clickTips(tipsBox) {
  var lis = tipsBox.getElementsByTagName("li");
  for (var index = 0; index < lis.length; index++) {
    lis[index].onclick = function () {
      var value = `http://www.baidu.com/s?wd=${this.innerHTML}`;
      window.open(value, "_blank");
    };
  }
}
function moveTips(tipsBox) {
  var count = -1;
  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowDown":
        if (count >= 9) {
          count = -1;
        }
        count++;
        tipsBg(count, tipsBox);
        break;
      case "ArrowUp":
        if (count <= 0) {
          count = 10;
        }
        count--;
        tipsBg(count, tipsBox);
        break;
      case "Enter":
        keyWord(count, tipsBox);
        break;
      default:
        break;
    }
  };
}
function keyWord(count, tipsBox) {
  if (count < 0 && count > 9) return;
  var lis = tipsBox.getElementsByTagName("li");
  var value = `http://www.baidu.com/s?wd=${lis[count].innerHTML}`;
  window.open(value, "_blank");
}
function tipsBg(count, tipsBox) {
  if (tipsBox.style.display == "none") {
    return;
  }
  var lis = tipsBox.getElementsByTagName("li");
  console.log(count);
  for (var index = 0; index < lis.length; index++) {
    lis[index].style.backgroundColor = "transparent";
  }
  lis[count].style.backgroundColor = "rgba(255, 255, 255, 0.8)";
}
function getRequest(itpValue, callback) {
  var url = `http://112.74.44.5:33768/my/demjs/data.php?value=${itpValue}`;
  var xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
}
