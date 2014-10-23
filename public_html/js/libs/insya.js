//<editor-fold defaultstate="collapsed" desc="helper">

function getTypeFunction(o) {


    /*
     Undefined	"undefined"
     Null	"object" (see below)
     Boolean	"boolean"
     Number	"number"
     String	"string"
     Symbol (new in ECMAScript 6)	"symbol"
     Host object (provided by the JS environment)	Implementation-dependent
     Function object (implements [[Call]] in ECMA-262 terms)	"function"
     Any other object	"object"
     */

    var type = typeof o;
    var r = type;
    if (type === "string") {
        var f = o.charAt(0);
        if (f === ".") {
            r = "class";
        } else if (f === "#") {
            r = "id";
        }

    }


    return r;
}

function getObjectFunction(o) {
    var r = null;
    if (ESX.getType(o) === "class") {
        o = o.substr(1);
        r = document.getElementsByClassName(o)[0];
    } else if (ESX.getType(o) === "id") {
        o = o.substr(1);
        r = document.getElementById(o)
    } else if (ESX.getType(o) === "string") {
        r = document.getElementsByTagName(o)
    } else if (ESX.getType(o) === "object") {
        r = o;
    }
    return r;
}

function positionFunction(ob, options) {

    var mytop = options['top'];
    var myleft = options['left'];
    var myright = options['right'];
    var mybottom = options['bottom'];
    var object = ESX.getObject(ob);
    //<editor-fold defaultstate="collapsed" desc="Y options">
    if (options['y'] === "top") {
        mytop = "1px";
        mybottom = "auto";
    } else if (options['y'] === "bottom") {

        mybottom = "1px";
        mytop = "auto";
    } else if (options['y'] === "center") {


        var inH = (object.offsetHeight / 2);
        var oH = (window.innerHeight / 2);
        mytop = oH - inH + "px";
        mybottom = "auto";
    } else {
        if (options['bottom']) {

            mybottom = options['bottom'];
        }
        if (options['top']) {
            mytop = options['top'];
        } else if (options['y']) {
            mytop = options['y'];
        }

    }
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="X Options">

    if (options['x'] === "left") {
        myleft = "1px";
        myright = "auto";
    } else if (options['x'] === "right") {
        myright = "1px";
        myleft = "auto";
    }
    else if (options['x'] === "center") {


        var inW = (object.offsetWidth / 2);
        var oW = (window.innerWidth / 2);
        myleft = oW - inW + "px";
        myright = "auto";
    }

    else {
        if (options['right']) {
            myright = options['right'];
        }
        if (options['left']) {
            myleft = options['left'];
        } else if (options['x']) {
            myleft = options['x'];
        }


    }

//</editor-fold>


    object.style.left = myleft;
    object.style.right = myright;
    object.style.bottom = mybottom;
    object.style.top = mytop;
    object.style.position = "fixed";
    return object;
}

function setTagFunction(type, options) {

    var r = document.createElement(type);
    if (options['name']) {
        r.setAttribute('name', options['name']);
        r.setAttribute('id', options['name']);
    }

    if (options['style']) {
        r.setAttribute('style', options['style']);
    }
    if (options['height']) {
        r.style.height = options['height'];
    }
    if (options['width']) {
        r.style.width = options['width'];
    }

    if (options['class']) {
        r.setAttribute('class', options['class']);
    }

    if (options['data']) {
        r.innerHTML = options['data'];
    }
    if (options['onclick']) {
        r.onclick = options['onclick'];
        // this.parentElement.removeChild(this);

    }
    return r;
}

