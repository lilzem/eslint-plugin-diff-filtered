declare class Range {
    private readonly inclusiveLowerBound;
    private readonly exclusiveUpperBound;
    constructor(inclusiveLowerBound: Readonly<number>, exclusiveUpperBound: Readonly<number>);
    isWithinRange(n: Readonly<number>): boolean;
}
export { Range };
