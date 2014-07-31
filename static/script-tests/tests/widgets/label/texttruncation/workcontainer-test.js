
(function() {
    this.tests = AsyncTestCase("Work Container");

    var LOREM_IPSUM = "Donec dignissim lacus eu quam fringilla, vitae hendrerit tellus egestas. Aenean ultricies blandit tellus, ac vestibulum libero sagittis in. Integer purus tortor, placerat quis velit ac, pulvinar sodales augue. Maecenas sodales, arcu id aliquet consectetur, enim purus lacinia urna, nec sagittis sem elit a nunc. Nam sagittis molestie varius. Aliquam vehicula, nisi ut porta venenatis, diam ipsum sodales nisi, nec rhoncus lorem quam sit amet neque. Cras euismod porttitor felis, at pulvinar diam iaculis vel. Nullam tincidunt turpis sit amet nunc lacinia, a fermentum purus tincidunt. Curabitur ac elit a quam posuere fermentum in sit amet ante. Vivamus semper ligula non metus mattis, id feugiat mauris ultrices. Aliquam ullamcorper molestie metus eget laoreet. Sed gravida mi et mauris venenatis, nec ultricies lacus suscipit. Nullam placerat elit id euismod interdum. Proin et dui eget sem sodales bibendum. Nam pulvinar, libero id elementum sagittis, purus augue molestie dui, vel dapibus lorem nibh ac odio. In eu adipiscing sapien.";
    var SHORT_TEXT = "Two words.";

    var container;

    this.tests.prototype.setUp = function () {
        this.sandbox = sinon.sandbox.create();
        this.parentContainer = setupParentContainer();



        container = document.createElement("div");
        this.parentContainer.appendChild(container);
        container.style.width = "100px";
        container.style.height = "100px";
    };

    this.tests.prototype.tearDown = function () {
        this.sandbox.restore();
        destroyParentContainer(this.parentContainer);
    };

    function setupParentContainer() {
        var parentContainer = document.createElement("div");
        // try and set the css to that this will render the same in all browsers
        parentContainer.style.display = "block";
        parentContainer.style.margin = "0";
        parentContainer.style.padding = "0";
        parentContainer.style.borderStyle = "none";
        parentContainer.style.fontFamily = "Courier, monospace";
        parentContainer.style.fontStyle = "normal";
        parentContainer.style.fontSize = "20px";
        parentContainer.style.fontWeight = "normal";
        document.body.appendChild(parentContainer);
        return parentContainer;
    }

    function destroyParentContainer(parentContainer) {
        document.body.removeChild(parentContainer);
    }

    this.tests.prototype.testCheckTextThatIsMoreThanContainersVerticalHeightWhenMeasuringVerticallyIsReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, false);
            assertEquals(true, workContainer.isOver(LOREM_IPSUM));
        });
    };

    this.tests.prototype.testCheckTextThatIsLessThanContainersHeightWhenMeasuringVerticallyIsNotReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, false);
            assertEquals(false, workContainer.isOver(SHORT_TEXT));
        });
    };

    this.tests.prototype.testCheckTextThatIsMoreThanContainersWidthWhenMeasuringHorizontallyIsReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, true);
            assertEquals(true, workContainer.isOver(LOREM_IPSUM));
        });
    };

    this.tests.prototype.testCheckTextThatIsLessThanContainersWidthWhenMeasuringHorizontallyIsNotReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, true);
            assertEquals(true, workContainer.isOver(SHORT_TEXT));
        });
    };

    this.tests.prototype.testCheckDestroyRemovesChildContainerFromParent = function (queue) {
        expectAsserts(3);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            assertEquals(0, container.childNodes.length);
            var workContainer = new WorkContainer(container, true);
            assertEquals(1, container.childNodes.length);
            workContainer.destroy();
            assertEquals(0, container.childNodes.length);
        });
    };

    this.tests.prototype.testCheckGetNumCharactersThatFitReturnsCorrectValuesWhenMeasuringVertically = function (queue) {
        expectAsserts(2);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, false);
            //TODO
            this.sandbox.stub(workContainer, "_create").returns({});
            assertEquals(30, workContainer.getNumCharactersThatFit(LOREM_IPSUM, "..."));
            assertEquals(33, workContainer.getNumCharactersThatFit(LOREM_IPSUM, ""));
        });
    };

    this.tests.prototype.testCheckGetNumCharactersThatFitReturnsCorrectValuesWhenMeasuringHorizontally = function (queue) {
        expectAsserts(2);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var workContainer = new WorkContainer(container, true);
            assertEquals(5, workContainer.getNumCharactersThatFit(LOREM_IPSUM, "..."));
            assertEquals(8, workContainer.getNumCharactersThatFit(LOREM_IPSUM, ""));
        });
    };

})();