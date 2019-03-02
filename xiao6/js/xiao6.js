window.onload = function () {
    var getFileContent = function (fileInput, callback) { //读取文件   
        if (fileInput.files[0].size > 0) {
            var file = fileInput.files[0];//保存文件信息
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {//onloadend读取完成触发，无论成功或失败
                    if (evt.target.readyState == FileReader.DONE) {//readyState 属性返回当前文档的状态
                        callback(evt.target.result);
                    }
                };
                reader.readAsText(file, 'utf-8');//将文件读取为文本，编码方式默认为“UTF-8”，支持中文可改用“GBK”              
            }                                    //还可以多种编码方式，我没有深究，试过读取txt文件会出现乱码
        }
    };
    var upload = document.getElementById('upload');
    upload.onchange = function () {
        var content = document.getElementById('content');
        var change = document.getElementById('change');
        getFileContent(this, function (str) {
            content.value = str;//显示读取到的文件内容          
            var aPicture = str.replace(/!\[.*\]\((.+)\)/g, '<img src="$1"/>');//改变文件内容,此处用到正则表达式
            var aHyperlink = aPicture.replace(/.\[(.*)\]\((.+)\)/g, '<a href ="$2">$1</a>');//与上一行不可颠倒            
            change.innerHTML = aHyperlink;
            var aDownload = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>经解析的HTML</title>'
                + '<style> img{width:60%} </style></head><body>'
                + aHyperlink + '</body></html>'//想不出怎么动态添加html标签，就硬生生地添加了，生成html文件
            function download(filename, content) {//window.URL对象可以为Blob对象生成一个网络地址，
                //结合a标签的download属性，可以实现点击url下载文件
                var blob = new Blob([content], { type: 'text/html' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.style = "display: none";
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {//用setTimeout()延时一小段时间，让click()事件充分响应
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 5);
            }
            var a_download = document.getElementById('download');
            a_download.onclick = function () {//点击下载事件
                var filename = "xiao.html";
                var content = aDownload;
                download(filename, content);
            };
        })
    };
}