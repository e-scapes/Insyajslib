//<editor-fold defaultstate="collapsed" desc="plugins">
(function($) {

    $.fn.drags = function(opt) {

        opt = $.extend({disabled: false, handle: "", cursor: "move"}, opt);
        var $el = this;
        var $handle = this;
        if (!opt.disabled) {


            if (opt.handle !== "") {
                $handle = this.find(opt.handle);
            }
            $handle.css('cursor', opt.cursor);
            return $handle.on("mousedown", function(e) {
                var $drag = $el.addClass('draggable');
                console.log($drag);
                var z_idx = $drag.css('z-index'),
                        drg_h = $drag.outerHeight(),
                        drg_w = $drag.outerWidth(),
                        pos_y = $drag.offset().top + drg_h - e.pageY,
                        pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                    $('.draggable').offset({
                        top: e.pageY + pos_y - drg_h,
                        left: e.pageX + pos_x - drg_w
                    }).on("mouseup", function() {
                        $el.removeClass('draggable').css('z-index', z_idx);
                    });
                });
                e.preventDefault(); // disable selection
            }).on("mouseup", function() {

                $el.removeClass('draggable');
            });
        } else {




        }


    }
})(jQuery);
//</editor-fold>

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
    if (IN.getType(o) === "class") {
        o = o.substr(1);
        r = document.getElementsByClassName(o)[0];
    } else if (IN.getType(o) === "id") {
        o = o.substr(1);
        r = document.getElementById(o)
    } else if (IN.getType(o) === "string") {
        r = document.getElementsByTagName(o)
    } else if (IN.getType(o) === "object") {
        r = o;
    }
    return r;
}

