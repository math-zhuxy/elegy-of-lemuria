import { CAMERA, DrawGameSpriteImage, BASIC_GAME_SETS } from "./utils";
type ENEMY_STATE = 'move' | 'attack' | 'idle' | "dead";
export class ENEMY_SPRITE {
    static MaxHP: number;
    static InitialAttack: number;

    static IdleImage: HTMLImageElement;
    static RunImage: HTMLImageElement;
    static AttackImage: HTMLImageElement;
    static DeadImage: HTMLImageElement;

    pos_x: number;
    pos_y: number;
    time_counter: number;
    attack_level: number;
    hp: number;
    state: ENEMY_STATE;
    IsDead: boolean;
    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.attack_level = ENEMY_SPRITE.InitialAttack;
        this.state = 'move';
        this.time_counter = 0;
        this.hp = ENEMY_SPRITE.MaxHP;
        this.IsDead = false;
    }
    ChangeState(st: ENEMY_STATE): void {
        if (this.state === st) return;
        this.state = st;
        this.time_counter = 0;
    }
    DrawHpBar(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.pos_x - CAMERA.GetPos().x,
            this.pos_y - CAMERA.GetPos().y + 80,
            40,
            5
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.pos_x - CAMERA.GetPos().x,
            this.pos_y - CAMERA.GetPos().y + 80,
            Math.floor(40 * this.hp / ENEMY_SPRITE.MaxHP),
            5
        );
    }
    DrawIdle(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            ENEMY_SPRITE.IdleImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            7,
            { x: this.pos_x - CAMERA.GetPos().x - 50, y: this.pos_y - CAMERA.GetPos().y - 50 },
            true
        );
    }
    DrawRun(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            ENEMY_SPRITE.RunImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            8,
            { x: this.pos_x - CAMERA.GetPos().x - 50, y: this.pos_y - CAMERA.GetPos().y - 50 },
            true
        );
    }
    DrawAttack(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            ENEMY_SPRITE.AttackImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            6,
            { x: this.pos_x - CAMERA.GetPos().x - 50, y: this.pos_y - CAMERA.GetPos().y - 50 },
            true
        );
    }
    DrawDead(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            ENEMY_SPRITE.DeadImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            4,
            { x: this.pos_x - CAMERA.GetPos().x - 50, y: this.pos_y - CAMERA.GetPos().y - 50 },
            true
        )
    }
    DoAction(ctx: CanvasRenderingContext2D) {
        if (this.hp <= 0) this.ChangeState('dead');
        switch (this.state) {
            case "idle":
                this.DrawIdle(ctx);
                break;
            case "move":
                this.DrawRun(ctx);
                this.pos_x--;
                break;
            case "attack":
                this.DrawAttack(ctx);
                break;
            case "dead":
                this.DrawDead(ctx);
                if (this.time_counter === 4 * BASIC_GAME_SETS.game_speed - 1) this.IsDead = true;
                break;
            default:
                console.error("Unknown state: " + this.state);
        }
        if (this.hp > 0) this.DrawHpBar(ctx);
        this.time_counter++;
    }
}