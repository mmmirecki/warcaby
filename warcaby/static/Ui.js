class Ui{
    constructor(){
        console.log("ui")
        this.login()
    }
    
    login(){
        $("#login").on("click",function(){
            //console.log($("#login"));
            net.loginClicked($("#name")[0].value);
        })
        $("#reset").on("click",function(){
            //console.log($("#login"));
            net.reset();
        })
    }
}