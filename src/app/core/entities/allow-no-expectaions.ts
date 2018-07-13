declare const expect: any;

/**
 * Run this function in jasmine specs with ONLY httpTestingController[expectOne | expectNone] calls,
 * that produce SPEC HAS NO EXPECTATIONS error.
 */
export function allowNoExpectations() {
    expect(true).toEqual(true);
}
