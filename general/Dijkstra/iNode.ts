export interface iNode<T extends iNode<T>> {
    readonly uniqueId: string | number;

    getNextNodes(): Iterable<{ nextNode: T; addedWeight: number; }, void> | Generator<{ nextNode: T; addedWeight: number; }, void>;
}