function seteventsActionsFunction(object, type, options) {

    function  getData() {
        var r = {};
        var s = "." + options['parentClass'];
        $(s + " input ," + s + " select ," + s + " textarea").each(function() {
            var name = $(this).attr("name");
            if ($(this).val()) {
                r[name] = $(this).val();
            }
        })
        return r;
    }



    function eventaciotns() {
        var jqxhr = null;
        if (options['type'] === "send") {
            var jqxhr = $.ajax({
                type: "POST",
                url: options['url'],
                data: getData()
            }).done(options['done']).fail(options['fail']).always(options['complete']);

        }

        return jqxhr;

    }


    this.do = function() {
        if (type === "onclick") {
            if (typeof options === "function") {
                object.onclick = options;
            } else {
                object.onclick = function() {
                    eventaciotns();
                };
            }

        } else if (type === "onchange") {
            if (typeof options === "function") {
                object.onchange = options;
            } else {
                object.onchange = function() {
                    eventaciotns();
                };
            }

        } else if (type === "onload") {
            if (typeof options === "function") {
                object.onload = options;
            } else {
                object.onload = function() {
                    eventaciotns();
                };
            }

        } else if (type === "onmouseout") {
            if (typeof options === "function") {
                object.onmouseout = options;
            } else {
                object.onmouseout = function() {
                    eventaciotns();
                };
            }

        } else if (type === "onkeydown") {
            if (typeof options === "function") {
                object.onmouseout = options;
            } else {
                object.onkeydown = function() {
                    eventaciotns();
                };
            }

        } else if (type === "onmouseover") {
            if (typeof options === "function") {
                object.onmouseover = options;
            } else {
                object.onmouseover = function() {
                    eventaciotns();
                };
            }

        }






    }



}

function setCanvasFunction(options) {



    var c = ESX.setTag("canvas", options);
    var Context = c.getContext("2d");
    if (options['height']) {
        c.height = options['height'];
    }
    if (options['width']) {
        c.width = options['width'];
    }
    Context.save();
    Context.translate(3, 10);
    // r.rotate(20 * Math.PI / 180);
    Context.rotate(Math.PI / 2);
    Context.fillText(options['data'], 1, 1);
    Context.fillStyle = 'blue';
    return c;
}



//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="chrts">

function chartsFunction(object, options) {
    
    this._render = function() {
        window.onload = function() {
            
            
            
            
            if (!options['width']) {
                
                options['width'] = "200px";
            }
            
            if (!options['height']) {
                
                options['height'] = "200px";
            }
            var c = ESX.setTag("canvas", {
                height: options['height'], width: options['width']
                
                
            });
            
            
            if (!object) {
                
                object = document.body;
            } else {
                
                object = ESX.getObject(object);
                
            }
            
            object.appendChild(c);
            
            var ctx = c.getContext("2d");
            
            if (options['chartType'] === "line") {
                window.myLine = new Chart(ctx).Line(options, {responsive: true});
                
            } else if (options['chartType'] === "radar") {
                
                window.myRadar = new Chart(ctx).Radar(options, {responsive: true});
                
            } else if (options['chartType'] === "polarArea") {
                window.myPolarArea = new Chart(ctx).PolarArea(options, {responsive: true});
                
            } else if (options['chartType'] === "pie") {
                window.myPie = new Chart(ctx).Pie(options);
                
            } else if (options['chartType'] === "doughnut") {
                window.myDoughnut = new Chart(ctx).Doughnut(options, {responsive: true});
                
            } else {
                window.myBar = new Chart(ctx).Bar(options, {responsive: true})
                
            }
        };
    }
}

//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="html">

