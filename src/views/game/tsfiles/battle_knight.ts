import type { ENEMY_SPRITE } from "./battle_enemy";
import { BASIC_GAME_SETS, CAMERA, DrawGameSpriteImage } from "./utils";
type KNIGET_STATE = "idle" | "run" | "attack" | "move" | "dead";
export class KNIGHT_SPRITE {
    static IdleImage: HTMLImageElement;
    static RunImage: HTMLImageElement;
    static AttackImage: HTMLImageElement;
    static DeadImage: HTMLImageElement;


    static MaxHP: number;
    static InitialAttack: number;
    static AttackZone: number;


    private pos_x: number;
    private pos_y: number;
    private state: KNIGET_STATE;
    private time_counter: number;
    hp: number;
    private attack_level: number;

    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.state = "idle";
        this.time_counter = 0;
        this.hp = KNIGHT_SPRITE.MaxHP;
        this.attack_level = KNIGHT_SPRITE.InitialAttack;
    }
    ChangeState(st: KNIGET_STATE): void {
        if (this.state === st) return;
        this.state = st;
        this.time_counter = 0;
    }
    DrawHpBar(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.pos_x - CAMERA.GetPos().x + 15, 
            this.pos_y - CAMERA.GetPos().y + 80, 
            40, 
            5
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.pos_x - CAMERA.GetPos().x +15, 
            this.pos_y - CAMERA.GetPos().y + 80, 
            Math.floor(40 * this.hp / 100), 
            5
        );
    }
    DrawIdle(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.IdleImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            4,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DrawRun(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.RunImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            7,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DrawAttack(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.AttackImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            5,
            { x: this.pos_x - CAMERA.GetPos().x - 16, y: this.pos_y - CAMERA.GetPos().y - 50 }
        );
    }
    DrawDead(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.DeadImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            6,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 }
        )
    }
    JudgeInAttackZone(item: ENEMY_SPRITE): void {
        if (item.pos_x > this.pos_x && item.pos_x < this.pos_x + KNIGHT_SPRITE.AttackZone) {
            if (this.state === "idle" || this.state === "run") {
                this.ChangeState('attack');
                item.ChangeState('attack');
            }
            if(item.state === "attack") {
                if ((this.time_counter / BASIC_GAME_SETS.game_speed) % 5 === 4) {
                    item.hp -= this.attack_level;
                }
                if (item.hp < 0) {
                    this.ChangeState('idle');
                }
                if ((item.time_counter / BASIC_GAME_SETS.game_speed) % 5 === 4) {
                    this.hp -= item.attack_level;
                }
                if (this.hp<0){
                    item.ChangeState('move');
                }
            }
        }
    }
    DoAction(ctx: CanvasRenderingContext2D): void {
        switch (this.state) {
            case "idle":
                this.DrawIdle(ctx);
                break;
            case "run":
                this.DrawRun(ctx);
                break;
            case "move":
                this.DrawRun(ctx);
                break;
            case "attack":
                this.DrawAttack(ctx);
                break;
            case "dead":
                this.DrawDead(ctx);
                break;
            default:
                console.error("Unknown state: " + this.state);
        }
        this.DrawHpBar(ctx);
        this.time_counter++;
    }
}
