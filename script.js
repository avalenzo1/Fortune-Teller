// Form Selector
let form = $("#fortune-form");
let res = $(".future");

res.hide();

function range(_min, _max) {
    let min = _min;
    let max = _max;

    let _range = Math.random() * (max - min);
    _range = _range.toFixed();


    return parseInt(_range);
}

function predict() {
    let name = $(".name").val();
    let age = parseInt($(".age").val());
    let pet = $("input[name='animal']:checked").val();
    let waterWet = $("input[name='water']:checked").val();
    let favFood = $(".favFood").val();

    let predDate = new Date();
    predDate.setFullYear(predDate.getFullYear() + 50);
    predDate = predDate.getFullYear();

    let noOfPets = range(1, 5);

    let response;

    if (age <= 70 || (Math.random() <= 0.26 && age <= 72)) {
        response = `${name}, in the year ${predDate}, you will be ${(age + 50)}. `;
        response += `You will have ${(noOfPets === 0) ? 'no' : noOfPets} ${(noOfPets === 1) ? pet : pet + 's'}. `;
        if (waterWet === 'yes') {
            response += 'You will be fairly level-minded. ';
        } else {
            response += 'You will be an annoying conspiracy-nut, and probably think that aliens exist. L + Bozo + Ratio + You fell off + cope + Didn\'t ask + Joe Mama + Fatherless Behavior. ';
        }
        
        if (favFood) {
        	response += `You will be eating your favorite food, ${favFood}; Lucky you!`;
        }
        
    } else {
        response = `${name}, in the year ${predDate}, you will be dead. The End!`;
    }

    $(".future h1").append(response);
}

$("#fortune-form").submit(function(e) {
    e.preventDefault();

    $(".submit").html("<div class='load'></div>");
    form.css("cursor", "progress");

    predict();

    setTimeout(function() {
        form.fadeOut();

        setTimeout(function() {
            res.slideDown();
            $(document).css("cursor", "");
        }, 1000);
    }, 1000);
});

let verb = [
    ""
];

$(".btn").mousedown((e) => {
    let btn = e.currentTarget;
    let dimension = e.currentTarget.getBoundingClientRect();

    let cursor = {
        x: (e.clientX - dimension.x),
        y: (e.clientY - dimension.y)
    };

    let percent = [cursor.x / dimension.width, cursor.y / dimension.height];
    let skewCorners = 8;
    let skewSides = 15;
    let skewCenter = 10;

    if (percent[1] <= 1 / 3) {
        if (percent[0] <= 1 / 3) {
            $(btn).css("transform", `rotateX(${skewCorners}deg) rotateY(-${skewCorners}deg)`);
        }

        if (percent[0] >= 1 / 3 && percent[0] <= 2 / 3) {
            $(btn).css("transform", `rotateX(${skewSides}deg)`);
        }

        if (percent[0] >= 2 / 3) {
            $(btn).css("transform", `rotateX(${skewCorners}deg) rotateY(${skewCorners}deg)`);
        }
    } else if (percent[1] >= 1 / 3 && percent[1] <= 2 / 3) {
        if (percent[0] <= 1 / 3) {
            $(btn).css("transform", `rotateY(-${skewSides}deg)`);
        }

        if (percent[0] >= 1 / 3 && percent[0] <= 2 / 3) {
            $(btn).css("transform", `translateZ(-${skewCenter}px)`);
        }

        if (percent[0] >= 2 / 3) {
            $(btn).css("transform", `rotateY(${skewSides}deg)`);
        }
    } else {
        if (percent[0] <= 1 / 3) {
            $(btn).css("transform", `rotateX(-${skewCorners}deg) rotateY(-${skewCorners}deg)`);
        }

        if (percent[0] >= 1 / 3 && percent[0] <= 2 / 3) {
            $(btn).css("transform", `rotateX(-${skewSides}deg)`);
        }

        if (percent[0] >= 2 / 3) {
            $(btn).css("transform", `rotateX(-${skewCorners}deg) rotateY(${skewCorners}deg)`);
        }
    }
});

$(".btn").click((e) => {
    let btn = e.currentTarget;
    $(btn).css("transform", "");
});

$(".ripple").click((e) => {
    let dimension = e.currentTarget.getBoundingClientRect();

    let radius = dimension.width;

    let cursor = {
        x: (e.clientX - dimension.x - radius / 2),
        y: (e.clientY - dimension.y - radius / 2)
    };

    if (e.clientX === 0 && e.clientY === 0) {
        cursor.x = (dimension.width / 2) - (radius / 2);
        cursor.y = (dimension.height / 2) - (radius / 2);
    }

    let ripple;

    if ($(e.currentTarget).find("span._ripple").length === 0) {
        ripple = document.createElement('span');
    } else {
        ripple = $(e.currentTarget).find("span._ripple");
    }

    ripple = $(ripple)
        .addClass("_ripple")
        .css("width", radius + "px")
        .css("height", radius + "px")
        .css("left", cursor.x)
        .css("top", cursor.y);

    ripple.appendTo(e.currentTarget);
});

$("#config").click(function() {
    $(".modal.config")
        .css("display", "flex")
        .hide()
        .fadeIn(200);

    setTimeout(function() {
        $(".modal.config .box").fadeIn();
    }, 200);
});

$("#config-close").click(function() {
    $(".modal.config .box").fadeIn();
    
    setTimeout(function() {
        $(".modal.config").fadeOut(200);
    }, 200);
});