function html(options, cols, parentClass) {

    var oneCol = 0;
    if (cols) {

        oneCol = ((100 - cols) / cols);
    }


    this.renderInput = function(type, options) {
        var c = type;
        if (options['class']) {
            c += " " + options['class'];
        }
        options['class'] = c;

        var r = ESX.setTag("input", options);

        r.setAttribute('type', type);

        if (options['value']) {
            r.setAttribute('value', options['value']);
        }
        return r;
    };


    this.createDate = function(selectore, options) {
        $(function() {
            $(selectore).datepicker(options);
        })
    };



    this.input = function(type, options) {
        var r = "";
        if (type === "label") {
        } else if (type === "table") {
        } else if (type === "lable" || type === "div") {

            r = this.tag(type, options);
        }
        else if (type === "date") {
            r = this.renderInput("text", options);
            var i = ESX.xactions().uniqid();
            this.createDate("." + i, options);
            r.className = i + " i_date";
        }
        else if (type === "chart") {


            r = ESX.setTag("div",
                    options);



            var c = new chartsFunction(r, options)._render();

        }

        else {
            r = this.renderInput(type, options);
        }


        return  r;
    };



    this.countener = function(databody, title, o) {

        var newDiv = ESX.setTag("div", o);
        if (title) {
            var title = ESX.setTag("label", {data: title})
            var alltitle = ESX.setTag("div", {class: "e-title"});
            alltitle.appendChild(title);
            newDiv.appendChild(alltitle);
        }
        newDiv.appendChild(databody);
        return  newDiv;
    };


    this._renderhtml = function() {
        return this._renderobject().outerHTML;
    };


    this._renderobject = function() {
        var all = ESX.setTag("div", {});

        for (var i = 0; i < options.length; i++) {

            var t = this.input(options[i]['type'], options[i]);

            //parentClass
            if (options[i]['e_onclick']) {

                options[i]['e_onclick']['parentClass'] = parentClass;
                ESX.setEvent(t, "onclick", options[i]['e_onclick']).do();
            }

            if (options[i]['e_onchange']) {

                options[i]['e_onchange']['parentClass'] = parentClass;
                ESX.setEvent(t, "onchange", options[i]['e_onchange']).do();
            }

            if (options[i]['e_onload']) {

                options[i]['e_onload']['parentClass'] = parentClass;
                ESX.setEvent(t, "onload", options[i]['e_onload']).do();
            }

            if (options[i]['e_onmouseout']) {

                options[i]['e_onmouseout']['parentClass'] = parentClass;
                ESX.setEvent(t, "onmouseout", options[i]['e_onmouseout']).do();
            }

            if (options[i]['e_onkeydown']) {

                options[i]['e_onkeydown']['parentClass'] = parentClass;
                ESX.setEvent(t, "onkeydown", options[i]['e_onkeydown']).do();
            }
            if (options[i]['e_onmouseover']) {

                options[i]['e_onmouseover']['parentClass'] = parentClass;
                ESX.setEvent(t, "onmouseover", options[i]['e_onmouseover']).do();
            }






            var allinput = ESX.setTag("div", {class: "e-input"});
            allinput.appendChild(t);




            if (options[i]['columns'] && options[i]['columns'] !== cols) {

                options[i]['width'] = (options[i]['columns'] * oneCol) + "%";

                var m = (options[i]['columns'] / 2);

                var s = " float:left; margin-left:" + m + "%;margin-right:" + m + "%;";

                if (options[i]['style']) {
                    options[i]['style'] += " ;" + s;
                } else {
                    options[i]['style'] = s;

                }

            } else {
                var m = "1";
                var s = " clear:both; width:96%; margin-left:" + m + "%;margin-right:" + m + "%;";

                if (options[i]['style']) {
                    options[i]['style'] += " ;" + s;
                } else {
                    options[i]['style'] = s;

                }
            }



            if (options[i]['class']) {
                options[i]['class'] += " e-input-block";
            } else {
                options[i]['class'] = " e-input-block";
            }

            if (options[i]['titlePosition']) {
                options[i]['class'] += " e-title-position-" + options[i]['titlePosition'];
            }

            var o = {class: options[i]['class'], width: options[i]['width'], style: options[i]['style']};

            all.appendChild(this.countener(allinput, options[i]['title'], o));
        }
        return all;
    };
}
//</editor-fold>

