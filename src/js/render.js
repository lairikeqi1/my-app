let fs = require('fs')
console.log(fs)
fs.writeFile('input.txt', '将hello world写入到input.txt文件', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('写入完毕')
  }
})
let btn = document.querySelector('button')
let i = 0
btn.onclick = function () {
  i++
  fs.writeFile(`input${i}.txt`, '按钮写入的内容', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('写入完毕')
    }
  })
}

// 拖动事件
let holder = document.querySelector('#holder')
let readList = document.querySelector('#readList')
holder.addEventListener('drop', (e) => {
  e.preventDefault() //阻止默认行为
  e.stopPropagation() //阻止冒泡
  console.log(e)
  for (const file of e.dataTransfer.files) {
    console.log(file)
    console.log('文件路径：', file.path)
    fs.readFile(file.path,(err,data)=>{
      if(err){
        console.log(err);
      }else{
        let newDiv = document.createElement('div')
        newDiv.className='readFile'
        newDiv.innerHTML=`
          <h3>${file.name}</h3>
          <pre>${data}</pre>
        `
        readList.appendChild(newDiv)
      }
    })
  }
})
holder.addEventListener('dragover', (e) => {
  e.preventDefault() //阻止默认行为
  e.stopPropagation() //阻止冒泡
})

// webview
 let webview = document.querySelector('webview')
 webview.addEventListener('did-start-loading',()=>{
   console.log('正在加载中。。。。');
 })
 webview.addEventListener('did-stop-loading',()=>{
  console.log('加载完毕。。。。');
  console.log([webview]);
  webview.insertCSS(`#su{background:red !important;}`)
  webview.executeJavaScript(`
    setTimeout(()=>{
      let input=document.querySelector('#kw')
      let btn=document.querySelector('#su')
      input.value='老陈打码'
      btn.click() 
    },2000)
  `)
})