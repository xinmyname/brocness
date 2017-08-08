import assert = require("assert");
import Item from "../app/models/item";

describe('given an item', () => {
    describe('when converted to a string', () => {
        it('should return "An item"', () => {
            var i = new Item();
            assert.equal(i.toString(), "An item");
        });
    });
});
