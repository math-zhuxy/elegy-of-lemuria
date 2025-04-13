import { ENEMY_SPRITE } from "./enemy";
import { KNIGHT_SPRITE } from "./knight";
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
            item.JudgeInAttackZone(this.KnightList);
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
ListManagement.ListLength = 70;

export class GameSpriteManagement {
    ListNum: number;
    ListSet: ListManagement[];
    constructor() {
        this.ListNum = 15;
        this.ListSet = new Array<ListManagement>(this.ListNum);
        for (let i = 0; i < this.ListNum; i++) {
            this.ListSet[i] = new ListManagement(i);
        }
    }
    DoAction(ctx: CanvasRenderingContext2D): void {
        this.ListSet.forEach((ele) => ele.DoAllActions(ctx));
    }
    AddKnight(x: number, y: number): void {
        const set_index = Math.min(Math.floor(y / ListManagement.ListLength), 14);
        this.ListSet[set_index].AddKnight(x);
    }
    AddEnemy(x: number, y: number): void {
        const set_index = Math.min(Math.floor(y / ListManagement.ListLength), 14);
        this.ListSet[set_index].AddEnemy(x);
    }
}
