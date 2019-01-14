$(() => {
    //toggler aadon
    (function () {
        const $togglers = $('[uk-toggle]');

        $togglers.each(function () {
            const $toggler = $(this);
            const $target = $(getTarget($toggler));
            const activeClassName = 'tm-toggle-active';

            $target.on({
                'shown': function () {
                    $toggler.addClass(activeClassName);
                    $toggler.text('закрыть фильтр');
                },
                'hidden': function () {
                    $toggler.removeClass(activeClassName);
                    $toggler.text('фильтр');

                }
            });

        });

        function getTarget($toggler) {
            const patern = 'target:';
            const str = $toggler.attr('uk-toggle') || $toggler.attr('href');

            if (!str) return null;

            if (str.indexOf(patern) === -1) {
                return str;
            }

            const reg = /target:(.+)\;/i;
            const match = str.match(reg);

            if (!match || !match[1]) return null;

            return match[1];
        }

    })();

    // neironet
    (function () {
        const canvas = document.querySelector('#tm-raffle-canvas');

        if (!canvas) return;

        const parent = canvas.parentElement;
        const wt = 1200;
        const ht = 1000;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        const c = canvas.getContext('2d');

        const colors = ['#6c1bd0', '#eb358a', '#5913b0', '#6d3caa',];
        const random_color = () => colors[Math.floor(Math.random() * colors.length)];

        class Circle {
            constructor(x, y, r, dx = 0, dy = 0, color = random_color(), bounce = true) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.dx = dx;
                this.dy = dy;
                this.color = color;
                this.t = 0;
                // this.gravity = gravity
                this.bounce = bounce;
            };

            setSize(r) {
                this.r = r;
            }

            draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                c.globalAlpha = 1;
                c.fillStyle = this.color;
                c.fill();
            }

            update() {
                if (this.x + this.dx - this.r <= 0 || this.x + this.dx + this.r >= wt) this.dx = -this.dx;
                if (this.y + this.dy - this.r <= 0 || this.y + this.dy + this.r >= ht) this.dy = -this.dy;

                this.x += this.dx;
                this.y += this.dy;

                this.draw()
            }
        }


        const makeRandomCircle = (move = true) => {
            let r = 1 + Math.random() * 5;
            let v = 0.5;
            return new Circle(
                r + Math.random() * (wt - 2 * r),
                r + Math.random() * (ht - 2 * r),
                r,
                move ? v / 2 - Math.random() * v : 0,
                move ? v / 2 - Math.random() * v : 0)
        };


        let circles = Array.apply(null, Array(300)).map(makeRandomCircle);


        const distance = (c1, c2) => Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
        let fps = [];
        let desired_fps = 60;
        let t0;
        let d_max = 150;
        let links_max = 200;

        function animate() {
            // t0 = performance.now()
            // requestAnimationFrame(animate)
            c.clearRect(0, 0, wt, ht);

            let d, alpha, links;
            for (let i = 0; i < circles.length; i++) circles[i].r = 0.1;
            for (let i = 0; i < circles.length; i++) {
                links = 0;
                // calculate distance between any 2 circles
                for (let j = i; j < circles.length; j++) {
                    if (links > links_max) break;
                    d = distance(circles[i], circles[j]);
                    if (d > d_max) continue;
                    alpha = 1 - d / d_max;
                    c.beginPath();
                    c.moveTo(circles[i].x, circles[i].y);
                    c.lineTo(circles[j].x, circles[j].y);
                    c.globalAlpha = alpha;
                    c.strokeStyle = '#666666';
                    c.stroke();
                    links++;
                    circles[i].r += alpha * 0.4;
                    circles[j].r += alpha * 0.4;
                    //rreeeeee
                }
                // circles[i].setSize(links/2)
                circles[i].update();
            }

            // fps.push(1000/(performance.now()-t0))
        }

// animate()

        setInterval(function () {
            animate()
        }, 1000 / 120);
    })();

    //simple select
    (function () {
        const $select = $('select');

        $select.select2({
            minimumResultsForSearch: Infinity,
        });
    })();
});