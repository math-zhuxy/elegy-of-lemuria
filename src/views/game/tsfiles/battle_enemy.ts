import { CAMERA } from "./utils";
type ENEMY_STATE = 'move' | 'attack' | 'idle';
export class ENEMY_SPRITE {
    static width: number = 30;
    static height: number = 60;
    static MaxHP: number;
    static InitialAttack: number;
    static AttackZone: number;

    pos_x: number;
    pos_y: number;
    time_counter: number;
    attack_level:number;
    hp: number;
    state: ENEMY_STATE;
    constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.attack_level = ENEMY_SPRITE.InitialAttack;
        this.state = "move";
        this.time_counter = 0;
        this.hp = ENEMY_SPRITE.MaxHP;
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
            ENEMY_SPRITE.width, 
            5
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.pos_x - CAMERA.GetPos().x, 
            this.pos_y - CAMERA.GetPos().y + 80, 
            Math.floor(ENEMY_SPRITE.width * this.hp / ENEMY_SPRITE.MaxHP), 
            5
        );
    }
    DoAction(ctx: CanvasRenderingContext2D) {
        switch (this.state){
            case 'move':
                this.pos_x --;
                ctx.fillStyle = "black";
                ctx.fillRect(
                    this.pos_x - CAMERA.GetPos().x, 
                    this.pos_y - CAMERA.GetPos().y, 
                    ENEMY_SPRITE.width, 
                    ENEMY_SPRITE.height
                );
                break;
            case 'attack':
                ctx.fillStyle = "blue";
                ctx.fillRect(
                    this.pos_x - CAMERA.GetPos().x, 
                    this.pos_y - CAMERA.GetPos().y, 
                    ENEMY_SPRITE.width, 
                    ENEMY_SPRITE.height
                );
        }
        this.DrawHpBar(ctx);
        this.time_counter ++;
    }
}