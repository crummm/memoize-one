export declare type EqualityFn = (newArgs: any[], lastArgs: any[]) => boolean;
declare type ResultFn = (...args: any[]) => any;
export declare function memoizeOne(isEqual: EqualityFn): any;
export declare function memoizeOneFn(resultFn: ResultFn, isEqual?: EqualityFn): ResultFn;
export {};
