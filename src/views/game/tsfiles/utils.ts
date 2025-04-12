export const BASIC_GAME_SETS = {
    "game_speed": 6,
    "camera_speed": 2
};
export class CAMERA {
    private static pos_x: number = 0;
    private static pos_y: number = 0;
    private static speed: number = BASIC_GAME_SETS.camera_speed;
    constructor() { }
    static Move(
        w: boolean,
        a: boolean,
        s: boolean,
        d: boolean,
    ): void {
        if (w) {
            this.pos_y -= this.speed;
        }
        if (a) {
            this.pos_x -= this.speed;
        }
        if (s) {
            this.pos_y += this.speed;
        }
        if (d) {
            this.pos_x += this.speed;
        }
    }
    static GetPos(): { x: number; y: number; } {
        return { x: this.pos_x, y: this.pos_y };
    }

}
export class KEYBOARD {
    private static PressedW: boolean = false;
    private static PressedA: boolean = false;
    private static PressedS: boolean = false;
    private static PressedD: boolean = false;
    static KeyDown(key: string): void {
        switch (key) {
            case 'w':
                this.PressedW = true;
                break;
            case 'a':
                this.PressedA = true;
                break;
            case 's':
                this.PressedS = true;
                break;
            case 'd':
                this.PressedD = true;
                break;
            default:
                break;
        }
    }
    static KeyUp(key: string): void {
        switch (key) {
            case 'w':
                this.PressedW = false;
                break;
            case 'a':
                this.PressedA = false;
                break;
            case 's':
                this.PressedS = false;
                break;
            case 'd':
                this.PressedD = false;
                break;
            default:
                break;
        }
    }
    static MoveCamera(): void {
        CAMERA.Move(
            this.PressedW,
            this.PressedA,
            this.PressedS,
            this.PressedD
        );
    }
}

export class MOUSE {
    private static pos_x: number = 0;
    private static pos_y: number = 0;
    static UpdatePos(x: number, y: number): void {
        this.pos_x = x;
        this.pos_y = y;
    }
    static GetPos(): { x: number, y: number } {
        return { x: this.pos_x, y: this.pos_y };
    }
}

export function DrawGameSpriteImage(
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    cnt: number,
    num_sprite: number,
    pos: { x: number; y: number; },
) {
    let spriteWidth = img.width / num_sprite;
    let spriteHeight = img.height;
    let spriteIndex = Math.floor(cnt) % num_sprite;
    ctx.drawImage(
        img,
        spriteIndex * spriteWidth,
        0,
        spriteWidth,
        spriteHeight,
        pos.x,
        pos.y,
        spriteWidth,
        spriteHeight
    );
}