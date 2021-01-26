import { Injectable } from "@nestjs/common";

/**
 * @desc Wird benutzt um in einen Join Code zu erstellen
 * @return the generated Join-Code
 */
@Injectable()
export class IdGenerator {
    generate(length: number): string {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}