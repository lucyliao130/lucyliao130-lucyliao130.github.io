/*=====================================
 * 2022-06-12 v2.1
 搭配 開發模板_v1.3_線上學員
=====================================*/

//------------------------------------- 1. GAS全域變數的方法
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
//------------------------------------- 2. 路由
var Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
}
Route.path("payment", payment);
//------------------------------------- 3. 宣告
var global, menu;


/*=====================================
  test
=====================================*/
// function test(){
//   let item = {
//     width: '3',
//     label: '姓名',
//     type: "text",
//     name: "name",
//     value: "",
//     valid: "required",
//     option: "單選1|單選2|單選3"
//   };

  // item['width']
  // item.width

// for(let i in item){
//   console.log(i + ':', item[i])
// }

// function test1(){
//   let item = {
//     width:'3',
//     label:'姓名',
//     type:'text',
//     name:'name',
//     value:'',
//     valid:'required',
//     option: '單選1|單選2|單選3'
//     };
//   let form_item='';
//   for(let i in item){
//   form_item += i + ':' + item[i] +'\n';
//   console.log(form_item);
//   }
// }

  // let form_item = [
  //   { width: '3',
  //     label: '姓名',
  //     type: "text",
  //     name: "name",
  //     value: "",
  //     valid: "required",
  //     option: ""
  //   },
  //   { width: '3',
  //     label: '網址',
  //     type: "url",
  //     name: "url",
  //     value: "",
  //     valid: "required",
  //     option: ""
  //   },
  //   { width: '3',
  //     label: 'EMAIL',
  //     type: "email",
  //     name: "email",
  //     value: "",
  //     valid: "",
  //     option: ""
  //   }]



  // console.log(form_item[0].label);

  // console.log(form_item[0]['label']);

// }

  /*=====================================
    Get
  =====================================*/
  function doGet(e) {
    //-------------------------------------取得全域變數
    global = get_global();
    //-------------------------------------menu子樣板
    menu = Sheet.render('menu', {global: global});
    // menu = get_menu();

    // let content = '';
    // let form = '';
    // for(let i in e.parameter){
    //   form += i + ':' + e.parameter[i] + '<br>';
    // }

    // let button = Sheet.render('button',{bg:'btn-success' , title:'返回表單' , message:'' , url:'' ,target:''});

    //--------------------------------------------------------管理員路由
    if (global['isAdmin'] === true) {
      //路由 全域變數
      Route.path("form_global", form_global);}

      Route.path("iframe",index); //嵌入網址
      Route.path("iframe_1",iframe_1); //嵌入網站

    //   //路由 結構管理
    //   Route.path("make_stru", make_stru);//新增 編輯 查詢
    //   Route.path("del_make_stru", del_make_stru);//刪除
    //   //路由 結構內容管理
    //   Route.path("make_stru_content", make_stru_content);//新增 編輯 查詢
    //   Route.path("del_make_stru_content", del_make_stru_content);//刪除

    //   //路由 產生器管理
    //   Route.path("make_source", make_source);//新增 編輯 查詢
    //   Route.path("del_make_source", del_make_source);//刪除

    //   //路由 產生器明細檔
    //   Route.path("make_source_content", make_source_content);//新增 編輯 查詢
    //   Route.path("del_make_source_content", del_make_source_content);//刪除

    //   //路由 原始碼
    //   Route.path("make", make);//

    //   //路由 樣板語法產生器
    //   Route.path("template", template);//
    //   //路由 iframe語法
    //   Route.path("iframe", iframe);//
    //   //路由 youtube全螢幕播放樣板處理
    //   Route.path("youtube", youtube);//
    // }
    //--------------------------------------------------------管理員路由 end

    if (Route[e.parameter.op]) {
      return Route[e.parameter.op](e);
    } else {
      return index(e);
    }
  }

  /*=====================================
    Post
  =====================================*/
  function doPost(e) {
    //-------------------------------------取得全域變數
    global = get_global();
    //-------------------------------------menu子樣板
    menu = Sheet.render('menu', { global: global });
    let content = '';

    // let form = '';
    // for (let i in e.parameter) {
    //   form += i + ': ' + e.parameter[i] + '<br>';
    // }

    // let button = Sheet.render("button", { bg: 'btn-success', title: '返回表單', message: '', url: 'e.parameter.callback_url', target: '' });
    // //-------------------------------------------- 動態訊息 url => 轉向
    // content += Sheet.render("show_message", { global: global, bg: 'bg-primary', title: '返回表單', message: form + button });

    // content += JSON.stringify(e);

    // // 主樣板
    // return Sheet.render('index', { content: content, menu: menu }, global['網站標題']);//bootstrap_table



    //--------------------------------------------------------管理員路由
    if (global['isAdmin'] === true) {

    }

    //--------------------------------------------------------管理員路由 end
    Route.path("payment",payment); //嵌入網址

    if (Route[e.parameter.op]) {
      return Route[e.parameter.op](e);
    } else {
      return index(e);
    }
  }


  /*=====================================
    get_menu
  =====================================*/
  function get_menu() {
    // 結構管理 主檔
    let make_stru = get_rows_make_stru();
    // 產生器管理 主檔
    let make_source = get_rows_make_source();
    //-------------------------------------menu子樣板
    return Sheet.render('menu', { global: global, make_stru: make_stru, make_source: make_source });
  }

//安裝程式 setup
function setup(){
  //變數存入指令碼屬性
  SCRIPT_PROP.setProperty("ssId",Sheet.getSs().getId());
  //管理員信箱
  SCRIPT_PROP.setProperty("adminEmail",Session.getActiveUser().getEmail());

  //建立全域變數
  create_global();

  //商品類別
  // create_prod_kind();

  //建立繳費通知單
  create_payment();
}



