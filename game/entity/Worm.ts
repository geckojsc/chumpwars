///<reference path='../Game.ts' />
/// <reference path='../weapon/Weapon.ts' />
/// <reference path='../weapon/Grenade.ts' />

module entity {
	import Weapon = weapon.Weapon;
	
	export class Worm extends Entity {
		constructor(x:number, y:number) {
			super(x-5, y-10, 10, 20);
		}
		
		type = "Worm";
		lastFacing = 1;
		currentWeapon:Weapon = new weapon.Grenade();
		
		// Called when the entity is added to the world
		added(): void {}
		
		// Called when the entity is removed from the world
		removed():void {}
		
		resolveMovementX(dx:number): void {
			this.residueX += dx;
			dx = Math.round(this.residueX);
			this.residueX -= dx;
			
			var sign = dx > 0 ? 1 : -1;
			if(dx != 0) this.lastFacing = sign;
			
			while (dx != 0) {
				if (this.collideMap(this.x+sign, this.y, false)) {
					if (!this.collideMap(this.x+sign, this.y-1, false)) {
						this.y--;
					}
					else if (!this.collideMap(this.x+sign, this.y-2, false)) {
						this.y-=2;
					}
					else {
						this.justCollided = true;
						this.lastCollisionXSpeed = this.velX;
						this.lastCollisionYSpeed = this.velY;
						this.velX *= -this.getBounce();
						break;
					}
				}
				else if(this.isOnFloor()) {
					if (!this.collideMap(this.x+sign, this.y+1, false)) {
						this.y++;
					}
					else if (!this.collideMap(this.x+sign, this.y+2, false)) {
						this.y+=2;
					}
				}
				this.x += sign;
				dx -= sign;
				this.onFloor = -1;
			}
		}
		
		tick(): void {
			super.tick();
			this.currentWeapon.tick(this);
			//do worm specific things here
		}
		
		render():void {
			super.render();
			this.currentWeapon.render(this);
			//animation shenanigans
		}
		
		getBounce(): number {
			return super.getBounce();
			//make worm bounce a bit if falling
		}
		
		canControl():boolean {
			return this.currentWeapon.allowWormControl();
		}
		
	}
	
}
