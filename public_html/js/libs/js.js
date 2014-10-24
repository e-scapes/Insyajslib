
$(function(){
IN.xcreate("window", {
    x: "center",
    y: "center",
    height: "200px",
    width: "200px",
    title: "this is test",
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
            titlePosition: "right"
        }
    ]

});
})
     