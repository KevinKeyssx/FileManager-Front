import type { FormState } from './types';


interface SyncDimensions {
    width  : number;
    height : number;
}


export const normalizeFolder = ( input: string ): string =>
    input.replace(/\s+/g, '|').replace(/\//g, '|');


export function syncDimensions(
    width       : number,
    height      : number,
    keepDims    : boolean
): SyncDimensions {
    if ( keepDims ) {
        const common = Math.max(1, Math.min(width, height));

        return { width: common, height: common };
    }

    return { width, height };
}


export function clampQuality( q: number ): number {
    if ( Number.isNaN( q )) return 10;

    return Math.max( 10, Math.min( 100, q ));
}


export const toPreviewState = ( state: FormState ): FormState => state;
