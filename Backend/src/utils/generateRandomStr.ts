import crypto from "crypto";

export function random(len: number) {
    const options = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    const length = options.length;

    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options[crypto.randomInt(0, length)];
    }

    return ans;
}
