import { GameBattleInit } from "./init";
import { KEYBOARD, CAMERA, MOUSE } from "./utils";
import { GameSpriteManagement } from "./list";
type USER_STATE = "drag" | "place";
export function StartGame() {
    GameBattleInit();
    let Test_Using_Knight = true;
    let UserState: USER_STATE = "place";
    const GameManage = new GameSpriteManagement();
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    function HandleKeydown(event: KeyboardEvent) {
        KEYBOARD.KeyDown(event.key);
        switch (event.key) {
            case 'q':
                Test_Using_Knight = true;
                break;
            case 'e':
                Test_Using_Knight = false;
                break;
            case 'Escape':
                QuitGame();
                break;
            case 'i':
                UserState = 'drag';
                break;
            case 'o':
                UserState = 'place';
                break;
            default:
                break;
        }
    }
    function HandleKeyUp(event: KeyboardEvent) {
        KEYBOARD.KeyUp(event.key);
    }
    function HandleMouseClick(event: MouseEvent) {
        if(UserState === 'place'){
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left + CAMERA.GetPos().x;
            const y = event.clientY - rect.top + CAMERA.GetPos().y;
            if (Test_Using_Knight) GameManage.AddKnight(x, y);
            else GameManage.AddEnemy(x, y);
        }
    }
    function HandleMouseDown(event: MouseEvent) {
        if(UserState === 'drag'){
            MOUSE.IsDrawing = true;
            const rect = canvas.getBoundingClientRect();
            MOUSE.StartX = event.clientX - rect.left;
            MOUSE.StartY = event.clientY - rect.top;
        }
    }
    function HandleMouseMove(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        MOUSE.UpdatePos(event.clientX - rect.left, event.clientY - rect.top);
    }
    function HanleMouseUp(event: MouseEvent) {
        MOUSE.IsDrawing = false;
    }

    window.addEventListener('keydown', HandleKeydown);
    window.addEventListener('keyup', HandleKeyUp);
    window.addEventListener('click', HandleMouseClick);
    window.addEventListener('mousedown', HandleMouseDown);
    window.addEventListener('mousemove', HandleMouseMove);
    window.addEventListener('mouseup', HanleMouseUp);
    const GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        KEYBOARD.MoveCamera();
        GameManage.DoAction(ctx);
        if(MOUSE.IsDrawing && UserState === 'drag') ctx.strokeRect(
            MOUSE.StartX,
            MOUSE.StartY,
            MOUSE.GetPos().x - MOUSE.StartX,
            MOUSE.GetPos().y - MOUSE.StartY
        );
    }, 30);
    function QuitGame() {
        clearInterval(GameLoop);
        window.removeEventListener('keydown', HandleKeydown);
        window.removeEventListener('keyup', HandleKeyUp);
        window.removeEventListener('click', HandleMouseClick);
        window.removeEventListener('mousedown', HandleMouseDown);
        window.removeEventListener('mousemove', HandleMouseMove);
        window.removeEventListener('mouseup', HanleMouseUp);
    }
}