function positionFunction(ob, options) {

    var mytop = options['top'];
    var myleft = options['left'];
    var myright = options['right'];
    var mybottom = options['bottom'];
    var object = IN.getObject(ob);
    /***
     * 
     * @param {type} obj
     * @param {type} options [side=top, to="30px" ,offset="0px"]
     */
    this.objtoside = function() {
        object.style.left = options['left'] || "0px"
        object.style.bottom = options['bottom'] || "0px";
        object.style.top = options['top'] || "0px";
        object.style.right = options['right'] || "0px";



        if (options['to'] === "right") {
            object.style.width = options['size'] || "30px";
            object.style.left = "auto";
            object.style.right = options['offset'] || "0px";


        } else if (options['to'] === "left") {
            object.style.width = options['size'] || "30px";
            object.style.right = "auto";
            object.style.left = options['left'] || "0px";

        } else if (options['to'] === "bottom") {
            object.style.height = options['size'] || "30px";
            object.style.top = "auto";
            object.style.bottom = options['bottom'] || "0px";

        } else {
            object.style.height = options['size'] || "30px";
            object.style.bottom = "auto";
            object.style.top = options['top'] || "0px";


        }
        console.log(options);
        return object;
    }

    this.update = function() {
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

function setEventsActionsFunction(object, type, options) {

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
            var c = IN.setTag("canvas", {
                height: options['height'], width: options['width']


            });
            if (!object) {

                object = document.body;
            } else {

                object = IN.getObject(object);
            }

            object.appendChild(c);
            var ctx = c.getContext("2d");
            if (options['chartType'] === "line") {
//  window.myLine = new Chart(ctx).Line(options, {responsive: true});

            } else if (options['chartType'] === "radar") {

//  window.myRadar = new Chart(ctx).Radar(options, {responsive: true});

            } else if (options['chartType'] === "polarArea") {
//   window.myPolarArea = new Chart(ctx).PolarArea(options, {responsive: true});

            } else if (options['chartType'] === "pie") {
//  window.myPie = new Chart(ctx).Pie(options);

            } else if (options['chartType'] === "doughnut") {
// window.myDoughnut = new Chart(ctx).Doughnut(options, {responsive: true});

            } else {
//  window.myBar = new Chart(ctx).Bar(options, {responsive: true})

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
        var r = IN.setTag("input", options);
        r.setAttribute('type', type);
        if (options['value']) {
            r.setAttribute('value', options['value']);
        }
        return r;
    };
    this.createDate = function(selectore, options) {
        /* $(function () {
         $(selectore).datepicker(options);
         })*/
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
            var i = IN.xactions().uniqid();
            this.createDate("." + i, options);
            r.className = i + " i_date";
        }
        else if (type === "chart") {


            r = IN.setTag("div",
                    options);
            var c = new chartsFunction(r, options)._render();
        }

        else {
            r = this.renderInput(type, options);
        }


        return  r;
    };
    this.countener = function(databody, title, o) {

        var newDiv = IN.setTag("div", o);
        if (title) {
            var title = IN.setTag("label", {data: title})
            var alltitle = IN.setTag("div", {class: "e-title"});
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
        var all = IN.setTag("div", {});
        for (var i = 0; i < options.length; i++) {

            var t = this.input(options[i]['type'], options[i]);
            //parentClass
            if (options[i]['e_onclick']) {

                options[i]['e_onclick']['parentClass'] = parentClass;
                IN.setEvent(t, "onclick", options[i]['e_onclick']).do();
            }

            if (options[i]['e_onchange']) {

                options[i]['e_onchange']['parentClass'] = parentClass;
                IN.setEvent(t, "onchange", options[i]['e_onchange']).do();
            }

            if (options[i]['e_onload']) {

                options[i]['e_onload']['parentClass'] = parentClass;
                IN.setEvent(t, "onload", options[i]['e_onload']).do();
            }

            if (options[i]['e_onmouseout']) {

                options[i]['e_onmouseout']['parentClass'] = parentClass;
                IN.setEvent(t, "onmouseout", options[i]['e_onmouseout']).do();
            }

            if (options[i]['e_onkeydown']) {

                options[i]['e_onkeydown']['parentClass'] = parentClass;
                IN.setEvent(t, "onkeydown", options[i]['e_onkeydown']).do();
            }
            if (options[i]['e_onmouseover']) {

                options[i]['e_onmouseover']['parentClass'] = parentClass;
                IN.setEvent(t, "onmouseover", options[i]['e_onmouseover']).do();
            }






            var allinput = IN.setTag("div", {class: "e-input"});
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

//<editor-fold defaultstate="collapsed" desc="countener">

function countenerfunction(xtype, options) {

    var myid = IN.xactions().uniqid();
    this.data = function() {

        //<editor-fold defaultstate="collapsed" desc="vars">
        var wcolumns = 4;
        var barSize = 50;
        var titlebarheight = 30;
        var myheight = "50%";
        var mywidth = "50%";
        var barPosition = "";
        var headerPosition = "";
        var max = false;
        var maxLastheight = 0;
        var maxLastwidth = 0;
        var maxLasttop = 0;
        var maxLastleft = 0;
        var tack = false;
        var ismin = false;
        var lastheight = null;




        var actionsButtons = [
            {
                class: "fa fa-minus",
                name: "minusButton",
                onclick: function() {
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

            },
            {
                name: "fullscreenButton",
                class: "fa fa-square-o",
                onclick: function() {

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


            }, {
                name: "tackButton",
                class: "fa fa-thumb-tack", onclick: function() {
                    if (tack) {
                        tack = false;
                        IN.setEffect("drag", {
                            name: w,
                            cursor: "move",
                            handle: ".titlebar", disabled: false
                        })


                    } else {
                        tack = true;
                        IN.setEffect("drag", {
                            name: w, disabled: true
                        })
                    }
                }
            }, {
                name: "closeButton",
                class: "fa fa-times",
                onclick: function() {
                    w.parentElement.removeChild(w);
                }
            }
        ]





        if (options['wcolumns']) {
            wcolumns = options['columns'];
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


        var w = IN.setTag("div", {
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

            var panelid = IN.xactions().uniqid();
            var panelo = {
                class: xtype + "item " + panelid
            };
            if (xtype === "e-panels") {

                panelo.height = panelsoptions[i]['height'];
                panelo.width = panelsoptions[i]['width'];
            }

            var panel = IN.setTag("div", panelo);
            //<editor-fold defaultstate="collapsed" desc="titleBar">

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
            var title = IN.setTag("div", titleo);
            var body = IN.setTag("div", {
                class: xtype + "-content e-content"
            });
            if (panelsoptions[i]['title']) {
                var titledata = IN.setTag("div", {
                    class: xtype + "_title_data "
                });
                var spand = IN.setTag("span", {
                    data: panelsoptions[i]['title']
                });

                if (thisOptions['headerPosition'] === "right" || thisOptions['headerPosition'] === "left") {
                    spand.style.display = "block"
                    spand.style.transform = "rotateZ(90deg)";
                    spand.style.transformOrigin = "0 60%";
                    spand.style.minWidth = "100px";
                }


                titledata.appendChild(spand);
                title.appendChild(titledata);
            }


            //<editor-fold defaultstate="collapsed" desc="window-actions">



            var wactions = IN.setTag("div", {
                class: "e-window-actions"
            });
            wactions.style.position = "absolute ";
            wactions.style.bottom = 0 + "px";




            if (thisOptions['headerPosition'] === "right" || thisOptions['headerPosition'] === "left") {

                wactions.style.height = actionsButtons.length * 30 + "px";
                body.style.top = "0px";
                body.style.bottom = "0px";
            } else {
                wactions.style.width = actionsButtons.length * 30 + "px";
                wactions.style.right = 0 + "px";
                body.style.right = "0px";
                body.style.left = "0px";
            }





            var hoptins = {to: thisOptions['headerPosition'] || "top", size: titlebarheight + "px"};
            IN.setPosition(title, hoptins).objtoside();

            for (var bi = 0; bi < actionsButtons.length; bi++) {
                var thisbi = actionsButtons[bi];
                if (options[thisbi['name']] !== false) {
                    var me = IN.setTag("i", thisbi);
                    wactions.appendChild(me);
                }
            }

            //</editor-fold>




            //</editor-fold>

            title.appendChild(wactions);
            panel.appendChild(title);
            if (thisOptions['items']) {
                if (!thisOptions['itemColumns']) {
                    thisOptions['itemColumns'] = thisOptions['columns'];
                }
                body.appendChild(new html(thisOptions['items'], thisOptions['itemColumns'], panelid)._renderobject());
            }
            var mysize = titlebarheight;

            //<editor-fold defaultstate="collapsed" desc="toolBar">

            if (thisOptions['bar']) {
                var thisbarOtions = thisOptions['bar'] || null;
                var actionsbar = IN.setTag("div", {
                    class: xtype + "-actions-bar  actions-bar e-actions-bar "
                });
                actionsbar.style.position = "absolute ";
                barSize = thisbarOtions['width'] || barSize;

                if (!thisbarOtions['columns']) {
                    thisbarOtions['columns'] = thisOptions['columns'];
                }




                var barOffest = "0px";
                if (thisbarOtions['position'] === thisOptions['headerPosition']) {
                    barOffest = titlebarheight + "px";
                }
                var poptins = {to: thisbarOtions['position'] || "bottom", offset: barOffest, size: barSize + "px"};
                poptins[thisOptions['headerPosition']] = titlebarheight + "px";


                IN.setPosition(actionsbar, poptins).objtoside();


                actionsbar.appendChild(new html(thisbarOtions['items'], thisbarOtions['columns'], panelid)._renderobject());
                panel.appendChild(actionsbar);

                if (thisbarOtions['position'] === thisOptions['headerPosition']) {

                    mysize += barSize;
                }
            }




            if (thisOptions['headerPosition'] === "bottom") {
                body.style.bottom = mysize + "px";
                body.style.top = "0px";
            } else if (thisOptions['headerPosition'] === "left") {
                body.style.left = mysize + "px";
                body.style.right = "0px";
            } else if (thisOptions['headerPosition'] === "right") {
                body.style.right = mysize + "px";
                body.style.left = "0px";
            } else {
                body.style.top = mysize + "px";
                body.style.bottom = "0px";

            }

            //</editor-fold>

            panel.appendChild(body);
            //</editor-fold>
            w.appendChild(panel);
        }

        IN.setPosition(w, options).update();
        return w;
    }




    this._render = function() {
        var w = this.data();
        document.body.appendChild(w);
        IN.setPosition(w, options).update();
        $(function() {

            if (options['draggable'] !== false) {

                IN.setEffect("drag", {
                    name: w,
                    cursor: "move",
                    handle: ".titlebar", disabled: false
                })

            }
            if (options['resizable'] !== false) {
                //$(w).resizable(options);
            }

        })

    };
}
//</editor-fold>

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

function setEffectFunction(type, obj) {
    if (type === "drag" || type === "e-drag") {

        var $el = $(IN.getObject(obj.name));
        $el.drags(obj);
        $el.unbind($el.drags(obj));
        $el.off('drags');
    }
}


var IN = {
    setting: function() {

    },
    xcreate: function(xtype, options) {
        return new createfunction(xtype, options);
    },
    xactions: function(xtype, options) {
        return new actionsfunction(xtype, options);
    },
    setPosition: function(obj, options) {
        return new positionFunction(obj, options);
    },
    setTag: function(type, options) {
        return  setTagFunction(type, options);
    },
    setCanvas: function(options) {

    }, setEvent: function(obj, type, options) {
        return  new setEventsActionsFunction(obj, type, options);
    },
    getType: function(obj) {
        return  getTypeFunction(obj);
    },
    getObject: function(obj) {

        return  getObjectFunction(obj)
    },
    setEffect: function(type, obj) {

        return  setEffectFunction(type, obj);
    }
}
;