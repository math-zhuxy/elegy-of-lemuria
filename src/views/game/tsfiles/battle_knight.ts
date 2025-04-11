import { BASIC_GAME_SETS, DrawGameSpriteImage } from "./utils";
export class KNIGHT_SPRITE {
    static IdleImage: HTMLImageElement;
    static RunImage: HTMLImageElement;
    static AttackImage: HTMLImageElement;
    pos_x: number;
    pos_y: number;
    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
    }
    DrawIdle(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.IdleImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            4,
            { x: this.pos_x, y: this.pos_y - 50 }
        );
    }
    DrawRun(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.RunImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            7,
            { x: this.pos_x, y: this.pos_y - 50 }
        );
    }
    DrawAttack(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.AttackImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            5,
            { x: this.pos_x - 16, y: this.pos_y - 50 }
        );
    }
}
export function GameBattleInit(){
    KNIGHT_SPRITE.IdleImage = new Image();
    KNIGHT_SPRITE.IdleImage.src = "/img/knight/Idle.png";
    KNIGHT_SPRITE.RunImage = new Image();
    KNIGHT_SPRITE.RunImage.src = "/img/knight/Run.png";
    KNIGHT_SPRITE.AttackImage = new Image();
    KNIGHT_SPRITE.AttackImage.src = "/img/knight/Attack.png";
}