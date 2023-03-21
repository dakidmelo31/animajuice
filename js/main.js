const navLink = gsap.utils.toArray(".nav-link"),
    imgWrap = document.querySelector(".img-wrapper"),
    imgItem = document.querySelector('.img-placeholder img')


function moveItem(e) {
    var mouseX = e.clientX,
        mouseY = e.clientY,
        tl = gsap.timeline();
    tl.to(imgWrap, {
        duration: 1,
        x: mouseX,
        y: mouseY,
        ease: Expo.ease
    })
}

function initAnimation() {
    navLink.forEach((element) => {
        element.addEventListener("mouseenter", linkHover)
        element.addEventListener("mouseleave", linkHover)
        element.addEventListener("mousemove", moveItem)
    });
}

function init() {
    initAnimation();
}

function linkHover(e) {
    if (e.type === "mouseenter") {
        var imgSrc = e.target.dataset.src
        var tl = gsap.timeline();

        tl.set(imgItem, {
            attr: { src: imgSrc }
        }).to(imgWrap, {
            autoAlpha: 1,
            scale: 1
        })
    } else if (e.type === "mouseleave") {
        var tl = gsap.timeline();
        tl.to(imgWrap, {
            autoAlpha: 0,
            scale: 0.3
        })
    }
}


//cursor pointer
var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll(".cursor-scale"),
    mouseX = 0,
    mouseY = 0;

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: () => {
        gsap.set(cursor, {
            css: {

                left: mouseX,
                top: mouseY
            }
        })
    }
})



window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY
})

window.addEventListener("load", () => {
    init();
})


cursorScale.forEach(link => {
    link.addEventListener('mouseleave', (e) => {
        cursor.classList.remove('grow')
        cursor.classList.remove('grow-small')
    })
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow')
        if (link.classList.contains("small")) {
            cursor.classList.remove('grow')
            cursor.classList.add('grow-small')
        }
    })
})

const data = function() {
    alert("Information is now ready for you to show to potential workers")
    return null;
}

// svg

const nPts = 800,
    radius = 550,
    wraps = 85,
    stage = document.querySelector("#stage");

for (let i = 0; i < nPts; i++) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
        angle = (i / nPts * Math.PI * wraps) - Math.PI / wraps,
        x = Math.cos(angle) * (i / nPts * radius),
        y = Math.sin(angle) * (i / nPts * radius);


    gsap.set(c, {
        x: 250,
        y: 250,
        attr: {
            class: "c c" + i,
            r: gsap.utils.wrapYoyo(0, nPts / 2, i) / nPts * 7 + 0.1,
            cx: x,
            cy: y,
            fill: "#446644"
        }
    })

    stage.appendChild(c)
}
var mainTl = gsap.timeline();

gsap.to(".c", {
    duration: 99,
    rotation: 360,
    scale: 1.05,
    ease: 'none',
    repeat: -1
})
mainTl.from('.c', {
    duration: 2,
    attr: {
        cx: 0,
        cy: 0,
        r: 0
    },
    yoyo: true,
    ease: "circ",
    repeat: 1,
    stagger: -.02
})
mainTl.to(".my-name", {
    y: "-67vh",
    duration: 1.3,
    scale: .4,
    opacity: 1,
    ease: "elastic"
}, 18)


var tl = gsap.timeline();

tl.to(".my-name", {
    y: "-47vh",
    duration: 2,
    delay: 2,
    opacity: 1,
    ease: "circ"
})
tl.from(".big-lines div", {
    scale: 4,
    duration: .6
}, .9)
tl.to(".left-line", {
    duration: .6,
    width: 0
})

tl.to(".top-line", {
    height: 0,
    duration: .6
})
tl.to(".right-line", {
    duration: .6,
    width: 0
})
tl.to(".bottom-line", {
    duration: .6,
    height: 0
})
tl.to(".big-lines", {
    height: 0,
    top: "-120vh",
    duration: .1,
    onComplete: (e) => {
        gsap.to("body", {
            overflowY: "scroll",
            duration: 0
        })
    }
})

tl.from("#menu", {
        x: 150,
        top: -50,
        duration: 1.75,
        yoyo: true,
        ease: 'elastic'
    },
    ">"
)

let menuOpened = false;
document.querySelector("#menu").addEventListener("click", (e) => {
    if (menuOpened) {
        tl.to(".menu-wrapper", {
            left: "-120vw",
            duration: .40,
        })
    } else {
        tl.from(".menu-wrapper a", {
            x: -160,
            yoyo: true,
            duration: .2,
            stagger: .15,
            ease: "linear",
            onComplete: (e) => {

                if (window.innerWidth < 900)
                    gsap.to("body", {
                        overflowY: "scroll",
                        duration: 0
                    })

            }
        })
        tl.to(".menu-wrapper", {
            left: 0,
            duration: .40,
            ease: "linear",
            onComplete: (e) => {
                if (window.innerWidth < 900)
                    gsap.to("body", {
                        overflowY: "hidden",
                        duration: 0
                    })

            }
        })
    }
    menuOpened = !menuOpened;

})