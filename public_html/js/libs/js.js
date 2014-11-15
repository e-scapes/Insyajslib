
$(function() {
    IN.xcreate("window", {
        x: "center",
        y: "center",
        height: "400px",
        width: "400px",
        title: "this is test2",
        headerPosition: "top"
        , items: [
            {
                columns: 2,
                name: "test",
                type: "text",
                value: "a1"
            },
            {
                name: "test2",
                type: "text",
                value: "a2",
                title: "mydata",
                titlePosition: "bottom"
            }
        ],
      /*  bar: {     
            position:"top",
             columns: 2,
            items: [
                {
                    columns: 2,
                    name: "test",
                    type: "button",
                    value: "a1"
                },
                { columns: 2,
                    name: "test2",
                    type: "button",
                    value: "a2",onclick:function(a){
                        alert (a);
                        
                    }
                  
                }]


        }*/

    });
})
     