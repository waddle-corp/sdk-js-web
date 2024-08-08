(
    function (global, document) {
        var w = global;
        if (w.GentooIO) { 
            return w.console.error("GentooIO script included twice"); 
        }; 
        var fb = null; 
        var ge = function () { 
            ge.c(arguments); 
        }; 
        ge.q = []; 
        ge.c = function (args) { 
            ge.q.push(args) 
        }; 
        ge.process = function (args) { 
            var method = args[0]; 
            var params = args[1]; 
            if (method === 'boot') { 
                fb = new w.FloatingButton(params); 
            } else if (method === 'update') { 
                fb.updateParameter(params); 
            }; 
        }; 
        w.GentooIO = ge; 
        function l() { 
            if (w.GentooIOInitialized) { return }; 
            w.GentooIOInitialized = true; 
            var s = document.createElement("script"); 
            s.type = "text/javascript"; 
            s.async = true; 
            s.src = "/floating-button-sdk.js"; 
            s.onload = () => { 
                while (ge.q.length) { 
                    var args = ge.q.shift(); 
                    ge.process(args); 
                }; 
                var sc = document.getElementById('gentoo-sc'); 
                if (sc) { 
                    sc.addEventListener("scroll", handleScroll) 
                }; 
            }; 
            var x = document.getElementsByTagName("script")[0]; 
            if (x.parentNode) { 
                x.parentNode.insertBefore(s, x) 
            }; 
        }; 
        function handleScroll() { 
            var sc = document.getElementById('gentoo-sc'); 
            var st = sc.scrollTop; 
            var dh = sc.scrollHeight - sc.clientHeight; 
            var sp = st / dh; 
            if (sp >= 0.6) { 
                console.log('sp >= 0.6', st, dh, sp); 
                ge.process(['update', { type: 'needs' }]); 
                sc.removeEventListener('scroll', handleScroll); 
            } 
        }; 
        if (document.readyState === "complete") { 
            l(); 
        } else { 
            w.addEventListener("DOMContentLoaded", l); 
            w.addEventListener("load", l); 
        };
    }
)(window, document);