function countenerfunction(xtype, options) {

    var myid = ESX.xactions().uniqid();
    this.data = function() {

        //<editor-fold defaultstate="collapsed" desc="vars">
        var wcolumns = 4;
        var barheight = 30;
        var titlebarheight = 30;
        var myheight = "50%";
        var mywidth = "50%";
        var barPosition = "";
        var headerPosition = "";

        if (options['wcolumns']) {
            wcolumns = options['columns'];
        }

        if (options['barHeight']) {
            barheight = options['barheight'];
        }

        if (options['titlebarheight']) {
            titlebarheight = options['titlebarheight'];
        }

        if (options['height']) {
            myheight = options['height'];
        }

        if (options['width']) {
            mywidth = options['width'];
        }
        if (!options['barPosition'])
        {
            options['barPosition'] = "bottom";

        }

        if (!options['headerPosition'])
        {
            options['headerPosition'] = "top";

        }



        if (options['headerPosition']) {

            headerPosition = " e-headerPosition-" + options['headerPosition'];
        }

        if (options['barPosition']) {

            barPosition = " e-barPosition-" + options['barPosition'];
        }



        //</editor-fold>


        var w = ESX.setTag("div", {
            height: myheight,
            width: mywidth,
            class: xtype + " e-countener " + myid + headerPosition + barPosition
        });


        var panelsoptions = [];








        if (options['panels'])
        {
            panelsoptions = options['panels'];


        } else {
            panelsoptions[0] = options;

        }



        for (var i = 0; i < panelsoptions.length; i++) {


            //<editor-fold defaultstate="collapsed" desc="panels">

//panelsoptions[i]['headerPosition']
            if (!panelsoptions[i]['headerPosition']) {
                panelsoptions[i]['headerPosition'] = options['headerPosition'];



            }

            if (!panelsoptions[i]['barPosition']) {
                panelsoptions[i]['barPosition'] = options['barPosition'];



            }

            if (!panelsoptions[i]['columns']) {
                panelsoptions[i]['columns'] = wcolumns;



            }

            var thisOptions = panelsoptions[i];


            var panelid = ESX.xactions().uniqid();

            var panelo = {
                class: xtype + "item " + panelid
            };

            if (xtype === "e-panels") {

                panelo.height = panelsoptions[i]['height'];
                panelo.width = panelsoptions[i]['width'];

            }




            var panel = ESX.setTag("div", panelo);

            //<editor-fold defaultstate="collapsed" desc="titilbar">

            var titleo = {
                class: xtype + "_title titlebar e-titlebar"
            };

            if (xtype === "e-accordion") {
                titleo.onclick = function(e) {
                    //alert(document.getElementsByClassName(myid)[0].getElementsByClassName("e-accordionitem").length);

                    var eitems = document.getElementsByClassName(myid)[0].getElementsByClassName("e-accordionitem");
                    for (var r = 0; r < eitems.length; r++) {

                        eitems[r].getElementsByClassName("e-content")[0].style.display = "none";

                        eitems[r].getElementsByClassName("e-actions-bar")[0].style.display = "none";


                        eitems[r].style.height = titlebarheight + "px";

                    }

                    this.parentNode.getElementsByClassName("e-content")[0].style.display = "block";
                    this.parentNode.getElementsByClassName("e-actions-bar")[0].style.display = "block";


                    this.parentNode.style.height = (this.parentNode.parentNode.offsetHeight - titlebarheight) + "px";

                };
            }
            var title = ESX.setTag("div", titleo);

            var body = ESX.setTag("div", {
                class: xtype + "-content e-content"
            });

            if (panelsoptions[i]['title']) {
                var titledata = ESX.setTag("div", {
                    class: xtype + "_title_data "
                });
                var spand = ESX.setTag("span", {
                    data: panelsoptions[i]['title']
                });
                titledata.appendChild(spand);
                title.appendChild(titledata);
            }


            //<editor-fold defaultstate="collapsed" desc="window-actions">

            var wactions = ESX.setTag("div", {
                class: "e-window-actions"
            });
            if (options['minusButton'] !== false) {

                var ismin = false;
                var lastheight = null;
                var titlebtminus = ESX.setTag("i", {
                    class: "fa fa-minus",
                    onclick: function() {

                        console.log(thisOptions);
                        if (ismin) {
                            ismin = false;


                            if (thisOptions['headerPosition'] === "right" || thisOptions['headerPosition'] === "left") {
                                w.style.width = lastheight + "px";
                            } else {
                                w.style.height = lastheight + "px";
                            }



                        } else {
                            ismin = true;
                            if (thisOptions['headerPosition'] === "right" || thisOptions['headerPosition'] === "left") {
                                lastheight = w.offsetWidth;
                                w.style.width = title.offsetWidth + "px";
                            } else {


                                lastheight = w.offsetHeight;
                                w.style.height = title.offsetHeight + "px";
                            }

                        }




                    }
                });
                wactions.appendChild(titlebtminus);
            }



            if (options['fullscreenButton'] !== false) {
                var max = false;
                var maxLastheight = 0;
                var maxLastwidth = 0;
                var maxLasttop = 0;
                var maxLastleft = 0;
                var titlebtmax = ESX.setTag("i", {
                    class: "fa fa-square-o", onclick: function() {

                        if (max) {
                            max = false;
                            w.style.height = lastheight + "px";
                            w.style.width = maxLastwidth;
                            w.style.height = maxLastheight;
                            w.style.top = maxLasttop;
                            w.style.left = maxLastleft;
                            w.style.right = "auto";
                            w.style.bottom = "auto";
                        } else {
                            max = true;
                            maxLastheight = w.style.height;
                            maxLastwidth = w.style.width;
                            maxLasttop = w.style.top;
                            maxLastleft = w.style.left;
                            w.style.width = "100%";
                            w.style.height = "100%";
                            w.style.top = "0px";
                            w.style.left = "0px";
                            w.style.right = "0px";
                            w.style.bottom = "0px";
                        }
                    }


                });
                wactions.appendChild(titlebtmax);
            }


            if (options['tackButton'] !== false) {
                var tack = false;
                var titlebttack = ESX.setTag("i", {
                    class: "fa fa-thumb-tack", onclick: function() {
                        if (tack) {
                            tack = false;
                            $(w).draggable({cursor: "move", handle: ".titlebar", disabled: false});
                        } else {
                            tack = true;
                            $(w).draggable({disabled: true});
                        }
                    }
                });
                wactions.appendChild(titlebttack);
            }
            if (options['closeButton'] !== false) {

                var titlebtclose = ESX.setTag("i", {
                    class: "fa fa-times", onclick: function() {
                        w.parentElement.removeChild(w);
                    }
                });
                wactions.appendChild(titlebtclose);
            }
            //</editor-fold>



            if (thisOptions['headerPosition'] === "bottom") {
                body.style.bottom = titlebarheight + "px";
                title.style.bottom = "0px";
                title.style.height = titlebarheight + "px";
                title.style.width = "100%";



            } else if (thisOptions['headerPosition'] === "left") {
                body.style.left = titlebarheight + "px";
                title.style.left = "0px"

                title.style.width = titlebarheight + "px";
                title.style.height = "100%";

            } else if (thisOptions['headerPosition'] === "right") {
                body.style.right = titlebarheight + "px";
                title.style.right = "0px"

                title.style.width = titlebarheight + "px";
                title.style.height = "100%";


            } else {
                body.style.top = titlebarheight + "px";
                title.style.top = "0px"
                title.style.height = titlebarheight + "px";
                title.style.width = "100%";
            }
            //</editor-fold>
            title.appendChild(wactions);
            panel.appendChild(title);





            if (thisOptions['items']) {
                if (!thisOptions['itemColumns']) {
                    thisOptions['itemColumns'] = thisOptions['columns'];
                }
                body.appendChild(new html(thisOptions['items'], thisOptions['itemColumns'], panelid)._renderobject());

            }

            //<editor-fold defaultstate="collapsed" desc="toolBar">

            if (thisOptions['bar']) {

                var actionsbar = ESX.setTag("div", {
                    class: xtype + "-actions-bar  actions-bar e-actions-bar "
                });


                actionsbar.style.position = "absolute ";

                if (thisOptions['barPosition'] === "bottom") {
                    if (thisOptions['headerPosition'] === "bottom") {
                        body.style.bottom = barheight + titlebarheight + "px";
                        actionsbar.style.bottom = titlebarheight + "px"
                    } else {
                        body.style.bottom = barheight + "px";
                        actionsbar.style.bottom = "0px";
                    }

                    actionsbar.style.width = "100%";
                } else if (thisOptions['barPosition'] === "left") {

                    if (thisOptions['headerPosition'] === "left") {
                        body.style.left = barheight + titlebarheight + "px";
                        actionsbar.style.left = titlebarheight + "px"

                    } else {
                        body.style.left = barheight + "px";
                        actionsbar.style.left = "0px";
                    }

                    actionsbar.style.height = "100%";
                } else if (thisOptions['barPosition'] === "right") {

                    if (thisOptions['headerPosition'] === "right") {
                        body.style.right = barheight + titlebarheight + "px";
                        actionsbar.style.right = titlebarheight + "px"
                    } else {
                        body.style.right = barheight + "px";
                        actionsbar.style.right = "0px";
                    }
                    actionsbar.style.height = "100%";
                } else {

                    if (thisOptions['headerPosition'] === "top") {
                        body.style.top = barheight + titlebarheight + "px";
                        actionsbar.style.top = titlebarheight + "px"

                    } else {
                        body.style.top = barheight + "px";
                        actionsbar.style.top = "0px";
                    }
                    actionsbar.style.width = "100%";
                }





                if (!thisOptions['barColumns']) {

                    thisOptions['barColumns'] = thisOptions['columns'];
                }

                actionsbar.appendChild(new html(thisOptions['bar'], thisOptions['barColumns'], panelid)._renderobject());
                panel.appendChild(actionsbar);



            }
            //</editor-fold>

            panel.appendChild(body);



            //</editor-fold>
            w.appendChild(panel);

        }

        ESX.setPosition(w, options);

        return w;
    }




    this._render = function() {
        var w = this.data();
        document.body.appendChild(w);
        ESX.setPosition(w, options);
        $(function() {

            if (options['draggable'] !== false) {
                $(w).draggable({cursor: "move", handle: ".titlebar"});
            }
            if (options['resizable'] !== false) {
                $(w).resizable(options);
            }

        })

    };
}

