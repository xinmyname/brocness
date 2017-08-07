export default class Item {

    private description: string;

    constructor() {
        this.description = "An item";
    }

    toString(): string {
        return this.description;
    }
}
