
var inp_date= '',time='',srcIp = "",dstIp = "",src_pre = "0",dst_pre = "0",date="",thold,tvalue,msg_result = "Search Result: ";
var original_table =[];

$(document).ready(function(){
    
    $("#dsp_btn").click(function(){

        if (!validData(1)) {console.log("error");return;} ;
        $.ajax(
        {url:getUrl(1),success:function(response){
                        console.log(1);
                        if (parseInt(response)==-1) alert("File Input_Error");
                        else{ 
                            $("#table_content").html(response);
                            original_table=document.getElementById("table_content").cloneNode(1);
                            document.getElementById("match_result").innerText = msg_result + String(original_table.childElementCount);

                          // console.log(original_table);
                        }
            },error:function(response){
                console.log("Error in request.\n");
            }
        });
    });


    $( "#global_filter" ).keyup(function(event) {
        //console.log(document.getElementById("global_filter").value.length);
        if (original_table.length==0) return;
        if((document.getElementById("global_filter").value).length==0){
            $("#table_content").html((original_table.cloneNode(1)).childNodes);
            //document.getElementById("match_result").innerText = msg_result + String(original_table.childElementCount);
            document.getElementById("match_result").innerText = "";
        }
       
    });
    $( "#global_filter" ).keypress(function(event) {
        //filterTable();
        if (event.which == 32) event.preventDefault();
        if (original_table.length==0) return;
        if(event.which == 13) {
            $( "#filter_submit_btn" ).trigger("click");
        }
    });

    $("#filter_submit_btn").click(function(){
        if (original_table.length==0) return;
        filterTable();
    });
    $("#updwn").click(function(){
            $("#main_content").fadeToggle(0);
        var menu_status_btn = $('#chlBtn').text() ;
        $("#chlBtn").text(
            (menu_status_btn == 'HIDE MENU'?'SHOW MENU':'HIDE MENU'));
    }),
        $("#main_menu").hover(function(){
                $(this).stop().css({"cursor" : "pointer"}) }),
        $("#second_menu_btn").click(function(){
                $("#axis_menu").fadeToggle(0);}),
        $("#second_menu_btn").hover(function(){
            $(this).stop().css({"cursor" : "pointer"})
        }) ;

    $(".ip").click(function(){
        alert('hai');
    });
});
$(function(){
        $( "#datepicker" ).datepicker({ 
            minDate: -2000, maxDate: "0"
        });
});

    $(function(){
        $('#timepicker').timepicker({showLeadingZero: true });
    });


function filterTable(){

        var user_input = document.getElementById("global_filter").value;
        var column = parseInt(document.getElementById("global_filter_menu").value);
        //console.log(document.getElementById("global_filter_menu"));
        var str = "",new_table = [];
        var row_index = 1;
        //var flow_table = document.getElementById("table_content");
        var flow_table = original_table.cloneNode(1);
        for (var i = 0 ; i  < flow_table.childElementCount-1 ; i++){
            str= flow_table.children[i].children[column].innerText;

            /* this condition is to match the first n characters of the user input
            with the string in the row.*/

            if (str.substring(0,user_input.length) == user_input){

            // this is to match any substring inside the string
            //if (str.search(user_input)!=-1){ 
                
                // console.log("str = "+str+"\n");
                // console.log(column);
                // console.log(typeof column);
                //console.log("row_index = "+row_index);
                //console.log("before = " + flow_table.children[i].children[0].innerText);
                flow_table.children[i].children[0].innerText = String(row_index);
                //console.log("after = " + flow_table.children[i].children[0].innerText);
                new_table.push(flow_table.children[i]); 
                //console.log("flow_table.children[i] = "+flow_table.children[i]);
                //console.log("index = " + flow_table.children[i].children[0].innerText);
                row_index++;
            }
        }
       
       
        if (new_table.length > 0){
             $("#table_content").html(new_table);
            document.getElementById("match_result").innerText = msg_result + String(new_table.length);
        }
        else $("#table_content").html("<div id = 'no_match' style = 'text-align:center;font-weight:bold;'>​No Match Result​</div>")
}
function validData(request_type){
    if (request_type == 1){
        time= document.getElementById('timepicker').value;
        inp_date=document.getElementById('datepicker').value;
        if (inp_date.length==0||time.length==0) return 0;
    }
    srcIp=document.getElementById('srcIp').value;
    dstIp=document.getElementById('dstIp').value;
    src_pre=document.getElementById('src_pre').value ;
    dst_pre=document.getElementById('dst_pre').value ;
    if (srcIp.length == 0)srcIp = "null" ;
    if (dstIp.length == 0)dstIp = "null";
    if (src_pre%8!=0||src_pre<0||src_pre>32||dst_pre%8!=0||dst_pre<0||dst_pre>32)return 0 ;

    return 1;
}

function getUrl(request_type){
    //if !(typeof request_type == "number" && (request_type >= 0 && request_type <= 1){
    if (request_type==0){
        return 'index.cgi?fromtoa='+inp_date+'&PARSE=1';
    }

    else if (request_type==1){
        return  'flow_list.cgi?srcIp='+srcIp+'&dstIp='+dstIp+'&src_pre='+src_pre+'&dst_pre='+dst_pre+'&time='+time+'&PARSE=1'+'&date='+inp_date;

    }
}
/*
var response;
function dspData(request_type)
{

    if (!validData(request_type))return ;
    clearCube() ;

    response=getResponse(getUrl(request_type));

    //console.log(response);
    //return ;
    if (parseInt(response)==-1){
        alert('Input_Error');
        return 0;
    }*/