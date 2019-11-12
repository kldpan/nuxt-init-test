import Vue from "vue"
import axios from "axios"


class Apis  {
    getTestData(){
        axios({
            method:"GET",
            url:"/json1811.ashx?v=1572782189825"
        }).then((res)=>{
            console.log(res);
        })
    };
    
}


Vue.prototype.$apis=new Apis();