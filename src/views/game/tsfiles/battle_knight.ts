import { BASIC_GAME_SETS, CAMERA, DrawGameSpriteImage } from "./utils";
type KNIGET_STATE = "idle" | "run" | "attack";
export class KNIGHT_SPRITE {
    static IdleImage: HTMLImageElement;
    static RunImage: HTMLImageElement;
    static AttackImage: HTMLImageElement;
    private pos_x: number;
    private pos_y: number;
    private state: KNIGET_STATE;
    private time_counter: number;

    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.state = "idle";
        this.time_counter = 0;
    }
    ChangeState(st: KNIGET_STATE): void {
        if (this.state === st) return;
        this.state = st;
        this.time_counter = 0;
    }
    DrawIdle(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.IdleImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            4,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DrawRun(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.RunImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            7,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DrawAttack(ctx: CanvasRenderingContext2D, counter: number): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.AttackImage,
            ctx,
            counter / BASIC_GAME_SETS.game_speed,
            5,
            { x: this.pos_x - CAMERA.GetPos().x - 16, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DoAction(ctx: CanvasRenderingContext2D): void {
        if (this.state === "idle") {
            this.DrawIdle(ctx, this.time_counter);
        }
        else if (this.state === "run") {
            this.DrawRun(ctx, this.time_counter);
        }
        else if (this.state === "attack") {
            this.DrawAttack(ctx, this.time_counter);
        }
        else {
            console.error("Unknown state: " + this.state);
        }
        this.time_counter += 1;
    }
}
export function GameBattleInit() {
    KNIGHT_SPRITE.IdleImage = new Image();
    KNIGHT_SPRITE.IdleImage.src = "/img/knight/Idle.png";
    KNIGHT_SPRITE.RunImage = new Image();
    KNIGHT_SPRITE.RunImage.src = "/img/knight/Run.png";
    KNIGHT_SPRITE.AttackImage = new Image();
    KNIGHT_SPRITE.AttackImage.src = "/img/knight/Attack.png";
}