//<editor-fold defaultstate="collapsed" desc="create"> 
function createfunction(xtype, options) {
    var r = "";
    if (xtype === "html") {

        r = new html(options)._renderhtml();
    } else if (xtype === "e-window" || xtype === "e-tabs" || xtype === "window" || xtype === "tabs" ||
            xtype === "e-accordion" || xtype === "accordion" ||
            xtype === "e-panels" || xtype === "panels") {

        r = new countenerfunction(xtype, options)._render();
    } else if (xtype === "e-chart") {


        r = new chartsFunction(options["to"], options)._render();
    }
    return r;
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="actionsfunction">

function actionsfunction(xtype, options) {
    this.uniqid = function() {
        var ts = String(new Date().getTime()), i = 0, out = '';
        for (i = 0; i < ts.length; i += 2) {
            out += Number(ts.substr(i, 2)).toString(36);
        }
        return (out);
    }
    this.tooltip = function(selector, options) {
        $(selector).tooltip(options);
    }
}

//</editor-fold>





var ESX = {
    xcreate: function(xtype, options) {
        return createfunction(xtype, options);
    },
    xactions: function(xtype, options) {
        return new actionsfunction(xtype, options);
    },
    setPosition: function(obj, options) {
        return  positionFunction(obj, options);
    },
    setTag: function(type, options) {
        return  setTagFunction(type, options);
    },
    setCanvas: function(options) {
        return  setCanvasFunction(options);
    }, setEvent: function(obj, type, options) {
        return  new seteventsActionsFunction(obj, type, options);
    },
    getType: function(obj) {
        return  getTypeFunction(obj);
    },
    getObject: function(obj) {

        return  getObjectFunction(obj)
    }



};
$(function() {



    /*
     
     ESX.xcreate("window", {
     x: "center",
     y: "center",
     height: "200px",
     width: "200px",
     title: "this is test",
     headerPosition: "left"
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
     
     }),
     ESX.xcreate("window", {
     x: "center",
     y: "top",
     height: "200px",
     width: "200px",
     title: "this is test",
     headerPosition: "right"
     
     })
     */
    /*
     ESX.xcreate("window", {
     x: "right",
     y: "top",
     height: "200px",
     width: "200px",
     barPosition:"bottom",
     headerPosition:"bottom",
     title: "this is test aziz",
     columns:2
     ,bar: [
     {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1",
     e_onclick:function (){
     
     
     
     }
     
     }, {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }],
     items: [
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
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     titlePosition: "left"
     }
     ]
     
     })
     
     
     */
  /*  var randomScalingFactor = function() {
        return Math.round(Math.random() * 100)
    };

    ESX.xcreate("e-chart", {
        type: "radar",
        
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [5, 15, 25, 2, 4, 1, 5]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [5, 5, 5, 5, 5, 5, 5]
            }
        ]});*/



    ESX.xcreate("e-panels", {
        x: "left",
        y: "top",
        height: "300px",
        width: "60%",
        headerPosition: "top",
        barPosition: "bottom",
        panels: [
            {
                height: "100%",
                width: "50%",
                title: "this is test",
                itemColumns: 2,
                barColumns: 6,
                bar: [
                    {
                        columns: 2,
                        name: "button",
                        type: "button",
                        value: "a1"

                    }, {
                        columns: 2,
                        name: "button",
                        type: "button",
                        value: "a1"

                    }],
                items:
                        [
                            {
                                columns: 2,
                                name: "name",
                                type: "date",
                                value: "",
                                numberOfMonths: 3,
                                showButtonPanel: true

                            },
                            {
                                name: "test2",
                                type: "text",
                                value: "a2",
                                title: "mydata",
                                titlePosition: "right"
                            },
                            {
                                name: "test2",
                                type: "chart",
                                chartType:"radar",
                                labels: ["January", "February", "March", "April", "May", "June", "July"],
                                datasets: [
                                    {
                                        fillColor: "rgba(220,220,220,0.5)",
                                        strokeColor: "rgba(220,220,220,0.8)",
                                        highlightFill: "rgba(220,220,220,0.75)",
                                        highlightStroke: "rgba(220,220,220,1)",
                                        data: [5, 15, 25, 2, 4, 1, 5]
                                    },
                                    {
                                        fillColor: "rgba(151,187,205,0.5)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(151,187,205,0.75)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: [5, 5, 5, 5, 5, 5, 5]
                                    }
                                ]
                            },
                            {
                                name: "test2",
                                type: "text",
                                value: "a2",
                                title: "mydata",
                                titlePosition: "left"
                            }
                        ]
            }, {height: "100%",
                width: "50%",
                title: "this is test2",
                bar: [
                    {
                        columns: 2,
                        name: "button",
                        type: "button",
                        value: "a1"

                    }, {
                        columns: 2,
                        name: "button",
                        type: "button",
                        value: "a1"

                    }],
                items: [
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
                    },
                    {
                        name: "test2",
                        type: "text",
                        value: "a2",
                        title: "mydata",
                    },
                    {
                        name: "test2",
                        type: "text",
                        value: "a2",
                        title: "mydata",
                        titlePosition: "left"
                    }
                ]
            },
        ]

    })



    /*
     
     ESX.xcreate("e-accordion", {
     x: "left",
     y: "bottom",
     height: "200px",
     width: "200px",
     headerPosition: "bottom",
     barPosition: "bottom",
     panels: [
     {
     title: "this is test",
     bar: [
     {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }, {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }],
     items: [
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
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     titlePosition: "left"
     }
     ]
     }, {
     title: "this is test2",
     bar: [
     {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }, {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }],
     items: [
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
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     titlePosition: "left"
     }
     ]
     },
     ]
     
     })
     
     
     
     
     
     
     
     ESX.xcreate("window", {
     x: "left",
     y: "center",
     height: "200px",
     width: "200px",
     title: "this is test",
     barPosition: "left",
     bar: [
     {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1", e_onclick: function() {
     alert("ssssss");
     
     }
     
     }, {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1",
     e_onclick: {
     type: "getdata"
     
     }
     
     }],
     items: [
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
     })
     
     
     
     
     ESX.xcreate("tabs", {
     x: "right",
     y: "top",
     height: "200px",
     width: "200px",
     title: "this is test",
     headerPosition: "bottom",
     barPosition: "bottom",
     bar: [
     {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }, {
     columns: 2,
     name: "button",
     type: "button",
     value: "a1"
     
     }],
     items: [
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
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     },
     {
     name: "test2",
     type: "text",
     value: "a2",
     title: "mydata",
     titlePosition: "left"
     }
     ]
     
     })
     
     
     /*  $(".test").html(
     ESX.xcreate("html", {
     xtype: "date"
     , name: "name"
     , showButtonPanel: true
     }))*/

    //    $(".testinput").datepicker();



})
/*
 
 var items =  [
 {
 xtype: 'text',
 fieldLabel: 'First Name',
 name: 'firstName'
 
 },
 {
 xtype: 'checkbox',
 fieldLabel: 'Last Name',
 name: 'lastName'
 },
 {
 xtype: 'datefield',
 fieldLabel: 'Date of Birth',
 name: 'birthDate'
 }
 ];
 
 
 ESX.create('windows', {//Panel , massage ,tolltip
 title: 'User Form',
 height: 150,
 width: 300,
 bodyPadding: 10,
 theme:red,
 
 ,items,
 bar: [
 {
 xtype: 'button',
 fieldLabel: 'send',
 name: 'send'
 
 
 },
 {
 xtype: 'button',
 fieldLabel: 'cancel',
 name: 'cancel'
 }
 ]
 
 
 
 });
 
 
 ESC.create('button', {
 text: 'Click Me',
 listeners: {
 click: function() {
 ESC.Msg.alert('I was clicked!');
 },
 click: function() {
 ESC.Msg.alert('I was clicked!');
 }
 , click: function() {
 ESC.Msg.alert('I was clicked!');
 }
 }
 });
 
 
 
 
 ESC.Msg.alert('I was clicked!', {
 });
 
 
 
 
 
 ESC.define('session',
 {
 username: "#ismail",
 password: "3mrmosho",
 password: "3mrmosho",
 password: "3mrmosho",
 password: "3mrmosho",
 password: "3mrmosho",
 password: "3mrmosho"
 
 }
 )
 
 
 
 ESC.define('rquest',
 {
 //  xtype: "ajax",
 method: "post", //get
 url: "www.******.com",
 options: [
 {
 id: "1",
 name: "ismial"
 }
 ],
 succ: function(data) {
 
 
 },
 error: function(data) {
 
 
 }
 }
 )
 
 
 
 */