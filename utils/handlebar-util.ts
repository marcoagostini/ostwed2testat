export const helpers = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    'if_eq': function (a: any, b: any, opts: any): any {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    'times': function (count: number, block: any) {
        let accum = '';
        for(let i = 0; i < count; i++)
            accum += block.fn(i);
        return accum;
    }
}
