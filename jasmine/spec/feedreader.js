/**
 * feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * All tests are placed within $() function
 * to ensure that the DOM is ready
 */
$(function() {
    /**
     * Test suite to check all feeds has been defined
     */
    describe('RSS Feeds', function() {
        /**
         * Ensure that the array with feeds are defined
         * and is not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /**
         * Ensure that all feeds have url
         */
        it('urls are defined', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeTruthy();
            }
        });

        /**
         * Ensure that all feed have name
         */
        it('names are defined', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeTruthy();
            }
        });
    });

    /**
     * Test suite to check menu is functioning properly
     */
    describe('The menu', function() {
        const BODY = $('body');
        const BUTTON = $('.menu-icon-link');

        /**
         * Ensure that the menu is hidden by default
         */
        it('is hidden', function() {
            expect(BODY.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Ensure that the menu is showing and hiding by click on button
         */
        it('shows and hides on click', function() {
            // Check if opens properly
            BUTTON.trigger('click');
            expect(BODY.hasClass('menu-hidden')).toBe(false);

            // Check if closes properly
            BUTTON.trigger('click');
            expect(BODY.hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * Test suite to check initial entries
     */
    describe('Initial Entries', function() {
        /**
         * Ensure that the feed is loaded
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /**
         * Ensure the the feed has at least one entry
         */
        it('has at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let initialTitle;
        let initialContent;

        let newTitle;
        let newContent;

        /**
         * Ensure that the feed is loaded
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                // Set values after the first loading
                initialTitle = $('.header-title').html();
                initialContent = $('.feed').html();

                // Set values after the second loading
                loadFeed(1, function() {
                  newTitle = $('.header-title').html();
                  newContent = $('.feed').html();

                  // Finish setup
                  done();
                });
            });
        });

        /**
         * Ensure that content is changing on loading
         */
        it('content changed on loading', function() {
            expect(initialTitle).not.toEqual(newTitle);
            expect(initialContent).not.toEqual(newContent);
        });

        // Restore to default state
        afterAll(function() {
            loadFeed(0);
        });
    });
}());