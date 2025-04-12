import { ENEMY_SPRITE } from "./battle_enemy";
import { KNIGHT_SPRITE } from "./battle_knight";
export class ListManagement {
    static ListLength: number;
    KnightList: KNIGHT_SPRITE[] = [];
    EnemyList: ENEMY_SPRITE[] = [];
    private ListIndex: number;
    constructor(i: number) {
        this.ListIndex = i;
    }
    AddKnight(x: number): void {
        this.KnightList.push(new KNIGHT_SPRITE(x, this.ListIndex * ListManagement.ListLength));
    }
    AddEnemy(x: number): void {
        this.EnemyList.push(new ENEMY_SPRITE(x, this.ListIndex * ListManagement.ListLength));
    }
    DoAllActions(ctx: CanvasRenderingContext2D): void {
        this.KnightList.forEach((item) => {
            item.JudgeInAttackZone(this.EnemyList);
            item.DoAction(ctx);
        });
        this.EnemyList.forEach((item) => {
            item.DoAction(ctx);
        });
        this.EnemyList = this.EnemyList.filter((item) => {
            return !item.IsDead;
        });
        this.KnightList = this.KnightList.filter((item) => {
            return !item.IsDead;
        });
    }
}
ListManagement.ListLength = 50;