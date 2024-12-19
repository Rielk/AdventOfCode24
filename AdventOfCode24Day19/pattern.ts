export class Pattern {
    static beginsWith(pattern: string, towel: string): boolean {
        if (towel.length > pattern.length)
            return false;
        for (let i = 0; i < towel.length; i++)
            if (pattern[i] != towel[i])
                return false;
        return true;
    }
}