export const BASIC_GAME_SETS = {
    "game_speed": 6,
    "camera_speed": 2,
    "attack_zone": 80
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
            if (this.pos_y > this.speed) this.pos_y -= this.speed;
        }
        if (a) {
            if (this.pos_x > this.speed) this.pos_x -= this.speed;
        }
        if (s) {
            if (this.pos_y + this.speed + 600 < 1200) this.pos_y += this.speed;
        }
        if (d) {
            if (this.pos_x < 1000) this.pos_x += this.speed;
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
    static IsDrawing = false;
    static StartX: number = 0;
    static StartY: number = 0;
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
    IsFliped: boolean
) {
    let spriteWidth = img.width / num_sprite;
    let spriteHeight = img.height;
    let spriteIndex = Math.floor(cnt) % num_sprite;
    if (IsFliped) spriteIndex = num_sprite - spriteIndex - 1;
    ctx.drawImage(
        img,
        spriteIndex * spriteWidth,
        0,
        spriteWidth - 5,
        spriteHeight,
        pos.x,
        pos.y,
        spriteWidth - 5,
        spriteHeight
    );
}