import type { ENEMY_SPRITE } from "./enemy";
import { BASIC_GAME_SETS, CAMERA, DrawGameSpriteImage } from "./utils";
type KNIGET_STATE = "idle" | "run" | "attack" | "move" | "dead";
export class KNIGHT_SPRITE {
    static IdleImage: HTMLImageElement;
    static RunImage: HTMLImageElement;
    static AttackImage: HTMLImageElement;
    static DeadImage: HTMLImageElement;


    static AttackZone: number;
    static MaxHP: number;
    static InitialAttack: number;
    IsDead: boolean;

    pos_x: number;
    pos_y: number;
    private state: KNIGET_STATE;
    private time_counter: number;
    hp: number;
    private attack_level: number;
    private attack_zone: number;

    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.state = "run";
        this.time_counter = 0;
        this.hp = KNIGHT_SPRITE.MaxHP;
        this.attack_level = KNIGHT_SPRITE.InitialAttack;
        this.IsDead = false;
        this.attack_zone = Math.floor(KNIGHT_SPRITE.AttackZone * (Math.random() * 0.15 + 1));
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
            this.pos_x - CAMERA.GetPos().x + 15,
            this.pos_y - CAMERA.GetPos().y + 80,
            Math.floor(40 * this.hp / KNIGHT_SPRITE.MaxHP),
            5
        );
    }
    DrawIdle(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.IdleImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            4,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 },
            false
        );
    }
    DrawRun(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.RunImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            7,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 },
            false
        );
    }
    DrawAttack(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.AttackImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            5,
            { x: this.pos_x - CAMERA.GetPos().x - 16, y: this.pos_y - CAMERA.GetPos().y - 50 },
            false
        );
    }
    DrawDead(ctx: CanvasRenderingContext2D): void {
        DrawGameSpriteImage(
            KNIGHT_SPRITE.DeadImage,
            ctx,
            this.time_counter / BASIC_GAME_SETS.game_speed,
            6,
            { x: this.pos_x - CAMERA.GetPos().x, y: this.pos_y - CAMERA.GetPos().y - 50 },
            false
        )
    }
    JudgeInAttackZone(enemy_list: ENEMY_SPRITE[]): void {
        if (enemy_list.length === 0) {
            if (this.state === 'attack') this.ChangeState('run');
            return;
        }
        for (let i = 0; i < enemy_list.length; i++) {
            let item = enemy_list[i];
            if (item.IsDead) continue;
            if (item.pos_x > this.pos_x && item.pos_x < this.pos_x + this.attack_zone) {
                if (this.state === "idle" || this.state === "run") {
                    this.ChangeState('attack');
                }
                if ((this.time_counter / BASIC_GAME_SETS.game_speed) % 5 === 4) {
                    item.hp -= this.attack_level;
                }
                return;
            }
        }
        if (this.state === 'attack') this.ChangeState('run');
    }
    DoAction(ctx: CanvasRenderingContext2D): void {
        if (this.hp <= 0 && this.state !== 'dead') this.ChangeState('dead');
        switch (this.state) {
            case "idle":
                this.DrawIdle(ctx);
                break;
            case "run":
                this.DrawRun(ctx);
                this.pos_x++;
                break;
            case "move":
                this.DrawRun(ctx);
                break;
            case "attack":
                this.DrawAttack(ctx);
                break;
            case "dead":
                this.DrawDead(ctx);
                if (this.time_counter === 6 * BASIC_GAME_SETS.game_speed - 1) this.IsDead = true;
                break;
            default:
                console.error("Unknown state: " + this.state);
        }
        if (this.hp > 0) this.DrawHpBar(ctx);
        this.time_counter++;
    }
}
