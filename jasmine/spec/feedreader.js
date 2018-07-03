$(
	(function() {
		describe("RSS Feeds", function() {
			//Test if RSS feeds data is defined
			it("are defined", function() {
				expect(allFeeds).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});

			//Test if feed url's a defined and not empty
			describe("Feed URL", function() {
				it("are defined", function() {
					for (let i = 0; i < allFeeds.length; i++) {
						const feed = allFeeds[i];
						expect(feed.url).toBeDefined();
						expect(feed.url.length).not.toBe(0);
					}
				});
			});

			//Test if feeds are defined and have correct names
			describe("Feed Name", function() {
				it("are defined", function() {
					for (let i = 0; i < allFeeds.length; i++) {
						const feed = allFeeds[i];
						expect(feed.name).toBeDefined();
						expect(feed.name.length).not.toBe(0);
					}
				});
			});
		});

		//MENU BLOCK AND ICON
		describe("The menu", function() {
			const body = $("body");
			//Test if side menu is hidden by default
			it("is hidden by default", function() {
				expect(body.hasClass("menu-hidden")).toBe(true);
			});
			// Test if menu icon toggles menu visibility
			it("changes visibility when menu icon is clicked", function() {
				const menuIcon = $(".menu-icon-link");
				menuIcon.click();
				expect(body.hasClass("menu-hidden")).toBeFalsy();
				menuIcon.click();
				expect($("body").hasClass("menu-hidden")).toBeTruthy();
			});
		});
		// FEED ENTRIES
		describe("Initial entries", function() {
			//Load feed and wait for a callback
			beforeEach(function(done) {
				loadFeed(0, done);
			});
			//Make sure that feed has at least one entry
			it("has at least one entry in feed container", function(done) {
				expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
				done();
			});
		});

		//test loadFeed() results
		describe("New Feed Selection", function() {
			let initFeed;
			let newFeed;
			beforeEach(function(done) {
				loadFeed(0, function() {
					//set content on first request
					initFeed = $(".feed").html();
					loadFeed(1, function() {
						//set content on second request
						newFeed = $(".feed").html();
						done();
					});
				});
			});
			//Test if content on first and second request is different
			it("content is updated", function(done) {
				expect(initFeed).not.toBe(newFeed);
				done();
			});
		});
	})()
);