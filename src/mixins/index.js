function supportStorage () {
    if (window.localStorage) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    'localStorage': {
        methods:{
            setCookie (name, value) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days*24*60*60*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
            },
            getCookie (name) {
                var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                  return unescape(arr[2]);
                } else {
                  return null;
                }
            },
            delCookie (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.getCookie(name);
                if(cval!=null) {
                  document.cookie = name + "="+cval+";expires="+exp.toGMTString();
                }
            },
            setStore(name, content){
                if (!name) {
                    return;
                } else {
                    if (typeof content !== 'string') {
                        content = JSON.stringify(content);
                    }
                    if (window.localStorage) {
                        window.localStorage.setItem(name, content);
                    } else {
                        this.setCookie(name, content);
                    }
                }
            },
            getStore(name){
              if (!name) {
                return;
              } else {
                if (supportStorage()) {
                    return window.localStorage.getItem(name);
                } else {
                    return this.getCookie(name);
                }
              }
            },
            removeStore(name) {
                if (!name) {
                    return;
                } else {
                    if (window.localStorage) {
                        window.localStorage.removeItem(name)
                    }
                }
            }
        }
    },
    // 异步
    'asynchronous':{
        methods:{
            ajax(obj){
                Vue.$vux.loading.show({
                    text: 'Loading...'
                })
                let type=obj.type||'get';
                let timeout= obj.timeout||1;
                if(type=='get'){
                    axios.get(
                        obj.url,
                        {timeout: timeout},
                        obj.data
                    )
                        .then((res)=>{
                            Vue.$vux.loading.hide();
                            obj.success&&obj.success(res)
                        })
                        .catch( (error)=>{
                            Vue.$vux.loading.hide();
                            console.log(error)
                            Vue.$vux.alert.show({
                                title: '提示',
                                content: 'Error！'
                            })
                        });
                }else{
                    axios.post(
                        obj.url,
                        {timeout: timeout},
                        obj.data
                    )
                        .then((res)=>{
                            this.$vux.loading.hide();
                            obj.success&&obj.success(res)
                        })
                        .catch( (error)=>{
                            this.$vux.loading.hide();
                            this.$vux.alert.show({
                                title: '提示',
                                content: 'Error！'
                            })
                        });
                }
            }
        }
    },
    // reg
    'reg':{
        methods:{
            // 个位数时前面添加0
            addZero(v) {
                v = v.toString();
                return v = v.length < 2 ? "0" + v : v;
            },
            // 匹配手机号码
            isTel(v) {
                var r = /^((13|14|15|17|18)){1}\d{9}$/;
                return r.test(v) ? true : false;
            },
            // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
            isAccount(v) {
                var r = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
                return r.test(v) ? true : false;
            },
            // 强密码(6-16位数字或字母，区分大小写，不能小于6位、递增、递减、同一字符、前3后3相同、手机后几位、指定弱密码、包含弱密码)
            isStrPsd (i, t, x) {
                var CheckResult = function () {
                        this.Code = "9999";
                        this.Desc = "未知"
                    },
                    DefaultWeakPwds = ["888999", "111666", "aaabbb", "aaaccc"],
                    IncledeWeakPwds = ["123456"],
                    ValidatePwd = function (i, t) { //密码 手机号
                        var u = new CheckResult;
                        return (u = ValidatePwdLength(i), u.Code != "0") ? u : (u = ValidatePwdIsIncreasing(i), u.Code != "0") ? u : (u = ValidatePwdIsDecreasing(i), u.Code != "0") ? u : (u = ValidatePwdIsAllCharsEquals(i), u.Code != "0") ? u : (u = ValidatePwdIsIncluded(i, t, 6), u.Code != "0") ? u : (u = ValidatePwdIsBESame(i, 6), u.Code != "0") ? u : (u = ValidatePwd_Case_07(i, 6), u.Code != "0") ? u : (u = ValidatePwdIsDefaultWeakPwd(i), u.Code != "0") ? u : (u = ValidatePwdIsIncledeWeakPwd(i), u.Code != "0") ? u : (u.Code = "0", u.Desc = "密码符合规则", u)
                    },
                    ValidatePwdLength = function (i) { //密码
                        var t = new CheckResult;
                        return t.Code = "9999", t.Desc = "未知", i == null || i == undefined || i.toString().length < 6 ? (t.Code = "1", t.Desc = "密码长度小于6位") : (t.Code = "0", t.Desc = "密码长度大于或等于6位"), t
                    },
                    ValidatePwdIsIncreasing = function (i) { //密码
                        var t = new CheckResult,
                            r, j;
                        for (t.Code = "2", t.Desc = "密码字符为连续递增", r = i.charCodeAt(0), j = 0; j < i.length; j++)
                            if (j > 0 && (r++, i.charCodeAt(j) != r)) return t.Code = "0", t.Desc = "密码符合规则", t;
                        return t
                    },
                    ValidatePwdIsDecreasing = function (i) { //密码
                        var t = new CheckResult,
                            r, j;
                        for (t.Code = "3", t.Desc = "密码字符为连续递减", r = i.charCodeAt(0), j = 0; j < i.length; j++)
                            if (j > 0 && (r--, i.charCodeAt(j) != r)) return t.Code = "0", t.Desc = "密码符合规则", t;
                        return t
                    },
                    ValidatePwdIsAllCharsEquals = function (i) { //密码
                        var t = new CheckResult,
                            r, i, u,j;
                        for (t.Code = "4", t.Desc = "密码字符为同一字符", r = i.charCodeAt(0), j = 0; j < i.length; j++)
                            if (j > 0 && (u = i.charCodeAt(j), r != u)) return t.Code = "0", t.Desc = "密码符合规则", t;
                        return t
                    },
                    ValidatePwdIsIncluded = function (i, t, l) { //密码 手机 后几位
                        var r = new CheckResult;
                        t = !t ? "" : t;
                        return (r.Code = "5", r.Desc = "密码为手机号的后" + l + "位", i.length != l || t.length <= l) ? (r.Code = "0", r.Desc = "密码符合规则", r) : i != t.substr(t.length - l, l) ? (r.Code = "0", r.Desc = "密码符合规则", r) : r
                    },
                    ValidatePwdIsBESame = function (i, l) { //密码 6位
                        var t = new CheckResult,
                            r;
                        return (t.Code = "6", t.Desc = "密码前三位后三位相同", i.length != l || l % 2 != 0) ? (t.Code = "0", t.Desc = "密码符合规则", t) : (r = i.substr(0, l / 2), r = r + r, i != r) ? (t.Code = "0", t.Desc = "密码符合规则", t) : t
                    },
                    ValidatePwd_Case_07 = function (i, l) { //密码
                        var t = new CheckResult,
                            u, r;
                        if (t.Code = "7", t.Desc = "密码是弱密码#7", i.length != l || l % 2 != 0) return t.Code = "0", t.Desc = "密码符合规则", t;
                        for (u = i.charCodeAt(0), r = 0; r < i.length / 2; r++)
                            if (r > 0 && (u++, i.charCodeAt(r) != u) || i.charCodeAt(r) != i.charCodeAt(i.length - 1 - r)) return t.Code = "0", t.Desc = "密码符合规则", t;
                        return t
                    },
                    ValidatePwdIsDefaultWeakPwd = function (i) { //密码
                        var t = new CheckResult,
                            j;
                        for (t.Code = "0", t.Desc = "密码符合规则", j = 0; j < DefaultWeakPwds.length; j++)
                            if (DefaultWeakPwds[j] == i) {
                                t.Code = "9001";
                                t.Desc = "密码为指定弱密码#9001";
                                break
                            }
                        return t
                    },
                    ValidatePwdIsIncledeWeakPwd = function (i) { //密码
                        var t = new CheckResult,
                            j;
                        for (t.Code = "0", t.Desc = "密码符合规则", j = 0; j < IncledeWeakPwds.length; j++)
                            if (i.indexOf(IncledeWeakPwds[j]) >= 0) {
                                t.Code = "9002";
                                t.Desc = "密码为包含弱密码#9002";
                                break
                            }
                        return t
                    };
                x = ValidatePwd(i, t)
                return x
            }
        }
    },
    // link
    'link':{
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    },

    'util': {
        methods: {
            hasClass (ele, cls) { 
                return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
            },
            
            addClass (ele, cls) { 
                if (!this.hasClass(ele, cls)) ele.className += " "+cls;
            },
            
            removeClass (ele, cls) {
                if (this.hasClass(ele, cls)) {
                    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                    ele.className = ele.className.replace(reg, ' ');
                }
            },

            // 根据id找到数组里面的json对象 相互嵌套式
            getJson (id, arr, index) {
                if (arr && id && arr.length > 0) {
                    for (let i=0;i<arr.length;i++) {
                        if (arr[i].id == id) {
                            return arr[i];
                        }
                    }
                    if (!index && index != 0) {
                        index == 0;
                    } else {
                        index ++;
                    }
                    this.getJson(id, arr[index].childrens, name, index);
                }
            }
        }
        
    }
};
