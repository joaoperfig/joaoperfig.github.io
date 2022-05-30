var __extends = this && this.__extends || function() {
		var a = function(b, c) {
			return (a = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function(a, b) {
					a.__proto__ = b
				} || function(a, b) {
					for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
				})(b, c)
		};
		return function(b, c) {
			function d() {
				this.constructor = b
			}
			if ("function" != typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
			a(b, c), b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
		}
	}(),
	FlappyD3V2Hero = function(a) {
		function b(b, c, d, e) {
			var f = a.call(this, b, 0, 0, b.display.getKeyScaled("hero", 1)) || this;
			f.anchor.setTo(.5), f.scale.setTo(b.options.scaleAssets), b.add.existing(f), f.midW = f.width >> 1, f.midH = f.height >> 1, f.limitY = c - f.midH;
			var g, h = .46,
				i = .36 * b.options.scaleAssets,
				j = -8 * b.options.scaleAssets,
				k = .6981,
				l = .0279,
				m = 0;
			e && (g = new Phaser.Graphics(b), b.add.existing(g));
			var n = .7 * f.midW << 0,
				o = .7 * f.midH << 0,
				p = new Array;
			return p[0] = new Phaser.Point(-n, -o), p[1] = new Phaser.Point(n, -o), p[2] = new Phaser.Point(n, o), p[3] = new Phaser.Point(-n, o), f.aTestPoints = [new Phaser.Point, new Phaser.Point, new Phaser.Point, new Phaser.Point], f.lgTestPoints = f.aTestPoints.length, b.options.isMobile ? b.options.config.is_collision ? f.posHero = 24 * b.options.scaleX + f.midW << 0 : f.posHero = 120 * b.options.scaleX + f.midW << 0 : f.posHero = (.2 * b.options.gameWidth << 0) + f.midW, f.move = function() {
				var a = this.x + h;
				a > this.posHero && (a = this.posHero), this.x = a, this.rotation < k && (this.rotation += l), m += i;
				var b = this.y + m;
				0 > b && (b = 0), b > this.limitY && (b = this.limitY, d()), this.y = b, e && g.clear();
				for (var c = 0; c < this.lgTestPoints; c++) {
					var f = p[c],
						j = this.aTestPoints[c],
						n = Math.cos(-this.rotation),
						o = Math.sin(-this.rotation);
					j.x = this.x + n * f.x + o * f.y << 0, j.y = this.y + n * f.y - o * f.x << 0, e && (g.beginFill(16711935), g.drawCircle(j.x, j.y, 4))
				}
			}, f.jump = function() {
				this.rotation = -k, m = j
			}, f
		}
		return __extends(b, a), b
	}(Phaser.Image),
	FlappyD3V2Bonus = function(a) {
		function b(b, c) {
			var d = a.call(this, b, 0, 0, b.display.getKeyScaled("bonus", 1)) || this;
			d.scale.setTo(b.options.scaleAssets), d.anchor.setTo(.5), d.isGrab = !1, d.isActive = !1, d.midW = d.width >> 1, d.midH = d.height >> 1;
			var e = c,
				f = 0,
				g = 10;
			return d.reposition = function(a, b) {
				this.reset(a, b), this.isGrab = !1
			}, d.grab = function() {
				this.isGrab = !0, this.kill(), this.isActive = !0, f = 0, e.alpha = .5
			}, d.move = function(a) {
				this.alive && (this.x -= a, this.x < -this.width && this.kill()), this.isActive && (f++, f > 480 ? (this.isActive = !1, e.alpha = 1) : f > 240 && (Math.floor(f / g) % 2 == 0 ? e.alpha = 1 : e.alpha = .5))
			}, d
		}
		return __extends(b, a), b
	}(Phaser.Image),
	FlappyD3V2Decor = function() {
		function a(a) {
			function b(a, b) {
				a.x -= b * a.scale.x, a.x < -a.width && (a.x = e + a.width)
			}
			var c, d, e = a.options.gameWidth,
				f = a.options.gameHeight,
				g = a.options.scaleAssets,
				h = a.display.isGroupAvailable("bg"),
				i = a.display.isGroupAvailable("cloud");
			if (h && (c = a.display.getTileSprite("bg", e, f, 0, 0), a.add.existing(c)), i) {
				d = new Phaser.Group(a), d.classType = Phaser.Image;
				for (var j = 5, k = 0; j > k; k++) {
					var l = a.rnd.integerInRange(0, e),
						m = a.rnd.integerInRange(0, f),
						n = d.create(l, m, a.display.getKeyScaled("cloud")),
						o = (.5 + .5 * (1 - n.y / f)) * g;
					n.scale.set(o)
				}
			}
			this.update = function(a) {
				h && (c.tilePosition.x -= a), i && d.forEach(b, this, !1, a)
			}
		}
		return a
	}(),
	FlappyD3V2Obstacle = function(a) {
		function b(b, c) {
			var d = a.call(this, b) || this,
				e = b.options.scaleAssets,
				f = (80 * e * 100 << 0) / 100,
				g = !1,
				h = 0,
				i = 0,
				j = 0,
				k = 0;
			return d.bottomObstacle = new Phaser.Sprite(d.game, 0, 0, c), d.bottomObstacle.scale.set(e), d.add(d.bottomObstacle), d.topObstacle = new Phaser.Sprite(d.game, 0, 0, c), d.topObstacle.scale.set(e), d.topObstacle.angle = -180, d.topObstacle.anchor.set(1), d.add(d.topObstacle), i = 0, d.setSpeed = function(a) {
				k = -a
			}, d.reposition = function(a, b, c, d) {
				g = c, this.hasScore = !1, this.x = a, this.y = h = b, j != d && (j = d, this.bottomObstacle.y = j, this.topObstacle.y = -j - this.topObstacle.height)
			}, d.update = function() {
				this.x += k, g && (i++, this.y = h + f * Math.sin(i / 50))
			}, d
		}
		return __extends(b, a), b
	}(Phaser.Group),
	FlappyD3V2LevelManager = function(a) {
		function b(b, c, d, e, f) {
			function g(a, b) {
				a.setSpeed(b)
			}

			function h(a) {
				for (var b = 16, c = 16, d = Math.ceil(a.width / b), e = Math.ceil(a.height / c), f = Math.ceil(b * j), g = Math.ceil(c * j), h = Math.ceil((d - 1) * f), i = Math.ceil((e - 2) * g), k = 0; e > k; k++)
					for (var l = 0; d > l; l++) {
						for (var m = new Phaser.Rectangle(l * b, k * c, b, c), n = a.getPixels(m).data, o = n.length, p = 0, q = 0; o > q; q++) 0 == n[q] && p++;
						if (.8 > p / o) {
							var s = new Phaser.Rectangle(l * f << 0, k * g << 0, f, g);
							r.aZonesBottom[r.aZonesBottom.length] = s, r.aZonesTop[r.aZonesTop.length] = new Phaser.Rectangle(h - s.x, i - s.y, f, g)
						}
					}
			}
			for (var i = a.call(this, b) || this, j = b.options.scaleAssets, k = b.options.gameWidth, l = b.options.gameHeight, m = (120 * j * 100 << 0) / 100, n = (80 * j * 100 << 0) / 100, o = l - n, p = b.display.getImageScaled("obstacle", 1), q = new Phaser.BitmapData(b, "bdataObstacle1", p.width >> 0, o >> 0), r = i, s = 0; o > s;) q.draw(p, 0, s), s += p.height;
			q.update(), b.stage.updateTransform(), i.aZonesBottom = new Array, i.aZonesTop = new Array, h(q), p.destroy();
			for (var t = Math.ceil(k / (p.width + c)) + 1, u = null, v = 0; t > v; v++) {
				var w = new FlappyD3V2Obstacle(b, q);
				null != u && (w.previousObstacle = u), u = w, i.add(w)
			}
			i.getAt(0).previousObstacle = i.getAt(t - 1);
			var x = 810 - q.width;
			return i.forEach(function(a) {
				a.reposition(x, b.rnd.integerInRange(e + .5 * f, l - e - .5 * f), !1, m), x += d
			}, i, null), b.options.isBoxInterface && (i.getNextObstacleY = function() {
				for (var a = 0; a < r.children.length; a++) {
					var b = r.getAt(a);
					if (b.x > 20 && b.x < .5 * k) return b.y
				}
				return .5 * l
			}), i.setSpeed = function(a) {
				this.forEach(g, this, null, a)
			}, i
		}
		return __extends(b, a), b
	}(Phaser.Group),
	FlappyD3V2TrailSegment = function(a) {
		function b(b, c) {
			return a.call(this, b, 0, 0, c) || this
		}
		return __extends(b, a), b
	}(Phaser.Image),
	FlappyD3V2Trail = function(a) {
		function b(b, c, d, e) {
			function f(a, b) {
				a.alive && (a.x -= b, a.life--, a.life <= 0 ? a.kill() : a.scale.x = a.scale.y = a.life / d)
			}
			var g = a.call(this, b) || this,
				h = 0,
				i = new Phaser.Graphics(b, 0, 0);
			i.beginFill(e, .2), i.drawCircle(0, 0, 24 * b.options.scaleAssets << 0), i.endFill();
			for (var j = i.generateTexture(), k = 0; c > k; k++) {
				var l = new FlappyD3V2TrailSegment(b, j);
				l.anchor.setTo(0, .5), l.life = l.scale.x = l.scale.y = 0, g.add(l)
			}
			return g.updateTrail = function(a, b, e) {
				this.forEach(f, this, null, e);
				var g = this.getAt(h);
				g.revive(), g.x = a, g.y = b, g.life = d, h++, h >= c && (h = 0)
			}, g.updateEnd = function() {
				this.forEach(f, this, null, 0)
			}, g
		}
		return __extends(b, a), b
	}(Phaser.Group),
	Engine = function(a) {
		function b(c) {
			function d(a) {
				a.x < -a.topObstacle.width ? (a.reposition(a.previousObstacle.x + a.previousObstacle.topObstacle.width + c.rnd.integerInRange(X, W), c.rnd.integerInRange(T + .5 * A, O - T - .5 * A), S, A), G.alive || G.isActive || (G.reposition(a.x + .5 * X, c.rnd.integerInRange(G.height, O - G.height)), (G.y <= a.y - .5 * A || G.y >= a.y + .5 * A) && (G.x += a.width >> 1))) : a.hasScore || (a.x + a.topObstacle.width <= F.x ? (a.hasScore = !0, r += 7, M || (null != c.options.callback && null != c.options.callback.updateScore ? c.options.callback.updateScore(r) : "function" == typeof updateScore && updateScore(r)), u++, u > 3 && (u = 0, v++, 20 > w && (w += .5, C.setSpeed(w)), A > V && (A -= U))) : !G.isActive && a.x < F.x + F.midW && (o(a, C.aZonesTop, a.topObstacle) || o(a, C.aZonesBottom, a.bottomObstacle)) && (R ? m() : F.x -= 2 * w))
			}

			function e() {
				y || (y = !0, G.kill(), F.x = -F.width, F.y = .5 * (O - F.height))
			}

			function f() {
				G.isActive || m()
			}

			function g() {
				H.playMessage(["intro_1", "intro_2", "intro_3", "intro_4"], c.options.isLocalDev ? .1 : .66, "scale", h)
			}

			function h() {
				F.x = -F.width, F.y = .5 * (O - F.height), F.visible = !0, TweenLite.to(F, 2, {
					x: F.posHero,
					ease: Sine.easeIn,
					onComplete: i,
					onUpdate: q
				})
			}

			function i() {
				C.setSpeed(2), j(!0), t = !0
			}

			function j(a) {
				if (M) {
					if (x = !0, z = a, !z) return;
					TweenMax.delayedCall(.5, k, null, this)
				} else a ? (L || c.input.keyboard.addCallbacks(this, l), c.input.onDown.add(l, this)) : (L || c.input.keyboard.reset(!0), c.input.onDown.remove(l, this))
			}

			function k() {
				if (z) {
					l();
					var a, b = C.getNextObstacleY(),
						d = F.y - b;
					a = d > 150 * K ? c.rnd.realInRange(0, .2) : d > 100 * K ? c.rnd.realInRange(.3, .5) : d > 0 ? c.rnd.realInRange(.6, .7) : -50 * K > d ? c.rnd.realInRange(1, 1.1) : c.rnd.realInRange(.7, .8), TweenMax.delayedCall(a, k, null, this)
				}
			}

			function l() {
				F.jump()
			}

			function m() {
				if (!s) {
					s = !0, M || c.services.endGame({
						score: r
					}), j(!1), C.setSpeed(0);
					var a = .6 * N << 0,
						b = F.limitY,
						d = new TimelineMax({
							onUpdate: q,
							onComplete: n
						}),
						e = F.scale.x;
					d.add([TweenMax.to(F.scale, .2, {
						x: 1.1 * e,
						y: 1.1 * e,
						ease: Back.easeIn
					}), TweenMax.to(F.scale, .4, {
						x: e,
						y: e,
						ease: Bounce.easeOut
					}), [TweenMax.to(F, .8, {
						ease: Bounce.easeOut,
						y: b
					}), TweenMax.to(F, .8, {
						ease: Sine.easeInOut,
						x: a,
						rotation: 0
					})]], 0, "sequence")
				}
			}

			function n() {
				H.playMessage(["gameOver"], 1.42, "from_down", p, q)
			}

			function o(a, b, c) {
				for (var d = b.length, e = F.aTestPoints, f = F.lgTestPoints, g = 0; d > g; g++)
					for (var h = b[g], i = 0; f > i; i++) {
						var j = e[i],
							k = a.x + h.x,
							l = a.y + c.y + h.y;
						if (P && (I.beginFill(16711680, .25), I.drawRect(k, l, h.width, h.height)), j.x > k && j.x < k + h.width && j.y > l && j.y < l + h.height) return !0
					}
				return !1
			}

			function p() {
				M ? (c.state.clearCurrentState(), c.state.start("Engine", !0, !1)) : TweenMax.delayedCall(1, c.services.changePage, null, c.services)
			}

			function q() {
				D.updateTrail(F.x - F.midW, F.y, 0)
			}
			var r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J = a.call(this) || this,
				K = c.options.scaleAssets,
				L = (c.options.scaleY, c.options.isMobile),
				M = c.options.isBoxInterface,
				N = c.options.gameWidth,
				O = c.options.gameHeight,
				P = c.options.isDebug,
				Q = c.options.config,
				R = Q.is_collision,
				S = Q.is_moving_obstacles,
				T = (80 * K * 100 << 0) / 100,
				U = (8 * K * 100 << 0) / 100,
				V = (80 * K * 100 << 0) / 100,
				W = (500 * K * 100 << 0) / 100,
				X = (200 * K * 100 << 0) / 100;
			return b.prototype.create = function() {
				r = 0, s = !1, t = !1, u = 0, v = 0, w = 2, x = !1, z = !1, A = (120 * K * 100 << 0) / 100, B = new FlappyD3V2Decor(c), C = new FlappyD3V2LevelManager(c, X, W, T, A), c.add.existing(C), P && (I = new Phaser.Graphics(c), c.add.existing(I)), D = new FlappyD3V2Trail(c, L ? 10 : 30, 30, 16777215);
				var a = c.display.getImageScaled("ground", K);
				E = c.display.getTileSprite("ground", N, a.height << 0, 0, O - a.height << 0), c.add.existing(E), a.destroy(), F = new FlappyD3V2Hero(c, E.y, f, P), F.visible = !1, G = new FlappyD3V2Bonus(c, F), c.add.existing(G), G.kill(), H = new ADFW_Message, H.init(this, c), c.add.existing(H), c.input.maxPointers = 1, c.device.desktop && !M && c.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]), M ? (g(), F.x = F.posHero, F.y = .5 * (O - F.height), F.visible = !0, G.reposition(N >> 1, .25 * O << 0), y = !1, c.portal.setPauseStatus(!0, e)) : (c.services.startGame(), g())
			}, b.prototype.update = function() {
				t && !s && (F.move(), D.updateTrail(F.x - F.midW, F.y, w * (F.x / F.posHero)), B.update(w), G.move(w), G.alive && !G.isGrab && G.x - G.midW < F.x + F.midW && G.x + G.midW > F.x - F.midW && G.y - G.midH < F.y + F.midH && G.y + G.midH > F.y - F.midH && G.grab(), P && I.clear(), E.tilePosition.x -= w, C.forEach(d, this), F.x < -F.width >> 1 && m())
			}, J
		}
		return __extends(b, a), b
	}(Phaser.State);
