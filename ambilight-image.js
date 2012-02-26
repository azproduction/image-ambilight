(function (maskImage){
    if ("\v" == "v") return;
    function makeLight(target) {
        var paletWidth = 1;
        var paletHeight = 8;
        var abmiWidth = target.width + 400;
        var targetParent = target.parentNode;
        var abmiHeight = target.height;
        var field = document.getElementById('ambilight-field');
        if (!field) {
            field = document.createElement('canvas');
            field.setAttribute('width', paletWidth);
            field.setAttribute('height', paletHeight);
            field.setAttribute('id', 'ambilight-field');
            field.style.position = 'absolute';
            field.style.left = '-10000px';
            field.style.top = '-10000px';
            document.body.appendChild(field);
        }

        targetParent.innerHTML =
        '<canvas width="' + abmiWidth + '" height="' + abmiHeight + '" style="position: absolute; z-index: -1; margin-left: -200px; display:none;"></canvas>' +
        targetParent.innerHTML;
        var targetCanvas = targetParent.firstChild;
        var devider = 4;

        var img = new Image();
        img.onload = function(){
            var ctx = field.getContext('2d');
            var ctx2 = targetCanvas.getContext('2d');

            ctx.drawImage(target, 0, 0, target.width/devider, target.height, 0, 0, paletWidth, paletHeight);
            ctx2.drawImage(field, 0, 0, paletWidth, paletHeight, 0, 0, abmiWidth/3, abmiHeight);

            ctx.drawImage(target, target.width - target.width/devider, 0, target.width/devider, target.height, 0, 0, paletWidth, paletHeight);
            ctx2.drawImage(field, 0, 0, paletWidth, paletHeight, 2 * abmiWidth/3, 0, abmiWidth/2, abmiHeight);

            ctx2.drawImage(this, 0, 0, 250, 700, 0, 0, 250, abmiHeight);
            ctx2.drawImage(this, 250, 0, 250, 700, abmiWidth - 250, 0, 250, abmiHeight);
        }

        targetParent.onmouseover = function() {
            targetCanvas.style.display = "";
        }
        targetParent.onmouseout = function() {
            targetCanvas.style.display = "none";
        }

        img.src = maskImage;
    }
        
    var images = document.querySelectorAll(document.getElementById('ambilight-script').getAttribute('rel'));

    for (var i = 0; i< images.length; i++) {
        var tmpImage = new Image();
        tmpImage.onload = (function(element){
            return function () {
                makeLight(element);
            }
        })(images[i]);
        tmpImage.src = images[i].getAttribute('src');
    }
})('./img/mask.png');